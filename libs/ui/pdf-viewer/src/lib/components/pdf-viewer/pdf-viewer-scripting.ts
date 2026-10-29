import type { PDFDocumentProxy } from 'pdfjs-dist';

/** What a document's scripts can do to the viewer. */
export interface ScPdfScriptingHost {
  currentPage(): number;
  totalPages(): number;
  goToPage(page: number): void;
  goToNextPage(): void;
  goToPrevPage(): void;
  setScriptZoom(value: number | string): void;
  zoomIn(): void;
  zoomOut(): void;
  print(): void;
  download(): void;
  /** Whether a page is drawn, with its form fields in the DOM. */
  isPageRendered(page: number): boolean;
  /** Presentation mode ignores zoom, layout and focus requests. */
  isPresenting(): boolean;
}

/** pdf.js's QuickJS sandbox (`pdf.sandbox.mjs`). */
interface ScPdfSandbox {
  create(data: object): void;
  dispatchEvent(event: object): void;
  nukeSandbox(): void;
}

interface ScPdfSandboxUpdate {
  id?: string;
  siblings?: string[];
  command?: string;
  value?: unknown;
  focus?: boolean;
  [key: string]: unknown;
}

/**
 * Runs a document's JavaScript — form calculations, formatting, validation,
 * page and document actions — in pdf.js's sandbox, as pdf.js's viewer does:
 * the annotation layer's fields send their events here, and the sandbox's
 * updates go back to the fields (or to the annotation storage for fields
 * that aren't rendered).
 */
export class ScPdfScripting {
  private sandbox: Promise<ScPdfSandbox> | null = null;
  private doc: PDFDocumentProxy | null = null;
  private objectIds = new Set<string>();
  /** Pages whose PageOpen ran (the promise), or that were closed (null). */
  private readonly visitedPages = new Map<number, Promise<void> | null>();
  /** Pages to open once they're rendered. */
  private readonly pendingOpen = new Set<number>();
  private printFinished: (() => void) | null = null;

  /** Handed to the annotation layer as its link service's event bus. */
  readonly eventBus = {
    dispatch: (name: string, data?: { detail?: object }) => {
      if (name === 'dispatcheventinsandbox' && data?.detail) {
        this.dispatch(data.detail);
      }
    },
    on: () => undefined,
    off: () => undefined,
  };

  private readonly onUpdate = (event: Event): void => {
    this.update((event as CustomEvent<ScPdfSandboxUpdate>).detail);
  };

  constructor(
    private readonly host: ScPdfScriptingHost,
    private readonly sources: () => { sandboxSrc: string; wasmSrc: string },
  ) {}

  /** Whether the current document has scripts running. */
  get active(): boolean {
    return !!this.sandbox;
  }

  /** Starts the scripts of a document (after stopping the previous one's). */
  async setDocument(doc: PDFDocumentProxy | null): Promise<void> {
    await this.destroy();
    this.doc = doc;
    if (!doc) return;

    const [objects, calculationOrder, docActions] = await Promise.all([
      doc.getFieldObjects(),
      doc.getCalculationOrderIds(),
      doc.getJSActions(),
    ]);
    if (doc !== this.doc || (!objects && !docActions)) return;

    // A plain object at runtime, whatever the typings say.
    const fieldLists: unknown[] =
      objects instanceof Map
        ? [...objects.values()]
        : Object.values(objects ?? {});
    for (const fields of fieldLists) {
      for (const field of fields as { id: string }[]) {
        this.objectIds.add(field.id);
      }
    }

    const { sandboxSrc, wasmSrc } = this.sources();
    const sandbox = import(/* @vite-ignore */ sandboxSrc).then(
      (module: { QuickJSSandbox(wasmUrl: string): Promise<ScPdfSandbox> }) =>
        module.QuickJSSandbox(new URL(wasmSrc, location.href).href),
    );
    this.sandbox = sandbox;
    window.addEventListener('updatefromsandbox', this.onUpdate);

    try {
      const properties = await this.documentProperties(doc);
      if (doc !== this.doc) return;
      (await sandbox).create({
        objects,
        calculationOrder,
        appInfo: { platform: navigator.platform, language: navigator.language },
        docInfo: { ...properties, actions: docActions },
      });
    } catch (error) {
      console.error('PDF scripting:', error);
      await this.destroy();
      return;
    }
    await this.dispatch({ id: 'doc', name: 'Open' });
    this.pageOpen(this.host.currentPage());
  }

  /** The current page changed: close the previous one, open the new one. */
  pageChanged(previous: number, current: number): void {
    if (!this.sandbox || previous === current) return;
    this.pageClose(previous);
    this.pageOpen(current);
  }

  /** A page finished rendering: run its PageOpen if it was waiting. */
  pageRendered(page: number): void {
    if (this.pendingOpen.has(page) && page === this.host.currentPage()) {
      this.pageOpen(page);
    }
  }

  async willSave(): Promise<void> {
    await this.dispatch({ id: 'doc', name: 'WillSave' });
  }

  async didSave(): Promise<void> {
    await this.dispatch({ id: 'doc', name: 'DidSave' });
  }

  /** Runs WillPrint and waits until the scripts are done with it. */
  async willPrint(): Promise<void> {
    if (!this.sandbox) return;
    const finished = new Promise<void>((resolve) => {
      this.printFinished = resolve;
      // Don't hang the print if a script never finishes.
      setTimeout(resolve, 5000);
    });
    await this.dispatch({ id: 'doc', name: 'WillPrint' });
    await finished;
    this.printFinished = null;
  }

  async didPrint(): Promise<void> {
    await this.dispatch({ id: 'doc', name: 'DidPrint' });
  }

  async destroy(): Promise<void> {
    const sandbox = this.sandbox;
    this.sandbox = null;
    this.doc = null;
    this.objectIds = new Set();
    this.visitedPages.clear();
    this.pendingOpen.clear();
    this.printFinished?.();
    this.printFinished = null;
    // No window on the server (where no document was ever opened).
    globalThis.window?.removeEventListener('updatefromsandbox', this.onUpdate);
    if (!sandbox) return;
    try {
      const instance = await sandbox;
      instance.dispatchEvent({ id: 'doc', name: 'WillClose' });
      instance.nukeSandbox();
    } catch {
      // The sandbox never started.
    }
  }

  private async dispatch(event: object): Promise<void> {
    const sandbox = await this.sandbox?.catch(() => null);
    if (sandbox) setTimeout(() => sandbox.dispatchEvent(event), 0);
  }

  private pageOpen(page: number): void {
    const doc = this.doc;
    if (!this.sandbox || !doc) return;
    if (!this.host.isPageRendered(page)) {
      this.pendingOpen.add(page);
      return;
    }
    this.pendingOpen.delete(page);
    const firstVisit = !this.visitedPages.has(page);
    this.visitedPages.set(
      page,
      (async () => {
        const actions = firstVisit
          ? await (await doc.getPage(page)).getJSActions()
          : null;
        if (doc !== this.doc) return;
        await this.dispatch({
          id: 'page',
          name: 'PageOpen',
          pageNumber: page,
          actions,
        });
      })(),
    );
  }

  private async pageClose(page: number): Promise<void> {
    const doc = this.doc;
    if (this.pendingOpen.has(page)) return;
    const opened = this.visitedPages.get(page);
    if (!opened) return;
    this.visitedPages.set(page, null);
    await opened;
    if (doc !== this.doc) return;
    await this.dispatch({ id: 'page', name: 'PageClose', pageNumber: page });
  }

  /** A message from the sandbox: a viewer command, or a field update. */
  private update(detail: ScPdfSandboxUpdate): void {
    const host = this.host;
    const { id, siblings, command, value } = detail;
    if (!id) {
      switch (command) {
        case 'error':
          console.error(value);
          break;
        case 'println':
          console.log(value);
          break;
        case 'page-num':
          host.goToPage(Number(value) + 1);
          break;
        case 'zoom':
          if (!host.isPresenting()) host.setScriptZoom(value as number);
          break;
        case 'print':
          host.print();
          break;
        case 'SaveAs':
          host.download();
          break;
        case 'FirstPage':
          host.goToPage(1);
          break;
        case 'LastPage':
          host.goToPage(host.totalPages());
          break;
        case 'NextPage':
          host.goToNextPage();
          break;
        case 'PrevPage':
          host.goToPrevPage();
          break;
        case 'ZoomViewIn':
          if (!host.isPresenting()) host.zoomIn();
          break;
        case 'ZoomViewOut':
          if (!host.isPresenting()) host.zoomOut();
          break;
        case 'WillPrintFinished':
          this.printFinished?.();
          break;
      }
      return;
    }
    if (host.isPresenting() && detail.focus) return;

    const fieldUpdate = { ...detail };
    delete fieldUpdate.id;
    delete fieldUpdate.siblings;
    for (const elementId of siblings ? [id, ...siblings] : [id]) {
      if (!this.objectIds.has(elementId)) continue;
      const element = document.querySelector(
        `[data-element-id="${elementId}"]`,
      );
      if (element) {
        element.dispatchEvent(
          new CustomEvent('updatefromsandbox', { detail: fieldUpdate }),
        );
      } else {
        this.doc?.annotationStorage.setValue(elementId, fieldUpdate);
      }
    }
  }

  /** The document's properties, as scripts see them (`this.info`, …). */
  private async documentProperties(
    doc: PDFDocumentProxy,
  ): Promise<Record<string, unknown>> {
    const { info, metadata, contentDispositionFilename, contentLength } =
      (await doc.getMetadata()) as unknown as {
        info: object;
        metadata: { getRaw(): unknown; get(key: string): unknown } | null;
        contentDispositionFilename: string | null;
        contentLength: number | null;
      };
    return {
      ...info,
      baseURL: '',
      filesize: contentLength || (await doc.getDownloadInfo()).length,
      filename: contentDispositionFilename || '',
      metadata: metadata?.getRaw(),
      authors: metadata?.get('dc:creator'),
      numPages: doc.numPages,
      URL: '',
    };
  }
}
