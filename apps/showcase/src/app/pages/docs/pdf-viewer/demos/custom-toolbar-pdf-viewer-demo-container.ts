import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { CustomToolbarPdfViewerDemo } from './custom-toolbar-pdf-viewer-demo';

@Component({
  selector: 'app-custom-toolbar-pdf-viewer-demo-container',
  imports: [DemoContainer, CustomToolbarPdfViewerDemo],
  template: `
    <app-demo-container title="Custom Toolbar (Navigation Only)" [code]="code">
      <app-custom-toolbar-pdf-viewer-demo />
    </app-demo-container>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomToolbarPdfViewerDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScPdfViewerContainer,
  ScPdfViewerContent,
  ScPdfViewerEmpty,
  ScPdfViewerError,
  ScPdfViewerLoading,
  ScPdfViewerNav,
  ScPdfViewerNextPage,
  ScPdfViewerPageInfo,
  ScPdfViewerPrevPage,
  ScPdfViewerRoot,
  ScPdfViewerToolbar,
} from '@semantic-components/ui-lab';
import {
  SiChevronLeftIcon,
  SiChevronRightIcon,
} from '@semantic-icons/lucide-icons';

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
    SiChevronLeftIcon,
    SiChevronRightIcon,
  ],
  template: \`
    <div class="h-[400px]">
      <div
        scPdfViewer
        src="https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf"
      >
        <div scPdfViewerContainer class="h-full">
          <!-- Custom toolbar with only navigation -->
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
          </div>

          <div scPdfViewerContent>
            <div scPdfViewerLoading></div>
            <div scPdfViewerError></div>
            <div scPdfViewerEmpty></div>
          </div>
        </div>
      </div>
    </div>
  \`,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomToolbarPdfViewerDemo {}`;
}
