import type { PDFDocumentProxy } from 'pdfjs-dist';
import type * as PdfViewerModule from 'pdfjs-dist/web/pdf_viewer.mjs';
import type { editorManagers } from './pdf-viewer-editing';
import type { ScPdfScrollMode, ScPdfSpreadMode } from './pdf-viewer-types';

/** pdf.js's viewer components (`pdfjs-dist/web/pdf_viewer.mjs`). */
export type ScPdfViewerModule = typeof PdfViewerModule;

let viewerModule: Promise<ScPdfViewerModule> | null = null;

/**
 * pdf.js's viewer components, loaded once, in the browser. They read pdf.js
 * itself from `globalThis.pdfjsLib`, so it is set first — as pdf.js's
 * viewer does (`web/pdfjs.js`).
 */
export function loadViewerModule(): Promise<ScPdfViewerModule> {
  viewerModule ??= (async () => {
    const pdfjs = await import('pdfjs-dist');
    const global = globalThis as { pdfjsLib?: unknown };
    global.pdfjsLib ??= pdfjs;
    return import('pdfjs-dist/web/pdf_viewer.mjs');
  })();
  return viewerModule;
}

/** Names each form field of a page by its section's title (pdf.js's /TU). */
function nameFormFields(page: HTMLElement | undefined): void {
  for (const field of page?.querySelectorAll<HTMLElement>(
    '.annotationLayer section[title] :is(input, textarea, select)',
  ) ?? []) {
    if (field.hasAttribute('aria-label')) continue;
    const name = field.closest('section')?.getAttribute('title');
    if (name) field.setAttribute('aria-label', name);
  }
}

/** pdf.js's scroll and spread modes, by our names. */
export const SCROLL_MODES: Record<ScPdfScrollMode, number> = {
  vertical: 0,
  horizontal: 1,
  wrapped: 2,
  page: 3,
};
export const SPREAD_MODES: Record<ScPdfSpreadMode, number> = {
  none: 0,
  odd: 1,
  even: 2,
};

/** A place the link service remembers before a jump (pdf.js's history entry). */
export interface ScPdfHistoryEntry {
  pageNumber: number;
  /** pdf.js's destination array, when the jump had one (`[ref, {name: 'XYZ'}, x, y, zoom]`). */
  destArray: unknown[] | null;
}

/**
 * What `PDFLinkService` needs of a history (pdf.js's `PDFHistory` writes to
 * the browser's — the app's router owns that): the viewer keeps its own
 * Back / Forward from these calls.
 */
export interface ScPdfHistoryAdapter {
  pushCurrentPosition(): void;
  push(entry: {
    namedDest?: string | null;
    explicitDest: unknown[];
    pageNumber: number;
  }): void;
  pushPage(pageNumber: number): void;
  back(): void;
  forward(): void;
}

export interface ScPdfEngineOptions {
  container: HTMLDivElement;
  viewer: HTMLDivElement;
  assetsUrl: string;
  sandboxSrc: string;
  /** pdf.js's `wasm/` folder (the sandbox's QuickJS). */
  wasmSrc: string;
  enableScripting: boolean;
  enableAutoLinking: boolean;
  enablePermissions: boolean;
  /** Real colours (the theme's, read where the pages are). */
  pageColors: { foreground: string; background: string } | null;
  /** pdf.js's highlight colours (`yellow=#FFFF98,…`), from the theme's. */
  highlightColors: string;
  /** The pages are drawn dark: highlights show their dark side. */
  pagesDark: boolean;
  history: ScPdfHistoryAdapter;
  /** Where pdf.js announces what its editors do (an alert region). */
  viewerAlert: HTMLElement;
  /** The dialogs and bar pdf.js's editors ask for. */
  managers: ReturnType<typeof editorManagers>;
}

/**
 * pdf.js's viewer, wired as pdf.js's own viewer application does
 * (`web/app.js`, `_initializeViewerComponents`): an event bus, the link
 * service, the find controller, the scripting manager and the download
 * manager, given to `PDFViewer` — the pages, their text, annotation, XFA and
 * structure layers, rendering, scroll and spread modes, rotation, zoom. The
 * library's parts are the rest of pdf.js's viewer: toolbars, sidebar, find
 * bar, dialogs.
 */
export class ScPdfEngine {
  readonly eventBus: InstanceType<ScPdfViewerModule['EventBus']>;
  readonly linkService: InstanceType<ScPdfViewerModule['PDFLinkService']>;
  readonly findController: InstanceType<ScPdfViewerModule['PDFFindController']>;
  readonly scriptingManager: InstanceType<
    ScPdfViewerModule['PDFScriptingManager']
  > | null;
  readonly viewer: InstanceType<ScPdfViewerModule['PDFViewer']>;
  /** The pages are drawn dark (reading colours in dark mode): highlights show their dark side. */
  readonly pagesDark: boolean;
  /** pdf.js's own words in the pages (their names, its editors' buttons). */
  readonly l10n: InstanceType<ScPdfViewerModule['GenericL10n']>;

  constructor(
    readonly module: ScPdfViewerModule,
    options: ScPdfEngineOptions,
  ) {
    const {
      EventBus,
      PDFLinkService,
      PDFFindController,
      PDFScriptingManager,
      PDFViewer,
      DownloadManager,
      GenericL10n,
      LinkTarget,
    } = module;
    this.pagesDark = options.pagesDark;
    this.eventBus = new EventBus();
    this.linkService = new PDFLinkService({
      eventBus: this.eventBus,
      externalLinkTarget: LinkTarget.BLANK,
      externalLinkRel: 'noopener noreferrer nofollow',
    });
    this.findController = new PDFFindController({
      linkService: this.linkService,
      eventBus: this.eventBus,
      updateMatchesCountOnProgress: true,
    });
    this.scriptingManager = options.enableScripting
      ? new PDFScriptingManager({
          eventBus: this.eventBus,
          sandboxBundleSrc:
            options.sandboxSrc ||
            `${options.assetsUrl}build/pdf.sandbox.min.mjs`,
          wasmUrl: options.wasmSrc || `${options.assetsUrl}wasm/`,
        })
      : null;
    // pdf.js's English, or the app's language when the page links pdf.js's
    // locale files (`<link rel="resource" type="application/l10n">`).
    const document = options.container.ownerDocument;
    const linked = !!document.querySelector('link[type="application/l10n"]');
    this.l10n = new GenericL10n(
      linked ? document.documentElement.lang || undefined : undefined,
    );
    this.viewer = new PDFViewer({
      container: options.container,
      viewer: options.viewer,
      eventBus: this.eventBus,
      linkService: this.linkService,
      findController: this.findController,
      scriptingManager: this.scriptingManager ?? undefined,
      downloadManager: new DownloadManager(),
      l10n: this.l10n,
      imageResourcesPath: `${options.assetsUrl}web/images/`,
      enablePermissions: options.enablePermissions,
      enableAutoLinking: options.enableAutoLinking,
      pageColors: options.pageColors ?? undefined,
      supportsPinchToZoom: true,
      viewerAlert: options.viewerAlert,
      // Its annotation editors (pdf.js turns them off when the document
      // forbids changes), with the viewer's dialogs and undo bar.
      annotationEditorHighlightColors: options.highlightColors,
      ...options.managers,
    } as ConstructorParameters<ScPdfViewerModule['PDFViewer']>[0]);
    this.linkService.setViewer(this.viewer);
    this.linkService.setHistory(options.history as never);
    this.scriptingManager?.setViewer(this.viewer);
    // pdf.js puts a form field's name (its tooltip, /TU) on the wrapping
    // section as a title only: the field itself gets it as its name.
    this.eventBus.on(
      'annotationlayerrendered',
      ({ pageNumber }: { pageNumber: number }) =>
        nameFormFields(this.viewer.getPageView(pageNumber - 1)?.div),
    );
    // Pages moved, deleted, pasted: the viewer moves its views (as pdf.js's
    // application tells it).
    this.eventBus.on('pagesedited', (event: unknown) =>
      this.viewer.onPagesEdited(event as never),
    );
    // Given its words, pdf.js's viewer leaves translating to its application.
    this.l10n.translate(options.container);
    this.l10n.translate(options.viewerAlert);
  }

  /**
   * The document to show — `null` closes it (as pdf.js's `load` / `close`).
   * The viewer gives it to the scripting manager itself.
   */
  setDocument(doc: PDFDocumentProxy | null): void {
    this.linkService.setDocument(doc as never, null);
    this.viewer.setDocument(doc as never);
  }

  /**
   * Once the viewer has every page of its document — pdf.js asks for them all
   * after the first is drawn — or after `ms`. A document let go while its
   * worker still answers for them logs "Transport destroyed" for each.
   */
  pagesSettled(ms: number): Promise<void> {
    const pages = this.viewer.pagesPromise;
    if (!pages) return Promise.resolve();
    return new Promise((resolve) => {
      const timer = setTimeout(resolve, ms);
      pages
        .catch(() => undefined)
        .then(() => {
          clearTimeout(timer);
          resolve();
        });
    });
  }

  /** Listens to one of pdf.js's events; returns the way to stop. */
  on<T>(name: string, listener: (event: T) => void): () => void {
    this.eventBus.on(name, listener as never);
    return () => this.eventBus.off(name, listener as never);
  }

  /**
   * Closes the document: its pages, its scripts' sandbox — once its pages are
   * in (`pagesSettled`, 2s at most), so it's let go quietly.
   */
  destroy(): void {
    void this.pagesSettled(2000).then(() => {
      this.setDocument(null);
      this.l10n.destroy();
    });
  }
}
