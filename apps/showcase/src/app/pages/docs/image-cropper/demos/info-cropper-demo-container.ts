import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { InfoCropperDemo } from './info-cropper-demo';

@Component({
  selector: 'app-info-cropper-demo-container',
  imports: [DemoContainer, InfoCropperDemo],
  template: `
    <app-demo-container
      title="Crop Area Info"
      demoUrl="/demos/image-cropper/info-cropper-demo"
      [code]="code"
    >
      <app-info-cropper-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoCropperDemoContainer {
  readonly code = `// See source for full implementation`;
}
