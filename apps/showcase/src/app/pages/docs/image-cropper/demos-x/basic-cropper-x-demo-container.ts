import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicCropperXDemo } from './basic-cropper-demo';

@Component({
  selector: 'app-basic-cropper-demo-container',
  imports: [DemoContainer, BasicCropperXDemo],
  template: `
    <app-demo-container
      title="Basic (X)"
      demoUrl="/demos/image-cropper/basic-cropper-demo"
      [code]="code"
    >
      <app-basic-cropper-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicCropperXDemoContainer {
  readonly code = `// See source for full implementation`;
}
