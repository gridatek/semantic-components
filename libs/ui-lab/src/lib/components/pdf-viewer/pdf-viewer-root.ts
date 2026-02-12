import {
  computed,
  DestroyRef,
  Directive,
  ElementRef,
  inject,
  InjectionToken,
  input,
  output,
  signal,
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {
  type PdfErrorEvent,
  type PdfLoadEvent,
  type PdfPageChangeEvent,
  type PdfZoomChangeEvent,
  type PdfZoomLevel,
} from './pdf-viewer-types';

export const SC_PDF_VIEWER = new InjectionToken<ScPdfViewerRoot>(
  'SC_PDF_VIEWER',
);

@Directive({
  selector: '[sc-pdf-viewer]',
  exportAs: 'scPdfViewer',
  providers: [{ provide: SC_PDF_VIEWER, useExisting: ScPdfViewerRoot }],
  host: {
    'data-slot': 'pdf-viewer',
    '[attr.data-loading]': 'isLoading() || null',
    '[attr.data-error]': 'error() ? true : null',
    '[attr.data-fullscreen]': 'isFullscreen() || null',
  },
})
export class ScPdfViewerRoot {
  private readonly destroyRef = inject(DestroyRef);
  private readonly sanitizer = inject(DomSanitizer);

  // Inputs
  readonly src = input<string>('');
  readonly title = input<string>('');
  readonly initialPage = input(1);
  readonly initialZoom = input<PdfZoomLevel>('auto');

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

  // Container element ref for fullscreen
  private containerElement: ElementRef<HTMLElement> | null = null;

  // Computed values
  readonly canGoPrev = computed(() => this.currentPage() > 1);
  readonly canGoNext = computed(() => this.currentPage() < this.totalPages());
  readonly hasSource = computed(() => !!this.src());
  readonly showContent = computed(() => this.hasSource() && !this.error());

  readonly safePdfUrl = computed<SafeResourceUrl | ''>(() => {
    const source = this.src();
    if (!source) return '';

    const params = new URLSearchParams();
    const page = this.currentPage();
    const z = this.zoom();

    if (page > 1) {
      params.set('page', page.toString());
    }

    if (typeof z === 'number') {
      params.set('zoom', (z * 100).toString());
    } else if (z === 'page-fit') {
      params.set('view', 'Fit');
    } else if (z === 'page-width') {
      params.set('view', 'FitH');
    }

    const paramString = params.toString();
    const separator = source.includes('?') ? '&' : '#';

    const url = paramString ? `${source}${separator}${paramString}` : source;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  });

  constructor() {
    this.currentPage.set(this.initialPage());
    this.zoom.set(this.initialZoom());

    const handleFullscreenChange = () => {
      this.isFullscreen.set(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    this.destroyRef.onDestroy(() => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    });
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

  onError(message: string = 'Unable to load the PDF document.'): void {
    this.isLoading.set(false);
    this.error.set(message);
    this.errorEvent.emit({
      error: new Error(message),
      message,
    });
  }

  retry(): void {
    this.error.set(null);
    this.isLoading.set(true);
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
    this.rotation.update((r) => (r - 90) % 360);
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
