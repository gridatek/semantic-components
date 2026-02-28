import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { AvatarCropperXDemo } from './avatar-cropper-x-demo';

@Component({
  selector: 'app-avatar-cropper-x-demo-container',
  imports: [DemoContainer, AvatarCropperXDemo],
  template: `
    <app-demo-container
      title="Circle Crop / Avatar (X)"
      demoUrl="/demos/image-cropper-x/avatar-cropper-x-demo"
      [code]="code"
    >
      <app-avatar-cropper-x-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarCropperXDemoContainer {
  readonly code = `// See source for full implementation`;
}
