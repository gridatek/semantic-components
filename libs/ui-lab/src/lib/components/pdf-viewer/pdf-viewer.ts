import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  input,
  output,
  signal,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { cn } from '../../utils';
import { ScPdfViewerToolbar } from './pdf-viewer-toolbar';
import {
  DEFAULT_TOOLBAR_CONFIG,
  type PdfErrorEvent,
  type PdfLoadEvent,
  type PdfPageChangeEvent,
  type PdfToolbarConfig,
  type PdfZoomLevel,
  type PdfZoomChangeEvent,
} from './pdf-viewer-types';

@Component({
  selector: 'sc-pdf-viewer',
  imports: [ScPdfViewerToolbar],
  template: `
    <div
      #container
      [class]="containerClass()"
      [class.fullscreen]="isFullscreen()"
    >
      <!-- Toolbar -->
      @if (showToolbar()) {
        <sc-pdf-viewer-toolbar
          [currentPage]="currentPage()"
          [totalPages]="totalPages()"
          [zoom]="zoom()"
          [isFullscreen]="isFullscreen()"
          [toolbarConfig]="toolbarConfig()"
          (prevPage)="goToPrevPage()"
          (nextPage)="goToNextPage()"
          (goToPage)="goToPage($event)"
          (zoomIn)="handleZoomIn()"
          (zoomOut)="handleZoomOut()"
          (zoomChange)="handleZoomChange($event)"
          (rotateLeft)="handleRotateLeft()"
          (rotateRight)="handleRotateRight()"
          (download)="handleDownload()"
          (print)="handlePrint()"
          (toggleFullscreen)="toggleFullscreen()"
        />
      }

      <!-- PDF Container -->
      <div class="flex-1 relative overflow-hidden bg-muted/30">
        <!-- Loading State -->
        @if (isLoading()) {
          <div
            class="absolute inset-0 flex items-center justify-center bg-background/80 z-10"
          >
            <div class="flex flex-col items-center gap-3">
              <div
                class="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"
              ></div>
              <p class="text-sm text-muted-foreground">Loading PDF...</p>
            </div>
          </div>
        }

        <!-- Error State -->
        @if (error()) {
          <div
            class="absolute inset-0 flex items-center justify-center bg-background z-10"
          >
            <div class="flex flex-col items-center gap-3 text-center px-4">
              <div
                class="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="text-destructive"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="m15 9-6 6" />
                  <path d="m9 9 6 6" />
                </svg>
              </div>
              <p class="text-sm font-medium text-foreground">
                Failed to load PDF
              </p>
              <p class="text-sm text-muted-foreground max-w-xs">
                {{ error() }}
              </p>
              <button
                type="button"
                class="mt-2 px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                (click)="retry()"
              >
                Retry
              </button>
            </div>
          </div>
        }

        <!-- PDF Embed -->
        @if (src() && !error()) {
          <div
            class="w-full h-full overflow-auto"
            [style.transform]="'rotate(' + rotation() + 'deg)'"
            [style.transform-origin]="'center center'"
          >
            <object
              #pdfObject
              [data]="safePdfUrl()"
              type="application/pdf"
              class="w-full h-full"
              [style.min-height]="'100%'"
              (load)="onLoad()"
              (error)="onError($event)"
            >
              <!-- Fallback for browsers that don't support object -->
              <iframe
                #pdfIframe
                [src]="safePdfUrl()"
                class="w-full h-full border-0"
                [title]="title() || 'PDF Document'"
                (load)="onLoad()"
                (error)="onError($event)"
              ></iframe>
            </object>
          </div>
        }

        <!-- No Source -->
        @if (!src()) {
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="flex flex-col items-center gap-3 text-center px-4">
              <div
                class="w-16 h-16 rounded-full bg-muted flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="text-muted-foreground"
                >
                  <path
                    d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"
                  />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" x2="8" y1="13" y2="13" />
                  <line x1="16" x2="8" y1="17" y2="17" />
                  <line x1="10" x2="8" y1="9" y2="9" />
                </svg>
              </div>
              <p class="text-sm text-muted-foreground">No PDF selected</p>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: `
    :host {
      display: block;
    }

    .fullscreen {
      position: fixed !important;
      inset: 0 !important;
      z-index: 50 !important;
      width: 100vw !important;
      height: 100vh !important;
    }
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScPdfViewer {
  private readonly destroyRef = inject(DestroyRef);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly containerRef =
    viewChild<ElementRef<HTMLDivElement>>('container');

  readonly src = input<string>('');
  readonly title = input<string>('');
  readonly showToolbar = input(true);
  readonly toolbarConfig = input<PdfToolbarConfig>(DEFAULT_TOOLBAR_CONFIG);
  readonly initialPage = input(1);
  readonly initialZoom = input<PdfZoomLevel>('auto');
  readonly class = input<string>('');

  readonly loaded = output<PdfLoadEvent>();
  readonly pageChange = output<PdfPageChangeEvent>();
  readonly zoomChange = output<PdfZoomChangeEvent>();
  readonly errorEvent = output<PdfErrorEvent>();

  protected readonly isLoading = signal(true);
  protected readonly error = signal<string | null>(null);
  protected readonly currentPage = signal(1);
  protected readonly totalPages = signal(1);
  protected readonly zoom = signal<PdfZoomLevel>('auto');
  protected readonly rotation = signal(0);
  protected readonly isFullscreen = signal(false);

  protected readonly containerClass = computed(() =>
    cn(
      'flex flex-col bg-background border rounded-lg overflow-hidden',
      this.class(),
    ),
  );

  protected readonly safePdfUrl = computed<SafeResourceUrl | ''>(() => {
    const source = this.src();
    if (!source) return '';

    // Build URL with parameters for PDF viewer
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
    // Initialize with input values
    this.currentPage.set(this.initialPage());
    this.zoom.set(this.initialZoom());

    // Handle fullscreen change
    const handleFullscreenChange = () => {
      this.isFullscreen.set(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    this.destroyRef.onDestroy(() => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    });
  }

  protected onLoad(): void {
    this.isLoading.set(false);
    this.error.set(null);

    // Emit load event - totalPages would need PDF.js for accurate count
    // For now, we set a placeholder
    this.loaded.emit({ totalPages: this.totalPages() });
  }

  protected onError(event: Event): void {
    this.isLoading.set(false);
    const errorMessage = 'Unable to load the PDF document.';
    this.error.set(errorMessage);
    this.errorEvent.emit({
      error: new Error(errorMessage),
      message: errorMessage,
    });
  }

  protected retry(): void {
    this.error.set(null);
    this.isLoading.set(true);
    // Force reload by updating the signal
    const currentSrc = this.src();
    // Trigger change detection
    setTimeout(() => {
      this.isLoading.set(true);
    }, 0);
  }

  protected goToPrevPage(): void {
    if (this.currentPage() > 1) {
      this.goToPage(this.currentPage() - 1);
    }
  }

  protected goToNextPage(): void {
    if (this.currentPage() < this.totalPages()) {
      this.goToPage(this.currentPage() + 1);
    }
  }

  protected goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
      this.pageChange.emit({
        currentPage: page,
        totalPages: this.totalPages(),
      });
    }
  }

  protected handleZoomIn(): void {
    const current = this.zoom();
    let newZoom: number;

    if (typeof current === 'number') {
      newZoom = Math.min(current + 0.25, 4);
    } else {
      newZoom = 1.25;
    }

    this.handleZoomChange(newZoom);
  }

  protected handleZoomOut(): void {
    const current = this.zoom();
    let newZoom: number;

    if (typeof current === 'number') {
      newZoom = Math.max(current - 0.25, 0.25);
    } else {
      newZoom = 0.75;
    }

    this.handleZoomChange(newZoom);
  }

  protected handleZoomChange(level: PdfZoomLevel): void {
    this.zoom.set(level);
    this.zoomChange.emit({
      zoom: level,
      scale: typeof level === 'number' ? level : 1,
    });
  }

  protected handleRotateLeft(): void {
    this.rotation.update((r) => (r - 90) % 360);
  }

  protected handleRotateRight(): void {
    this.rotation.update((r) => (r + 90) % 360);
  }

  protected handleDownload(): void {
    const source = this.src();
    if (!source) return;

    const link = document.createElement('a');
    link.href = source;
    link.download = this.title() || 'document.pdf';
    link.click();
  }

  protected handlePrint(): void {
    const source = this.src();
    if (!source) return;

    const printWindow = window.open(source);
    if (printWindow) {
      printWindow.onload = () => {
        printWindow.print();
      };
    }
  }

  protected toggleFullscreen(): void {
    const container = this.containerRef()?.nativeElement;
    if (!container) return;

    if (!document.fullscreenElement) {
      container.requestFullscreen().catch((err) => {
        console.error('Error attempting to enable fullscreen:', err);
      });
    } else {
      document.exitFullscreen();
    }
  }

  // Public methods for external control
  setPage(page: number): void {
    this.goToPage(page);
  }

  setZoom(level: PdfZoomLevel): void {
    this.handleZoomChange(level);
  }

  setTotalPages(total: number): void {
    this.totalPages.set(total);
  }
}
