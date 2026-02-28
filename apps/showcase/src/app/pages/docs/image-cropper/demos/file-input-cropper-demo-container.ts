import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { FileInputCropperDemo } from './file-input-cropper-demo';

@Component({
  selector: 'app-file-input-cropper-demo-container',
  imports: [DemoContainer, FileInputCropperDemo],
  template: `
    <app-demo-container
      title="File Input Directive"
      demoUrl="/demos/image-cropper/file-input-cropper-demo"
      [code]="code"
    >
      <app-file-input-cropper-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileInputCropperDemoContainer {
  readonly code = `// See source for full implementation`;
}
