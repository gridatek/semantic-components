import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { InfoCropperXDemo } from './info-cropper-demo';

@Component({
  selector: 'app-info-cropper-demo-container',
  imports: [DemoContainer, InfoCropperXDemo],
  template: `
    <app-demo-container
      title="Crop Area Info (X)"
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
export class InfoCropperXDemoContainer {
  readonly code = `// See source for full implementation`;
}
