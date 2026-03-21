import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScPdfViewerCanvas,
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
  SiMinimizeIcon,
  SiPrinterIcon,
  SiRotateCcwIcon,
  SiRotateCwIcon,
  SiZoomInIcon,
  SiZoomOutIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-pdf-viewer-demo',
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
    ScPdfViewerCanvas,
    SiChevronLeftIcon,
    SiChevronRightIcon,
    SiDownloadIcon,
    SiMaximizeIcon,
    SiMinimizeIcon,
    SiPrinterIcon,
    SiRotateCcwIcon,
    SiRotateCwIcon,
    SiZoomInIcon,
    SiZoomOutIcon,
  ],
  template: `
    <div class="pdfjs-viewer h-[800px]">
      <div
        scPdfViewer
        class="h-full"
        src="https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf"
        title="tracemonkey"
        #viewer="scPdfViewer"
      >
        <div scPdfViewerContainer class="h-full rounded-none border-none">
          <div
            scPdfViewerToolbar
            class="border-b-[#333] bg-[#474747] px-2 py-1"
          >
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

            <div scPdfViewerSeparator class="bg-[#666]"></div>

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

            <div scPdfViewerSeparator class="bg-[#666]"></div>

            <!-- Actions -->
            <button scPdfViewerDownload>
              <svg siDownloadIcon class="size-4"></svg>
            </button>
            <button scPdfViewerPrint>
              <svg siPrinterIcon class="size-4"></svg>
            </button>
            <button scPdfViewerFullscreen>
              @if (viewer.isFullscreen()) {
                <svg siMinimizeIcon class="size-4"></svg>
              } @else {
                <svg siMaximizeIcon class="size-4"></svg>
              }
            </button>
          </div>

          <!-- Content -->
          <div scPdfViewerContent class="bg-[#808080]">
            <div scPdfViewerLoading></div>
            <div scPdfViewerError></div>
            <div scPdfViewerEmpty></div>

            <sc-pdf-viewer-canvas />
          </div>
        </div>
      </div>
    </div>
  `,
  styles: `
    .pdfjs-viewer {
      /* Toolbar buttons */
      [data-slot='pdf-viewer-toolbar'] button {
        color: #d1d5db;
        background: transparent;
        border: none;
        border-radius: 4px;
        padding: 4px;
        height: 28px;
        width: 28px;

        &:hover:not(:disabled) {
          color: #fff;
          background: rgba(255, 255, 255, 0.15);
        }

        &:disabled {
          color: #6b7280;
          opacity: 0.5;
        }
      }

      /* Page info input */
      [data-slot='pdf-viewer-page-info'] input {
        background: #3d3d3d;
        border-color: #5a5a5a;
        color: #d1d5db;
        width: 3rem;
        height: 24px;
        font-size: 13px;

        &:focus {
          border-color: #6b9edd;
          box-shadow: none;
        }
      }

      [data-slot='pdf-viewer-page-info'] span {
        color: #bbb;
        font-size: 13px;
      }

      /* Zoom select */
      [data-slot='pdf-viewer-zoom-select'] {
        background: #3d3d3d;
        border-color: #5a5a5a;
        color: #d1d5db;
        height: 26px;
        font-size: 13px;
        padding: 0 4px;
      }

      /* Canvas content area */
      [data-slot='pdf-viewer-content'] [role='document'] {
        background: #808080;
      }

      /* Page canvas containers */
      [data-slot='pdf-viewer-canvas'] [data-page] {
        box-shadow:
          0 1px 3px rgba(0, 0, 0, 0.3),
          0 4px 8px rgba(0, 0, 0, 0.15);
      }
    }
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PdfViewerDemo {}
