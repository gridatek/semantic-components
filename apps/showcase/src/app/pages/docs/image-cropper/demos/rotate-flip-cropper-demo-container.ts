import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { RotateFlipCropperDemo } from './rotate-flip-cropper-demo';

@Component({
  selector: 'app-rotate-flip-cropper-demo-container',
  imports: [DemoContainer, RotateFlipCropperDemo],
  template: `
    <app-demo-container
      title="Rotation & Flip"
      demoUrl="/demos/image-cropper/rotate-flip-cropper-demo"
      [code]="code"
    >
      <app-rotate-flip-cropper-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RotateFlipCropperDemoContainer {
  readonly code = `// See source for full implementation`;
}
