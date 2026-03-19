import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { MinimalPdfViewerDemo } from './minimal-pdf-viewer-demo';

@Component({
  selector: 'app-minimal-pdf-viewer-demo-container',
  imports: [DemoContainer, MinimalPdfViewerDemo],
  template: `
    <app-demo-container
      title="Minimal (No Toolbar)"
      demoUrl="/demos/pdf-viewer/minimal-pdf-viewer-demo"
      [code]="code"
    >
      <app-minimal-pdf-viewer-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MinimalPdfViewerDemoContainer {
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
  ScPdfViewerRoot,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-minimal-pdf-viewer-demo',
  imports: [
    ScPdfViewerRoot,
    ScPdfViewerContainer,
    ScPdfViewerContent,
    ScPdfViewerLoading,
    ScPdfViewerError,
    ScPdfViewerEmpty,
  ],
  template: \`
    <div class="h-[400px]">
      <div
        scPdfViewer
        #viewer="scPdfViewer"
        src="https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf"
      >
        <div scPdfViewerContainer class="h-full">
          <div scPdfViewerContent>
            <div scPdfViewerLoading></div>
            <div scPdfViewerError></div>
            <div scPdfViewerEmpty></div>

            @if (viewer.showContent()) {
              <div
                class="h-full w-full overflow-auto"
                [style.transform]="'rotate(' + viewer.rotation() + 'deg)'"
                [style.transform-origin]="'center center'"
              >
                <object
                  [data]="viewer.safePdfUrl()"
                  type="application/pdf"
                  class="h-full w-full"
                  [style.min-height]="'100%'"
                  (load)="viewer.onLoad()"
                  (error)="viewer.onError()"
                >
                  <iframe
                    [src]="viewer.safePdfUrl()"
                    class="h-full w-full border-0"
                    [title]="viewer.title() || 'PDF Document'"
                    (load)="viewer.onLoad()"
                    (error)="viewer.onError()"
                  ></iframe>
                </object>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MinimalPdfViewerDemo {}`;
}
