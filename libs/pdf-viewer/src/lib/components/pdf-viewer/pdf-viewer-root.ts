import {
  DOCUMENT,
  DestroyRef,
  Directive,
  ElementRef,
  InjectionToken,
  afterNextRender,
  computed,
  effect,
  inject,
  input,
  model,
  output,
  signal,
  untracked,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import type { PDFDocumentLoadingTask, PDFDocumentProxy } from 'pdfjs-dist';
import { GlobalWorkerOptions, getDocument, version } from 'pdfjs-dist';
import type {
  ScPdfComment,
  ScPdfCursorTool,
  ScPdfEditorAnnotation,
  ScPdfEditorMode,
  ScPdfErrorEvent,
  ScPdfFindState,
  ScPdfLoadEvent,
  ScPdfPageChangeEvent,
  ScPdfPageMatchInfo,
  ScPdfScrollMode,
  ScPdfSignatureData,
  ScPdfSpreadMode,
  ScPdfZoomChangeEvent,
  ScPdfZoomLevel,
} from './pdf-viewer-types';

const MIN_SCALE = 0.25;
const MAX_SCALE = 4;

export const SC_PDF_VIEWER = new InjectionToken<ScPdfViewerRoot>(
  'SC_PDF_VIEWER',
);

@Directive({
  selector: '[scPdfViewer]',
  exportAs: 'scPdfViewer',
  providers: [{ provide: SC_PDF_VIEWER, useExisting: ScPdfViewerRoot }],
  host: {
    '[class]': 'class()',
    '[attr.data-loading]': 'isLoading() || null',
    '[attr.data-error]': 'error() ? true : null',
    '[attr.data-fullscreen]': 'isFullscreen() || null',
    '(keydown)': 'onKeydown($event)',
  },
})
export class ScPdfViewerRoot {
  private readonly destroyRef = inject(DestroyRef);
  private readonly document = inject(DOCUMENT);

  readonly classInput = input<string>('', { alias: 'class' });
  protected readonly class = computed(() => cn('block', this.classInput()));

  // Inputs
  readonly src = input<string>('');
  readonly title = input<string>('');
  readonly initialPage = input(1);
  readonly initialZoom = input<ScPdfZoomLevel>('auto');
  readonly workerSrc = input<string>('');

  // Outputs
  readonly loaded = output<ScPdfLoadEvent>();
  readonly pageChange = output<ScPdfPageChangeEvent>();
  readonly zoomChange = output<ScPdfZoomChangeEvent>();
  readonly errorEvent = output<ScPdfErrorEvent>();
  /** A local file was opened (`openFile()`, `loadFile()`, drag and drop). */
  readonly fileOpened = output<{ name: string }>();

  /** pdf.js's keyboard shortcuts, while focus is in the viewer. */
  readonly keyboardShortcuts = input(true);
  /** Whether the sidebar is open (F4 toggles it). Bind `[(sidebarOpen)]`. */
  readonly sidebarOpen = model(false);
  /** Select text, or drag the pages to scroll (S / H). */
  readonly cursorTool = model<ScPdfCursorTool>('select');
  /** How the pages are laid out. */
  readonly scrollMode = model<ScPdfScrollMode>('vertical');
  /** Single pages or two side by side. */
  readonly spreadMode = model<ScPdfSpreadMode>('none');
  /** The scale the pages are drawn at (reported by the canvas). */
  readonly currentScale = signal(1);
  /** Incremented to move focus to the find field / the page field. */
  readonly findFocusRequest = signal(0);
  readonly pageFocusRequest = signal(0);

  // State signals
  readonly isLoading = signal(true);
  readonly error = signal<string | null>(null);
  readonly currentPage = signal(1);
  readonly totalPages = signal(1);
  readonly zoom = signal<ScPdfZoomLevel>('auto');
  readonly rotation = signal(0);
  readonly isFullscreen = signal(false);

  // PDF.js document
  readonly pdfDocument = signal<PDFDocumentProxy | null>(null);

  // Navigation trigger — incremented to signal canvas to scroll to currentPage
  readonly navigateTrigger = signal(0);

  // Find state
  readonly findOpen = signal(false);
  readonly findQuery = signal('');
  readonly findMatchCase = signal(false);
  readonly findHighlightAll = signal(true);
  readonly findEntireWord = signal(false);
  readonly findMatchDiacritics = signal(false);
  readonly findState = signal<ScPdfFindState>('idle');
  readonly findCurrentMatchIndex = signal(0);
  readonly findTotalMatches = signal(0);
  readonly pageMatches = signal<ScPdfPageMatchInfo[]>([]);
  readonly findTrigger = signal(0);

  /** Each page's text, extracted once per document for find. */
  private pageTexts: Promise<string[]> | null = null;
  private pageTextsDocument: PDFDocumentProxy | null = null;
  /** Increments with each search, so an older one can't overwrite a newer one. */
  private findToken = 0;

  // Editor state
  readonly editorMode = signal<ScPdfEditorMode>('none');
  readonly editorAnnotations = signal<ScPdfEditorAnnotation[]>([]);
  readonly editorTrigger = signal(0);

  // Editor params
  readonly highlightColor = signal('#FFFF00');
  readonly highlightThickness = signal(12);
  readonly highlightShowAll = signal(true);
  readonly freetextColor = signal('#000000');
  readonly freetextSize = signal(12);
  readonly inkColor = signal('#000000');
  readonly inkThickness = signal(1);
  readonly inkOpacity = signal(1);

  // Password state
  readonly passwordRequired = signal(false);
  readonly passwordReason = signal<
    'need-password' | 'incorrect-password' | null
  >(null);
  private passwordCallback: ((password: string | Error) => void) | null = null;

  // Alt text state
  readonly altTextDialogOpen = signal(false);
  readonly altTextAnnotationId = signal<string | null>(null);

  // Signature state
  readonly signatureDialogOpen = signal(false);
  /**
   * Signatures saved for reuse. Bind `[(savedSignatures)]` to keep them
   * between sessions (pdf.js remembers them).
   */
  readonly savedSignatures = model<ScPdfSignatureData[]>([]);

  // Comment state
  readonly comments = signal<ScPdfComment[]>([]);
  /** Where a comment is being added (the comment tool's click), until posted. */
  readonly pendingComment = signal<{
    pageNumber: number;
    x: number;
    y: number;
  } | null>(null);
  /** The comment picked on the page or in the list. */
  readonly activeCommentId = signal<string | null>(null);

  // Undo bar state
  readonly undoBarVisible = signal(false);
  readonly undoBarMessage = signal('');
  private undoAction: (() => void) | null = null;
  private undoTimeout: ReturnType<typeof setTimeout> | null = null;

  // Print progress state
  readonly printProgress = signal(0);
  readonly printDialogOpen = signal(false);
  private printCancelled = false;

  // Sidebar
  readonly sidebarWidth = signal(200);

  private editorIdCounter = 0;
  private signatureIdCounter = 0;
  private commentIdCounter = 0;

  readonly findResultsMessage = computed(() => {
    const total = this.findTotalMatches();
    const current = this.findCurrentMatchIndex();
    const state = this.findState();

    if (state === 'idle' || !this.findQuery()) return '';
    if (state === 'not-found') return 'Phrase not found';
    if (total === 0) return 'Phrase not found';
    return `${current + 1} of ${total}`;
  });

  // Container element ref for fullscreen
  private containerElement: ElementRef<HTMLElement> | null = null;

  // Computed values
  readonly canGoPrev = computed(() => this.currentPage() > 1);
  readonly canGoNext = computed(() => this.currentPage() < this.totalPages());
  readonly canZoomIn = computed(() => this.currentScale() < MAX_SCALE - 1e-6);
  readonly canZoomOut = computed(() => this.currentScale() > MIN_SCALE + 1e-6);
  /** A file opened in the viewer (`openFile()`, drag and drop) instead of `src`. */
  readonly localFile = signal<File | null>(null);
  readonly hasSource = computed(() => !!this.src() || !!this.localFile());
  readonly showContent = computed(() => this.hasSource() && !this.error());
  /** Download progress of the document being loaded (0–1), or null if unknown. */
  readonly loadProgress = signal<number | null>(null);
  /** The file name used for downloads. */
  readonly downloadName = computed(
    () =>
      this.localFile()?.name.replace(/\.pdf$/i, '') ||
      this.title() ||
      'document',
  );

  /** The document being loaded; destroyed when another load starts. */
  private loadingTask: PDFDocumentLoadingTask | null = null;
  private workerReady = false;

  constructor() {
    this.currentPage.set(this.initialPage());
    this.zoom.set(this.initialZoom());

    // Browser only: the worker, the first document, fullscreen tracking.
    afterNextRender(() => {
      this.initWorker();
      this.workerReady = true;
      if (this.src()) this.open({ url: this.src() });

      const onFullscreenChange = () =>
        this.isFullscreen.set(!!this.document.fullscreenElement);
      this.document.addEventListener('fullscreenchange', onFullscreenChange);
      this.destroyRef.onDestroy(() =>
        this.document.removeEventListener(
          'fullscreenchange',
          onFullscreenChange,
        ),
      );
    });

    // A new `src` replaces the document (and a file opened in the viewer);
    // an empty one clears it.
    effect(() => {
      const source = this.src();
      if (!this.workerReady) return;
      untracked(() => {
        this.localFile.set(null);
        this.open(source ? { url: source } : null);
      });
    });

    this.destroyRef.onDestroy(() => {
      this.loadingTask?.destroy();
      this.pdfDocument()?.loadingTask.destroy();
      if (this.undoTimeout) {
        clearTimeout(this.undoTimeout);
      }
    });
  }

  private initWorker(): void {
    const customSrc = this.workerSrc();
    if (customSrc) {
      GlobalWorkerOptions.workerSrc = customSrc;
    } else {
      GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${version}/build/pdf.worker.min.mjs`;
    }
  }

  /**
   * Loads a document, replacing the current one. A load that's overtaken by
   * another (a new `src`, a file opened meanwhile) is cancelled and ignored.
   */
  private async open(
    source: { url: string } | { data: Uint8Array } | null,
  ): Promise<void> {
    this.loadingTask?.destroy();
    this.loadingTask = null;

    // Release the previous document once nothing renders it any more.
    const previous = this.pdfDocument();
    this.pdfDocument.set(null);
    previous?.loadingTask.destroy();
    this.clearFind();
    this.pendingComment.set(null);
    this.error.set(null);
    this.passwordRequired.set(false);
    this.passwordCallback = null;
    this.loadProgress.set(null);

    if (!source) {
      this.isLoading.set(false);
      return;
    }

    this.isLoading.set(true);
    const task = getDocument(source);
    this.loadingTask = task;

    task.onPassword = (
      updateCallback: (password: string | Error) => void,
      reason: number,
    ) => {
      if (task !== this.loadingTask) return;
      this.isLoading.set(false);
      this.passwordRequired.set(true);
      this.passwordReason.set(
        reason === 2 ? 'incorrect-password' : 'need-password',
      );
      this.passwordCallback = updateCallback;
    };
    task.onProgress = ({
      loaded,
      total,
    }: {
      loaded: number;
      total: number;
    }) => {
      if (task === this.loadingTask && total > 0) {
        this.loadProgress.set(Math.min(1, loaded / total));
      }
    };

    try {
      const doc = await task.promise;
      if (task !== this.loadingTask) return;
      this.loadingTask = null;
      this.pdfDocument.set(doc);
      this.totalPages.set(doc.numPages);
      this.currentPage.set(
        Math.min(Math.max(1, this.initialPage()), doc.numPages),
      );
      this.isLoading.set(false);
      this.passwordRequired.set(false);
      this.loadProgress.set(1);
      this.loaded.emit({ totalPages: doc.numPages });
    } catch (err) {
      if (task !== this.loadingTask || this.passwordRequired()) return;
      this.loadingTask = null;
      const message =
        err instanceof Error ? err.message : 'Unable to load the PDF document.';
      this.onError(message);
    }
  }

  /** Opens a local file (e.g. from a file input or drag and drop). */
  async loadFile(file: File): Promise<void> {
    this.localFile.set(file);
    this.fileOpened.emit({ name: file.name });
    await this.open({ data: new Uint8Array(await file.arrayBuffer()) });
  }

  /** Asks the user for a PDF file and opens it. */
  openFile(): void {
    const input = this.document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,application/pdf';
    input.addEventListener('change', () => {
      const file = input.files?.[0];
      if (file) this.loadFile(file);
    });
    input.click();
  }

  // Methods for child components to call
  setContainerElement(element: ElementRef<HTMLElement>): void {
    this.containerElement = element;
  }

  onLoad(): void {
    this.isLoading.set(false);
    this.error.set(null);
    this.loaded.emit({ totalPages: this.totalPages() });
  }

  onError(message = 'Unable to load the PDF document.'): void {
    this.isLoading.set(false);
    this.error.set(message);
    this.errorEvent.emit({
      error: new Error(message),
      message,
    });
  }

  retry(): void {
    const file = this.localFile();
    if (file) {
      this.loadFile(file);
    } else if (this.src()) {
      this.open({ url: this.src() });
    }
  }

  /** The previous page — the previous spread in page scroll mode. */
  goToPrevPage(): void {
    if (!this.canGoPrev()) return;
    if (this.scrollMode() === 'page') {
      const [first] = this.spreadOf(this.currentPage());
      this.goToPage(this.spreadOf(Math.max(1, first - 1))[0]);
    } else {
      this.goToPage(this.currentPage() - 1);
    }
  }

  /** The next page — the next spread in page scroll mode. */
  goToNextPage(): void {
    if (!this.canGoNext()) return;
    if (this.scrollMode() === 'page') {
      const [, last] = this.spreadOf(this.currentPage());
      this.goToPage(Math.min(this.totalPages(), last + 1));
    } else {
      this.goToPage(this.currentPage() + 1);
    }
  }

  /** The first and last page of the spread holding `page`. */
  spreadOf(page: number): [number, number] {
    const mode = this.spreadMode();
    if (mode === 'none') return [page, page];
    // Odd spreads pair 1–2, 3–4…; even spreads show 1 alone, then 2–3, 4–5…
    const first =
      mode === 'odd'
        ? page % 2 === 1
          ? page
          : page - 1
        : page === 1
          ? 1
          : page % 2 === 0
            ? page
            : page - 1;
    const last =
      mode === 'even' && first === 1
        ? 1
        : Math.min(first + 1, this.totalPages());
    return [first, last];
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
      this.navigateTrigger.update((v) => v + 1);
      this.pageChange.emit({
        currentPage: page,
        totalPages: this.totalPages(),
      });
    }
  }

  /** To the next 25% step above the current scale (up to 400%). */
  zoomIn(): void {
    const steps = Math.floor(this.currentScale() * 4 + 1e-6) + 1;
    this.setZoom(Math.min(MAX_SCALE, steps / 4));
  }

  /** To the next 25% step below the current scale (down to 25%). */
  zoomOut(): void {
    const steps = Math.ceil(this.currentScale() * 4 - 1e-6) - 1;
    this.setZoom(Math.max(MIN_SCALE, steps / 4));
  }

  /** Multiplies the current scale (wheel and pinch zoom). */
  zoomBy(factor: number): void {
    const scale = Math.min(
      MAX_SCALE,
      Math.max(MIN_SCALE, this.currentScale() * factor),
    );
    this.setZoom(Math.round(scale * 1000) / 1000);
  }

  setZoom(level: ScPdfZoomLevel): void {
    this.zoom.set(level);
    this.zoomChange.emit({
      zoom: level,
      scale: typeof level === 'number' ? level : 1,
    });
  }

  rotateLeft(): void {
    this.rotation.update((r) => (((r - 90) % 360) + 360) % 360);
  }

  rotateRight(): void {
    this.rotation.update((r) => (r + 90) % 360);
  }

  /** Downloads the document as it was loaded. */
  async download(): Promise<void> {
    const doc = this.pdfDocument();
    if (!doc) return;
    const data = await doc.getData();
    this.saveAs(
      new Blob([data as Uint8Array<ArrayBuffer>], { type: 'application/pdf' }),
      this.downloadName() + '.pdf',
    );
  }

  private saveAs(blob: Blob, filename: string): void {
    const url = URL.createObjectURL(blob);
    const link = this.document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    // Give the browser time to start the download before releasing the file.
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  async printWithProgress(): Promise<void> {
    const doc = this.pdfDocument();
    if (!doc) {
      this.print();
      return;
    }

    this.printCancelled = false;
    this.printDialogOpen.set(true);
    this.printProgress.set(0);

    const printContainer = document.createElement('div');
    printContainer.style.display = 'none';
    document.body.appendChild(printContainer);

    try {
      for (let i = 1; i <= doc.numPages; i++) {
        if (this.printCancelled) break;

        const page = await doc.getPage(i);
        const viewport = page.getViewport({ scale: 1.5 });
        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        canvas.style.pageBreakAfter = 'always';

        await page.render({ canvas, viewport }).promise;
        printContainer.appendChild(canvas);

        this.printProgress.set(Math.round((i / doc.numPages) * 100));
      }

      if (!this.printCancelled) {
        this.printDialogOpen.set(false);
        // Open print window with rendered pages
        const printWindow = window.open('', '_blank');
        if (printWindow) {
          printWindow.document.write(
            '<html><head><title>Print</title><style>' +
              'body{margin:0}canvas{display:block;width:100%;page-break-after:always}' +
              '@media print{canvas{page-break-after:always}}' +
              '</style></head><body></body></html>',
          );
          const canvases = printContainer.querySelectorAll('canvas');
          canvases.forEach((canvas) => {
            printWindow!.document.body.appendChild(canvas);
          });
          printWindow.document.close();
          printWindow.focus();
          printWindow.print();
          printWindow.close();
        }
      }
    } catch (err) {
      console.error('Print error:', err);
    } finally {
      printContainer.remove();
      this.printDialogOpen.set(false);
      this.printProgress.set(0);
    }
  }

  cancelPrint(): void {
    this.printCancelled = true;
    this.printDialogOpen.set(false);
  }

  print(): void {
    const source = this.src();
    if (!source) return;

    const printWindow = window.open(source);
    if (printWindow) {
      printWindow.onload = () => {
        printWindow.print();
      };
    }
  }

  toggleFullscreen(): void {
    const container = this.containerElement?.nativeElement;
    if (!container) return;

    if (!document.fullscreenElement) {
      container.requestFullscreen().catch((err) => {
        console.error('Error attempting to enable fullscreen:', err);
      });
    } else {
      document.exitFullscreen();
    }
  }

  setTotalPages(total: number): void {
    this.totalPages.set(total);
  }

  // Password methods
  submitPassword(password: string): void {
    if (this.passwordCallback) {
      this.isLoading.set(true);
      this.passwordRequired.set(false);
      this.passwordCallback(password);
      this.passwordCallback = null;
    }
  }

  cancelPassword(): void {
    if (this.passwordCallback) {
      this.passwordCallback(new Error('Password dialog cancelled'));
      this.passwordCallback = null;
    }
    this.passwordRequired.set(false);
    this.onError('Password required to open this document.');
  }

  // Signature methods
  openSignatureDialog(): void {
    this.signatureDialogOpen.set(true);
  }

  closeSignatureDialog(): void {
    this.signatureDialogOpen.set(false);
  }

  addSavedSignature(sig: Omit<ScPdfSignatureData, 'id'>): void {
    const id = `sig-${Date.now()}-${++this.signatureIdCounter}`;
    this.savedSignatures.update((list) => [...list, { ...sig, id }]);
  }

  removeSavedSignature(id: string): void {
    this.savedSignatures.update((list) => list.filter((s) => s.id !== id));
  }

  updateSavedSignature(id: string, description: string): void {
    this.savedSignatures.update((list) =>
      list.map((s) => (s.id === id ? { ...s, description } : s)),
    );
  }

  /** Places a signature image on the current page. */
  placeSignature(dataUrl: string, description = ''): void {
    this.addEditorAnnotation({
      type: 'signature',
      pageNumber: this.currentPage(),
      x: 0.3,
      y: 0.8,
      imageDataUrl: dataUrl,
      width: 0.25,
      height: 0.1,
      description,
    });
    this.editorMode.set('none');
  }

  // Comment methods
  addComment(comment: Omit<ScPdfComment, 'id'>): string {
    const id = `comment-${++this.commentIdCounter}`;
    this.comments.update((list) => [...list, { ...comment, id }]);
    return id;
  }

  removeComment(id: string): void {
    this.comments.update((list) => list.filter((c) => c.id !== id));
    if (this.activeCommentId() === id) this.activeCommentId.set(null);
  }

  /** Starts a comment at a point of a page (positions are 0–1 of the page). */
  startComment(pageNumber: number, x: number, y: number): void {
    this.pendingComment.set({ pageNumber, x, y });
    this.editorMode.set('none');
  }

  cancelComment(): void {
    this.pendingComment.set(null);
  }

  /** Posts the pending comment (or one on the current page) and selects it. */
  postComment(text: string, author = 'User'): void {
    const place = this.pendingComment() ?? {
      pageNumber: this.currentPage(),
      x: 0.5,
      y: 0.1,
    };
    const id = this.addComment({
      ...place,
      text,
      author,
      date: new Date().toLocaleString(),
      color: '#FFFF00',
    });
    this.pendingComment.set(null);
    this.activeCommentId.set(id);
  }

  /** Selects a comment and shows its page. */
  showComment(id: string): void {
    const comment = this.comments().find((c) => c.id === id);
    if (!comment) return;
    this.activeCommentId.set(id);
    if (comment.pageNumber !== this.currentPage()) {
      this.goToPage(comment.pageNumber);
    }
  }

  updateComment(id: string, text: string): void {
    this.comments.update((list) =>
      list.map((c) => (c.id === id ? { ...c, text } : c)),
    );
  }

  // Find methods
  /**
   * pdf.js's keyboard shortcuts. Only while focus is in the viewer, and not
   * while typing in a field (apart from Escape and Ctrl/⌘ shortcuts).
   */
  protected onKeydown(event: KeyboardEvent): void {
    if (!this.keyboardShortcuts() || event.defaultPrevented) return;
    const ctrl = event.ctrlKey || event.metaKey;
    const { altKey: alt, shiftKey: shift, key } = event;
    const target = event.target as HTMLElement;
    const typing =
      target.isContentEditable ||
      /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName);
    const last = this.totalPages();
    let handled = true;

    if (ctrl && alt && !shift) {
      switch (key.toLowerCase()) {
        case 'p':
          this.togglePresentation();
          break;
        case 'g':
          this.pageFocusRequest.update((v) => v + 1);
          break;
        default:
          handled = false;
      }
    } else if (ctrl && !alt) {
      switch (key) {
        case 'f':
        case 'F':
          this.openFind();
          break;
        case 'g':
        case 'G':
          if (shift) this.findPrevious();
          else this.findNext();
          break;
        case '+':
        case '=':
          this.zoomIn();
          break;
        case '-':
        case '_':
          this.zoomOut();
          break;
        case '0':
          this.setZoom('auto');
          break;
        case 'ArrowUp':
          handled = !typing && !shift;
          if (handled) this.goToPage(1);
          break;
        case 'ArrowDown':
          handled = !typing && !shift;
          if (handled) this.goToPage(last);
          break;
        case 's':
          this.download();
          break;
        case 'o':
          this.openFile();
          break;
        case 'p':
          this.printWithProgress();
          break;
        default:
          handled = false;
      }
    } else if (!ctrl && !alt && key === 'Escape' && this.findOpen()) {
      this.toggleFind();
    } else if (
      !ctrl &&
      !alt &&
      !typing &&
      this.scrollMode() === 'page' &&
      this.pageModeKey(key, shift, target)
    ) {
      // Handled: page mode turns spreads with these keys.
    } else if (!ctrl && !alt && !typing) {
      switch (key) {
        case 'n':
        case 'j':
          this.goToNextPage();
          break;
        case 'p':
        case 'k':
          this.goToPrevPage();
          break;
        case 'Home':
          this.goToPage(1);
          break;
        case 'End':
          this.goToPage(last);
          break;
        case 'r':
          this.rotateRight();
          break;
        case 'R':
          this.rotateLeft();
          break;
        case 's':
          this.cursorTool.set('select');
          break;
        case 'h':
          this.cursorTool.set('hand');
          break;
        case 'F4':
          this.sidebarOpen.update((open) => !open);
          break;
        default:
          handled = false;
      }
    } else {
      handled = false;
    }

    if (handled) event.preventDefault();
  }

  /** Page Down / → / Space: next spread; Page Up / ← / Shift+Space: previous. */
  private pageModeKey(
    key: string,
    shift: boolean,
    target: HTMLElement,
  ): boolean {
    const space = key === ' ' && target.tagName !== 'BUTTON';
    if (key === 'PageDown' || key === 'ArrowRight' || (space && !shift)) {
      this.goToNextPage();
      return true;
    }
    if (key === 'PageUp' || key === 'ArrowLeft' || (space && shift)) {
      this.goToPrevPage();
      return true;
    }
    return false;
  }

  /** Opens the find bar and focuses its field. */
  openFind(): void {
    this.findOpen.set(true);
    this.findFocusRequest.update((v) => v + 1);
  }

  /** Presentation mode (fullscreen for now). */
  togglePresentation(): void {
    this.toggleFullscreen();
  }

  toggleFind(): void {
    const open = !this.findOpen();
    this.findOpen.set(open);
    if (open) this.findFocusRequest.update((v) => v + 1);
    if (!open) {
      this.clearFind();
    }
  }

  async find(query: string): Promise<void> {
    this.findQuery.set(query);
    if (!query) {
      this.clearFind();
      return;
    }

    const doc = this.pdfDocument();
    if (!doc) return;

    const token = ++this.findToken;
    this.findState.set('pending');
    const pageTexts = await this.documentTexts(doc);
    // A newer search started, or the document changed, meanwhile.
    if (token !== this.findToken || doc !== this.pdfDocument()) return;

    const matchCase = this.findMatchCase();
    const entireWord = this.findEntireWord();
    const matchDiacritics = this.findMatchDiacritics();
    const allMatches: ScPdfPageMatchInfo[] = [];
    let total = 0;

    // Strip diacritical marks: NFD splits accented chars, then remove combining marks
    const stripDiacritics = (text: string): string =>
      text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    for (const pageText of pageTexts) {
      const matches: number[] = [];
      const matchesLength: number[] = [];

      // When ignoring diacritics, build a mapping from normalized positions
      // back to original text positions, since lengths may differ.
      let normToOrig: number[] | undefined;
      let searchIn: string;
      let searchFor: string;

      if (!matchDiacritics) {
        // Build per-character position mapping
        normToOrig = [];
        let normalized = '';
        for (let i = 0; i < pageText.length; i++) {
          const stripped = stripDiacritics(pageText[i]);
          for (let c = 0; c < stripped.length; c++) {
            normToOrig.push(i);
          }
          normalized += stripped;
        }
        // Add sentinel for end-of-string lookups
        normToOrig.push(pageText.length);
        searchIn = matchCase ? normalized : normalized.toLowerCase();
        searchFor = matchCase
          ? stripDiacritics(query)
          : stripDiacritics(query).toLowerCase();
      } else {
        searchIn = matchCase ? pageText : pageText.toLowerCase();
        searchFor = matchCase ? query : query.toLowerCase();
      }

      if (entireWord) {
        const escaped = searchFor.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const flags = matchCase ? 'g' : 'gi';
        const regex = new RegExp(`\\b${escaped}\\b`, flags);
        let m;
        const target = matchDiacritics ? pageText : searchIn;
        while ((m = regex.exec(target)) !== null) {
          if (normToOrig) {
            const origStart = normToOrig[m.index];
            const origEnd = normToOrig[m.index + m[0].length];
            matches.push(origStart);
            matchesLength.push(origEnd - origStart);
          } else {
            matches.push(m.index);
            matchesLength.push(m[0].length);
          }
        }
      } else {
        let idx = 0;
        while ((idx = searchIn.indexOf(searchFor, idx)) !== -1) {
          if (normToOrig) {
            const origStart = normToOrig[idx];
            const origEnd = normToOrig[idx + searchFor.length];
            matches.push(origStart);
            matchesLength.push(origEnd - origStart);
          } else {
            matches.push(idx);
            matchesLength.push(searchFor.length);
          }
          idx += searchFor.length;
        }
      }

      total += matches.length;
      allMatches.push({ matches, matchesLength });
    }

    this.pageMatches.set(allMatches);
    this.findTotalMatches.set(total);

    if (total === 0) {
      this.findState.set('not-found');
      this.findCurrentMatchIndex.set(0);
    } else {
      // Find first match on or after current page
      const currentPageIdx = this.currentPage() - 1;
      let found = false;

      for (let i = 0; i < allMatches.length; i++) {
        const pageIdx = (currentPageIdx + i) % allMatches.length;
        if (allMatches[pageIdx].matches.length > 0) {
          this.goToPage(pageIdx + 1);
          found = true;
          break;
        }
      }

      // Compute correct global index
      if (found) {
        for (let p = 0; p < allMatches.length; p++) {
          const pageIdx = (currentPageIdx + p) % allMatches.length;
          if (allMatches[pageIdx].matches.length > 0) {
            let gi = 0;
            for (let j = 0; j < pageIdx; j++) {
              gi += allMatches[j].matches.length;
            }
            this.findCurrentMatchIndex.set(gi);
            break;
          }
        }
      }

      this.findState.set('found');
    }

    this.findTrigger.update((v) => v + 1);
  }

  findNext(): void {
    const total = this.findTotalMatches();
    if (total === 0) return;

    const next = (this.findCurrentMatchIndex() + 1) % total;
    this.findCurrentMatchIndex.set(next);
    this.scrollToMatch(next);
    this.findState.set(next === 0 ? 'wrapped' : 'found');
    this.findTrigger.update((v) => v + 1);
  }

  findPrevious(): void {
    const total = this.findTotalMatches();
    if (total === 0) return;

    const prev = (this.findCurrentMatchIndex() - 1 + total) % total;
    this.findCurrentMatchIndex.set(prev);
    this.scrollToMatch(prev);
    this.findState.set(prev === total - 1 ? 'wrapped' : 'found');
    this.findTrigger.update((v) => v + 1);
  }

  clearFind(): void {
    this.findToken++;
    this.findQuery.set('');
    this.findState.set('idle');
    this.findCurrentMatchIndex.set(0);
    this.findTotalMatches.set(0);
    this.pageMatches.set([]);
    this.findTrigger.update((v) => v + 1);
  }

  /**
   * The text of every page, extracted once per document — a few pages at a
   * time in parallel — and shared by the searches.
   */
  private documentTexts(doc: PDFDocumentProxy): Promise<string[]> {
    if (this.pageTexts && this.pageTextsDocument === doc) {
      return this.pageTexts;
    }
    this.pageTextsDocument = doc;
    this.pageTexts = (async () => {
      const texts: string[] = new Array(doc.numPages).fill('');
      const batch = 8;
      for (let start = 1; start <= doc.numPages; start += batch) {
        const pages = Array.from(
          { length: Math.min(batch, doc.numPages - start + 1) },
          (_, i) => start + i,
        );
        await Promise.all(
          pages.map(async (pageNumber) => {
            try {
              const page = await doc.getPage(pageNumber);
              const content = await page.getTextContent();
              let text = '';
              for (const item of content.items) {
                if ('str' in item) {
                  text += item.str;
                  if (item.hasEOL) text += '\n';
                }
              }
              texts[pageNumber - 1] = text;
            } catch {
              // A page whose text can't be read just has no matches.
            }
          }),
        );
      }
      return texts;
    })();
    return this.pageTexts;
  }

  private scrollToMatch(globalIndex: number): void {
    const allMatches = this.pageMatches();
    let count = 0;
    for (let p = 0; p < allMatches.length; p++) {
      if (count + allMatches[p].matches.length > globalIndex) {
        this.goToPage(p + 1);
        return;
      }
      count += allMatches[p].matches.length;
    }
  }

  // Editor methods
  setEditorMode(mode: ScPdfEditorMode): void {
    if (mode === 'signature') {
      // Signature mode opens a dialog instead of toggling
      if (this.editorMode() === 'signature') {
        this.editorMode.set('none');
      } else {
        this.editorMode.set('signature');
        this.signatureDialogOpen.set(true);
      }
      return;
    }
    this.editorMode.set(this.editorMode() === mode ? 'none' : mode);
  }

  addEditorAnnotation(annotation: Omit<ScPdfEditorAnnotation, 'id'>): void {
    const id = `editor-${++this.editorIdCounter}`;
    this.editorAnnotations.update((list) => [...list, { ...annotation, id }]);
    this.editorTrigger.update((v) => v + 1);
  }

  updateEditorAnnotation(
    id: string,
    changes: Partial<Omit<ScPdfEditorAnnotation, 'id'>>,
  ): void {
    this.editorAnnotations.update((list) =>
      list.map((a) => (a.id === id ? { ...a, ...changes } : a)),
    );
    this.editorTrigger.update((v) => v + 1);
  }

  removeEditorAnnotation(id: string): void {
    const removed = this.editorAnnotations().find((a) => a.id === id);
    this.editorAnnotations.update((list) => list.filter((a) => a.id !== id));
    this.editorTrigger.update((v) => v + 1);

    // Show undo bar
    if (removed) {
      this.showUndoBar('Annotation deleted', () => {
        this.editorAnnotations.update((list) => [...list, removed]);
        this.editorTrigger.update((v) => v + 1);
      });
    }
  }

  clearEditorAnnotations(): void {
    const prev = this.editorAnnotations();
    this.editorAnnotations.set([]);
    this.editorTrigger.update((v) => v + 1);

    if (prev.length > 0) {
      this.showUndoBar(`${prev.length} annotation(s) cleared`, () => {
        this.editorAnnotations.set(prev);
        this.editorTrigger.update((v) => v + 1);
      });
    }
  }

  // Undo bar
  private showUndoBar(message: string, action: () => void): void {
    if (this.undoTimeout) {
      clearTimeout(this.undoTimeout);
    }
    this.undoBarMessage.set(message);
    this.undoAction = action;
    this.undoBarVisible.set(true);

    this.undoTimeout = setTimeout(() => {
      this.closeUndoBar();
    }, 5000);
  }

  undoLastAction(): void {
    if (this.undoAction) {
      this.undoAction();
      this.undoAction = null;
    }
    this.closeUndoBar();
  }

  closeUndoBar(): void {
    this.undoBarVisible.set(false);
    this.undoBarMessage.set('');
    this.undoAction = null;
    if (this.undoTimeout) {
      clearTimeout(this.undoTimeout);
      this.undoTimeout = null;
    }
  }
}
