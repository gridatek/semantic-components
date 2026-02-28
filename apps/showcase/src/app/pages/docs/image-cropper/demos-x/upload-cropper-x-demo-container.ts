import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { UploadCropperXDemo } from './upload-cropper-demo';

@Component({
  selector: 'app-upload-cropper-demo-container',
  imports: [DemoContainer, UploadCropperXDemo],
  template: `
    <app-demo-container
      title="Upload Your Own Image (X)"
      demoUrl="/demos/image-cropper/upload-cropper-demo"
      [code]="code"
    >
      <app-upload-cropper-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploadCropperXDemoContainer {
  readonly code = `// See source for full implementation`;
}
