import { Component, ViewEncapsulation, computed, input } from '@angular/core';
import {
  ScEmpty,
  ScEmptyBody,
  ScEmptyHeader,
  ScEmptyTitle,
  ScInput,
} from '@semantic-components/ui';
import {
  ScPdfViewer,
  ScPdfViewerCanvas,
  ScPdfViewerContainer,
  ScPdfViewerContent,
  ScPdfViewerDownload,
  ScPdfViewerError,
  ScPdfViewerLoading,
  ScPdfViewerNav,
  ScPdfViewerNextPage,
  ScPdfViewerPageInput,
  ScPdfViewerPrevPage,
  ScPdfViewerRetry,
  ScPdfViewerSpacer,
  ScPdfViewerToolbar,
  ScPdfViewerZoom,
  ScPdfViewerZoomIn,
  ScPdfViewerZoomOut,
} from '@semantic-components/ui/pdf-viewer';
import {
  SiChevronDownIcon,
  SiChevronUpIcon,
  SiDownloadIcon,
  SiZoomInIcon,
  SiZoomOutIcon,
} from '@semantic-icons/lucide-icons';
import { cn } from 'cn';

/** A viewer with the essentials: pages, zoom, download. */
@Component({
  selector: 'app-pdf-viewer-usage-demo',
  imports: [
    ScPdfViewer,
    ScPdfViewerContainer,
    ScPdfViewerToolbar,
    ScPdfViewerNav,
    ScPdfViewerPrevPage,
    ScPdfViewerNextPage,
    ScPdfViewerPageInput,
    ScPdfViewerSpacer,
    ScPdfViewerZoom,
    ScPdfViewerZoomOut,
    ScPdfViewerZoomIn,
    ScPdfViewerDownload,
    ScPdfViewerContent,
    ScPdfViewerLoading,
    ScPdfViewerError,
    ScPdfViewerRetry,
    ScPdfViewerCanvas,
    ScEmpty,
    ScEmptyHeader,
    ScEmptyTitle,
    ScEmptyBody,
    ScInput,
    SiChevronUpIcon,
    SiChevronDownIcon,
    SiZoomOutIcon,
    SiZoomInIcon,
    SiDownloadIcon,
  ],
  template: `
    <div
      scPdfViewer
      class="size-full"
      src="/pdf/handbook.pdf"
      fileName="handbook"
      #viewer="scPdfViewer"
    >
      <div scPdfViewerContainer class="size-full">
        <div scPdfViewerToolbar aria-label="Handbook">
          <div scPdfViewerNav aria-label="Pages">
            <button scPdfViewerPrevPage>
              <svg siChevronUpIcon></svg>
              <span class="sr-only">Previous page</span>
            </button>
            <button scPdfViewerNextPage>
              <svg siChevronDownIcon></svg>
              <span class="sr-only">Next page</span>
            </button>
          </div>
          <input scInput scPdfViewerPageInput aria-label="Page" />
          <span class="text-muted-foreground text-sm">
            ({{ viewer.currentPage() }} of {{ viewer.totalPages() }})
          </span>
          <div scPdfViewerSpacer></div>
          <div scPdfViewerZoom aria-label="Zoom">
            <button scPdfViewerZoomOut>
              <svg siZoomOutIcon></svg>
              <span class="sr-only">Zoom out</span>
            </button>
            <button scPdfViewerZoomIn>
              <svg siZoomInIcon></svg>
              <span class="sr-only">Zoom in</span>
            </button>
          </div>
          <button scPdfViewerDownload>
            <svg siDownloadIcon></svg>
            <span class="sr-only">Download</span>
          </button>
        </div>
        <div scPdfViewerContent>
          <div scPdfViewerLoading>Loading the handbook…</div>
          <div scEmpty scPdfViewerError>
            <div scEmptyHeader>
              <div scEmptyTitle>Couldn't open the document</div>
            </div>
            <div scEmptyBody>
              <button scPdfViewerRetry>Try again</button>
            </div>
          </div>
          <div scPdfViewerCanvas></div>
        </div>
      </div>
    </div>
  `,
  host: { '[class]': 'class()' },
  encapsulation: ViewEncapsulation.None,
})
export class PdfViewerUsageDemo {
  readonly classInput = input<string>('', { alias: 'class' });
  private readonly class = computed(() =>
    cn('block h-dvh w-full', this.classInput()),
  );
}
