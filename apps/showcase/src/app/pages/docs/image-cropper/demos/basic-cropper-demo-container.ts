import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicCropperDemo } from './basic-cropper-demo';

@Component({
  selector: 'app-basic-cropper-demo-container',
  imports: [DemoContainer, BasicCropperDemo],
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
export class BasicCropperDemoContainer {
  readonly code = `// See source for full implementation`;
}
