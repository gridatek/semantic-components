import {
  DestroyRef,
  Directive,
  ElementRef,
  InjectionToken,
  afterNextRender,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import type { PDFDocumentProxy } from 'pdfjs-dist';
import { GlobalWorkerOptions, getDocument, version } from 'pdfjs-dist';
import type {
  PdfEditorAnnotation,
  PdfEditorMode,
  PdfErrorEvent,
  PdfFindState,
  PdfLoadEvent,
  PdfPageChangeEvent,
  PdfPageMatchInfo,
  PdfZoomChangeEvent,
  PdfZoomLevel,
} from './pdf-viewer-types';

export const SC_PDF_VIEWER = new InjectionToken<ScPdfViewerRoot>(
  'SC_PDF_VIEWER',
);

@Directive({
  selector: '[scPdfViewer]',
  exportAs: 'scPdfViewer',
  providers: [{ provide: SC_PDF_VIEWER, useExisting: ScPdfViewerRoot }],
  host: {
    'data-slot': 'pdf-viewer',
    '[class]': 'class()',
    '[attr.data-loading]': 'isLoading() || null',
    '[attr.data-error]': 'error() ? true : null',
    '[attr.data-fullscreen]': 'isFullscreen() || null',
  },
})
export class ScPdfViewerRoot {
  private readonly destroyRef = inject(DestroyRef);

  readonly classInput = input<string>('', { alias: 'class' });
  protected readonly class = computed(() => cn('block', this.classInput()));

  // Inputs
  readonly src = input<string>('');
  readonly title = input<string>('');
  readonly initialPage = input(1);
  readonly initialZoom = input<PdfZoomLevel>('auto');
  readonly workerSrc = input<string>('');

  // Outputs
  readonly loaded = output<PdfLoadEvent>();
  readonly pageChange = output<PdfPageChangeEvent>();
  readonly zoomChange = output<PdfZoomChangeEvent>();
  readonly errorEvent = output<PdfErrorEvent>();

  // State signals
  readonly isLoading = signal(true);
  readonly error = signal<string | null>(null);
  readonly currentPage = signal(1);
  readonly totalPages = signal(1);
  readonly zoom = signal<PdfZoomLevel>('auto');
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
  readonly findState = signal<PdfFindState>('idle');
  readonly findCurrentMatchIndex = signal(0);
  readonly findTotalMatches = signal(0);
  readonly pageMatches = signal<PdfPageMatchInfo[]>([]);
  readonly findTrigger = signal(0);

  private pageTexts: string[] = [];

  // Editor state
  readonly editorMode = signal<PdfEditorMode>('none');
  readonly editorAnnotations = signal<PdfEditorAnnotation[]>([]);
  readonly editorTrigger = signal(0);

  // Editor params
  readonly highlightColor = signal('#FFFF00');
  readonly freetextColor = signal('#000000');
  readonly freetextSize = signal(12);
  readonly inkColor = signal('#000000');
  readonly inkThickness = signal(1);
  readonly inkOpacity = signal(1);

  private editorIdCounter = 0;

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
  readonly hasSource = computed(() => !!this.src());
  readonly showContent = computed(() => this.hasSource() && !this.error());

  private workerReady = false;

  constructor() {
    this.currentPage.set(this.initialPage());
    this.zoom.set(this.initialZoom());

    // Initialize worker and load initial document after first render
    afterNextRender(() => {
      this.initWorker();
      this.workerReady = true;

      const source = this.src();
      if (source) {
        this.loadDocument(source);
      }
    });

    // Watch src for subsequent changes (after worker is ready)
    effect(() => {
      const source = this.src();
      if (!this.workerReady) return;
      if (source) {
        this.loadDocument(source);
      }
    });

    const handleFullscreenChange = () => {
      this.isFullscreen.set(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    this.destroyRef.onDestroy(() => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      this.pdfDocument()?.destroy();
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

  private async loadDocument(url: string): Promise<void> {
    this.isLoading.set(true);
    this.error.set(null);

    try {
      // Destroy previous document if any
      this.pdfDocument()?.destroy();

      const doc = await getDocument(url).promise;
      this.pdfDocument.set(doc);
      this.totalPages.set(doc.numPages);
      this.isLoading.set(false);
      this.loaded.emit({ totalPages: doc.numPages });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Unable to load the PDF document.';
      this.onError(message);
    }
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
    this.error.set(null);
    const source = this.src();
    if (source) {
      this.loadDocument(source);
    }
  }

  goToPrevPage(): void {
    if (this.canGoPrev()) {
      this.goToPage(this.currentPage() - 1);
    }
  }

  goToNextPage(): void {
    if (this.canGoNext()) {
      this.goToPage(this.currentPage() + 1);
    }
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

  zoomIn(): void {
    const current = this.zoom();
    let newZoom: number;

    if (typeof current === 'number') {
      newZoom = Math.min(current + 0.25, 4);
    } else {
      newZoom = 1.25;
    }

    this.setZoom(newZoom);
  }

  zoomOut(): void {
    const current = this.zoom();
    let newZoom: number;

    if (typeof current === 'number') {
      newZoom = Math.max(current - 0.25, 0.25);
    } else {
      newZoom = 0.75;
    }

    this.setZoom(newZoom);
  }

  setZoom(level: PdfZoomLevel): void {
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

  download(): void {
    const source = this.src();
    if (!source) return;

    const link = document.createElement('a');
    link.href = source;
    link.download = this.title() || 'document.pdf';
    link.click();
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

  // Find methods
  toggleFind(): void {
    const open = !this.findOpen();
    this.findOpen.set(open);
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

    this.findState.set('pending');

    // Extract text if needed
    if (this.pageTexts.length !== doc.numPages) {
      this.pageTexts = [];
      for (let i = 1; i <= doc.numPages; i++) {
        try {
          const page = await doc.getPage(i);
          const textContent = await page.getTextContent();
          let text = '';
          for (const item of textContent.items) {
            if ('str' in item) {
              text += (item as { str: string }).str;
              if ((item as { hasEOL?: boolean }).hasEOL) {
                text += '\n';
              }
            }
          }
          this.pageTexts.push(text);
        } catch {
          this.pageTexts.push('');
        }
      }
    }

    const matchCase = this.findMatchCase();
    const entireWord = this.findEntireWord();
    const matchDiacritics = this.findMatchDiacritics();
    const allMatches: PdfPageMatchInfo[] = [];
    let total = 0;

    // Strip diacritical marks: NFD splits accented chars, then remove combining marks
    const stripDiacritics = (text: string): string =>
      text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    for (const pageText of this.pageTexts) {
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
      let globalIdx = 0;
      let found = false;

      for (let i = 0; i < allMatches.length; i++) {
        const pageIdx = (currentPageIdx + i) % allMatches.length;
        if (allMatches[pageIdx].matches.length > 0) {
          this.findCurrentMatchIndex.set(globalIdx);
          this.goToPage(pageIdx + 1);
          found = true;
          break;
        }
        // Count matches in pages before this one (in order from currentPage)
        if (!found) {
          // Recalculate: count all matches before this page in document order
        }
      }

      // Compute correct global index
      if (found) {
        let idx = 0;
        const currentMatch = this.findCurrentMatchIndex();
        // Recount to find the right global index
        idx = 0;
        for (let p = 0; p < allMatches.length; p++) {
          const pageIdx = (currentPageIdx + p) % allMatches.length;
          if (allMatches[pageIdx].matches.length > 0) {
            // Calculate global index for this page's first match
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
    this.findQuery.set('');
    this.findState.set('idle');
    this.findCurrentMatchIndex.set(0);
    this.findTotalMatches.set(0);
    this.pageMatches.set([]);
    this.pageTexts = [];
    this.findTrigger.update((v) => v + 1);
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
  setEditorMode(mode: PdfEditorMode): void {
    this.editorMode.set(this.editorMode() === mode ? 'none' : mode);
  }

  addEditorAnnotation(annotation: Omit<PdfEditorAnnotation, 'id'>): void {
    const id = `editor-${++this.editorIdCounter}`;
    this.editorAnnotations.update((list) => [...list, { ...annotation, id }]);
    this.editorTrigger.update((v) => v + 1);
  }

  removeEditorAnnotation(id: string): void {
    this.editorAnnotations.update((list) => list.filter((a) => a.id !== id));
    this.editorTrigger.update((v) => v + 1);
  }

  clearEditorAnnotations(): void {
    this.editorAnnotations.set([]);
    this.editorTrigger.update((v) => v + 1);
  }
}
