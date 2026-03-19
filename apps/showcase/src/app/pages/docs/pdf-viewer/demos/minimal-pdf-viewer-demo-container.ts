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
  ScPdfViewerCanvas,
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
    ScPdfViewerCanvas,
  ],
  template: \`
    <div class="h-[400px] w-full">
      <div
        scPdfViewer
        class="h-full"
        src="https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf"
      >
        <div scPdfViewerContainer class="h-full">
          <div scPdfViewerContent>
            <div scPdfViewerLoading></div>
            <div scPdfViewerError></div>
            <div scPdfViewerEmpty></div>

            <sc-pdf-viewer-canvas />
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
