import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { PdfViewerDemo } from './pdf-viewer-demo';

@Component({
  selector: 'app-pdf-viewer-demo-container',
  imports: [DemoContainer, PdfViewerDemo],
  template: `
    <app-demo-container
      title="PDF Viewer"
      demoUrl="/demos/pdf-viewer/pdf-viewer-demo"
      [code]="code"
    >
      <app-pdf-viewer-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PdfViewerDemoContainer {
  readonly code = '';
}
