import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { AvatarCropperDemo } from './avatar-cropper-demo';

@Component({
  selector: 'app-avatar-cropper-demo-container',
  imports: [DemoContainer, AvatarCropperDemo],
  template: `
    <app-demo-container
      title="Circle Crop / Avatar (X)"
      demoUrl="/demos/image-cropper/avatar-cropper-demo"
      [code]="code"
    >
      <app-avatar-cropper-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarCropperDemoContainer {
  readonly code = `// See source for full implementation`;
}
