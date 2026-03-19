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
  PdfErrorEvent,
  PdfLoadEvent,
  PdfPageChangeEvent,
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
}
