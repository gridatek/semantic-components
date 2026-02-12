import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScPdfViewerRoot,
  ScPdfViewerContainer,
  ScPdfViewerToolbar,
  ScPdfViewerNav,
  ScPdfViewerPrevPage,
  ScPdfViewerNextPage,
  ScPdfViewerPageInfo,
  ScPdfViewerContent,
  ScPdfViewerLoading,
  ScPdfViewerError,
  ScPdfViewerEmpty,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-custom-toolbar-pdf-viewer-demo',
  imports: [
    ScPdfViewerRoot,
    ScPdfViewerContainer,
    ScPdfViewerToolbar,
    ScPdfViewerNav,
    ScPdfViewerPrevPage,
    ScPdfViewerNextPage,
    ScPdfViewerPageInfo,
    ScPdfViewerContent,
    ScPdfViewerLoading,
    ScPdfViewerError,
    ScPdfViewerEmpty,
  ],
  template: `
    <div class="h-[400px]">
      <div
        sc-pdf-viewer
        src="https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf"
      >
        <div sc-pdf-viewer-container class="h-full">
          <!-- Custom toolbar with only navigation -->
          <div sc-pdf-viewer-toolbar>
            <div sc-pdf-viewer-nav>
              <button sc-pdf-viewer-prev-page>
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
              <div sc-pdf-viewer-page-info></div>
              <button sc-pdf-viewer-next-page>
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
          </div>

          <div sc-pdf-viewer-content>
            <div sc-pdf-viewer-loading></div>
            <div sc-pdf-viewer-error></div>
            <div sc-pdf-viewer-empty></div>
          </div>
        </div>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomToolbarPdfViewerDemo {}
