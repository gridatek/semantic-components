import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { InteractivePdfViewerDemo } from './interactive-pdf-viewer-demo';

@Component({
  selector: 'app-interactive-pdf-viewer-demo-container',
  imports: [DemoContainer, InteractivePdfViewerDemo],
  template: `
    <app-demo-container title="Interactive PDF Viewer" [code]="code">
      <app-interactive-pdf-viewer-demo />
    </app-demo-container>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InteractivePdfViewerDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  ScPdfViewerContainer,
  ScPdfViewerContent,
  ScPdfViewerDownload,
  ScPdfViewerEmpty,
  ScPdfViewerError,
  ScPdfViewerFullscreen,
  ScPdfViewerLoading,
  ScPdfViewerNav,
  ScPdfViewerNextPage,
  ScPdfViewerPageInfo,
  ScPdfViewerPrevPage,
  ScPdfViewerRoot,
  ScPdfViewerSeparator,
  ScPdfViewerSpacer,
  ScPdfViewerToolbar,
  ScPdfViewerZoom,
  ScPdfViewerZoomIn,
  ScPdfViewerZoomOut,
  ScPdfViewerZoomSelect,
} from '@semantic-components/ui-lab';
import {
  SiChevronLeftIcon,
  SiChevronRightIcon,
  SiDownloadIcon,
  SiMaximizeIcon,
  SiMinimizeIcon,
  SiZoomInIcon,
  SiZoomOutIcon,
} from '@semantic-icons/lucide-icons';

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
    SiChevronLeftIcon,
    SiChevronRightIcon,
    SiZoomOutIcon,
    SiZoomInIcon,
    SiDownloadIcon,
    SiMaximizeIcon,
    SiMinimizeIcon,
  ],
  template: \`
    <div class="space-y-4">
      <div class="flex gap-2">
        <input
          type="url"
          [(ngModel)]="pdfUrl"
          placeholder="Enter PDF URL..."
          class="bg-background focus:ring-ring flex-1 rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:outline-none"
        />
        <button
          type="button"
          class="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-4 py-2 text-sm font-medium transition-colors"
          (click)="loadPdf()"
        >
          Load PDF
        </button>
      </div>

      <p class="text-muted-foreground text-sm">
        Enter a PDF URL or use one of the samples below
      </p>

      <div class="flex flex-wrap gap-2">
        @for (sample of samplePdfs; track sample.url) {
          <button
            type="button"
            class="hover:bg-muted rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors"
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
                  <svg siChevronLeftIcon class="size-4"></svg>
                </button>
                <div scPdfViewerPageInfo></div>
                <button scPdfViewerNextPage>
                  <svg siChevronRightIcon class="size-4"></svg>
                </button>
              </div>

              <div scPdfViewerSeparator></div>

              <div scPdfViewerZoom>
                <button scPdfViewerZoomOut>
                  <svg siZoomOutIcon class="size-4"></svg>
                </button>
                <select scPdfViewerZoomSelect></select>
                <button scPdfViewerZoomIn>
                  <svg siZoomInIcon class="size-4"></svg>
                </button>
              </div>

              <div scPdfViewerSpacer></div>

              <button scPdfViewerDownload>
                <svg siDownloadIcon class="size-4"></svg>
              </button>
              <button scPdfViewerFullscreen>
                @if (viewer.isFullscreen()) {
                  <svg siMinimizeIcon class="size-4"></svg>
                } @else {
                  <svg siMaximizeIcon class="size-4"></svg>
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
      <div class="text-muted-foreground flex gap-4 text-sm">
        <span>Loading: {{ viewer.isLoading() }}</span>
        <span>
          Page: {{ viewer.currentPage() }} / {{ viewer.totalPages() }}
        </span>
        <span>Zoom: {{ viewer.zoom() }}</span>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
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
}`;
}
