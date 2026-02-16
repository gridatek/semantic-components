import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  ScPdfViewerRoot,
  ScPdfViewerContainer,
  ScPdfViewerToolbar,
  ScPdfViewerNav,
  ScPdfViewerPrevPage,
  ScPdfViewerNextPage,
  ScPdfViewerPageInfo,
  ScPdfViewerZoom,
  ScPdfViewerZoomIn,
  ScPdfViewerZoomOut,
  ScPdfViewerZoomSelect,
  ScPdfViewerDownload,
  ScPdfViewerFullscreen,
  ScPdfViewerSeparator,
  ScPdfViewerSpacer,
  ScPdfViewerContent,
  ScPdfViewerLoading,
  ScPdfViewerError,
  ScPdfViewerEmpty,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-interactive-pdf-viewer-demo',
  imports: [
    FormsModule,
    ScPdfViewerRoot,
    ScPdfViewerContainer,
    ScPdfViewerToolbar,
    ScPdfViewerNav,
    ScPdfViewerPrevPage,
    ScPdfViewerNextPage,
    ScPdfViewerPageInfo,
    ScPdfViewerZoom,
    ScPdfViewerZoomIn,
    ScPdfViewerZoomOut,
    ScPdfViewerZoomSelect,
    ScPdfViewerDownload,
    ScPdfViewerFullscreen,
    ScPdfViewerSeparator,
    ScPdfViewerSpacer,
    ScPdfViewerContent,
    ScPdfViewerLoading,
    ScPdfViewerError,
    ScPdfViewerEmpty,
  ],
  template: `
    <div class="space-y-4">
      <div class="flex gap-2">
        <input
          type="url"
          [(ngModel)]="pdfUrl"
          placeholder="Enter PDF URL..."
          class="flex-1 px-3 py-2 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <button
          type="button"
          class="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          (click)="loadPdf()"
        >
          Load PDF
        </button>
      </div>

      <p class="text-sm text-muted-foreground">
        Enter a PDF URL or use one of the samples below
      </p>

      <div class="flex flex-wrap gap-2">
        @for (sample of samplePdfs; track sample.url) {
          <button
            type="button"
            class="px-3 py-1.5 text-xs font-medium border rounded-lg hover:bg-muted transition-colors"
            (click)="pdfUrl = sample.url; loadPdf()"
          >
            {{ sample.name }}
          </button>
        }
      </div>

      <div class="h-[600px]">
        <div
          scPdfViewer
          [src]="currentPdf()"
          title="Sample PDF"
          #viewer="scPdfViewer"
        >
          <div scPdfViewerContainer class="h-full">
            <div scPdfViewerToolbar>
              <div scPdfViewerNav>
                <button scPdfViewerPrevPage>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                </button>
                <div scPdfViewerPageInfo></div>
                <button scPdfViewerNextPage>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </button>
              </div>

              <div scPdfViewerSeparator></div>

              <div scPdfViewerZoom>
                <button scPdfViewerZoomOut>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                    <path d="M8 11h6" />
                  </svg>
                </button>
                <select scPdfViewerZoomSelect></select>
                <button scPdfViewerZoomIn>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                    <path d="M11 8v6" />
                    <path d="M8 11h6" />
                  </svg>
                </button>
              </div>

              <div scPdfViewerSpacer></div>

              <button scPdfViewerDownload>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" x2="12" y1="15" y2="3" />
                </svg>
              </button>
              <button scPdfViewerFullscreen>
                @if (viewer.isFullscreen()) {
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M8 3v3a2 2 0 0 1-2 2H3" />
                    <path d="M21 8h-3a2 2 0 0 1-2-2V3" />
                    <path d="M3 16h3a2 2 0 0 1 2 2v3" />
                    <path d="M16 21v-3a2 2 0 0 1 2-2h3" />
                  </svg>
                } @else {
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M8 3H5a2 2 0 0 0-2 2v3" />
                    <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
                    <path d="M3 16v3a2 2 0 0 0 2 2h3" />
                    <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
                  </svg>
                }
              </button>
            </div>

            <div scPdfViewerContent>
              <div scPdfViewerLoading></div>
              <div scPdfViewerError></div>
              <div scPdfViewerEmpty></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Status display using template reference -->
      <div class="flex gap-4 text-sm text-muted-foreground">
        <span>Loading: {{ viewer.isLoading() }}</span>
        <span>
          Page: {{ viewer.currentPage() }} / {{ viewer.totalPages() }}
        </span>
        <span>Zoom: {{ viewer.zoom() }}</span>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InteractivePdfViewerDemo {
  pdfUrl = '';

  readonly currentPdf = signal(
    'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf',
  );

  readonly samplePdfs = [
    {
      name: 'W3C Sample',
      url: 'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf',
    },
    {
      name: 'PDF.js Sample',
      url: 'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf',
    },
  ];

  loadPdf(): void {
    if (this.pdfUrl) {
      this.currentPdf.set(this.pdfUrl);
    }
  }
}
