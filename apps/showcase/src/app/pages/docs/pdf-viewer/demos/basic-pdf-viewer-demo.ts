import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
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
  ScPdfViewerPrint,
  ScPdfViewerRoot,
  ScPdfViewerRotateLeft,
  ScPdfViewerRotateRight,
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
  SiPrinterIcon,
  SiRotateCcwIcon,
  SiRotateCwIcon,
  SiZoomInIcon,
  SiZoomOutIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-basic-pdf-viewer-demo',
  imports: [
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
    ScPdfViewerRotateLeft,
    ScPdfViewerRotateRight,
    ScPdfViewerDownload,
    ScPdfViewerPrint,
    ScPdfViewerFullscreen,
    ScPdfViewerSeparator,
    ScPdfViewerSpacer,
    ScPdfViewerContent,
    ScPdfViewerLoading,
    ScPdfViewerError,
    ScPdfViewerEmpty,
    SiChevronLeftIcon,
    SiChevronRightIcon,
    SiDownloadIcon,
    SiMaximizeIcon,
    SiPrinterIcon,
    SiRotateCcwIcon,
    SiRotateCwIcon,
    SiZoomInIcon,
    SiZoomOutIcon,
  ],
  template: `
    <div class="h-[600px]">
      <div
        scPdfViewer
        src="https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf"
        title="Sample PDF"
      >
        <div scPdfViewerContainer class="h-full">
          <!-- Toolbar -->
          <div scPdfViewerToolbar>
            <!-- Navigation -->
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

            <!-- Zoom -->
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

            <!-- Rotate -->
            <button scPdfViewerRotateLeft>
              <svg siRotateCcwIcon class="size-4"></svg>
            </button>
            <button scPdfViewerRotateRight>
              <svg siRotateCwIcon class="size-4"></svg>
            </button>

            <div scPdfViewerSeparator></div>

            <!-- Actions -->
            <button scPdfViewerDownload>
              <svg siDownloadIcon class="size-4"></svg>
            </button>
            <button scPdfViewerPrint>
              <svg siPrinterIcon class="size-4"></svg>
            </button>
            <button scPdfViewerFullscreen>
              <svg siMaximizeIcon class="size-4"></svg>
            </button>
          </div>

          <!-- Content -->
          <div scPdfViewerContent>
            <div scPdfViewerLoading></div>
            <div scPdfViewerError></div>
            <div scPdfViewerEmpty></div>
          </div>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicPdfViewerDemo {}
