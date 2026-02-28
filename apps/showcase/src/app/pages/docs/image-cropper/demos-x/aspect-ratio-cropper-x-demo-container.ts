import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { AspectRatioCropperXDemo } from './aspect-ratio-cropper-demo';

@Component({
  selector: 'app-aspect-ratio-cropper-demo-container',
  imports: [DemoContainer, AspectRatioCropperXDemo],
  template: `
    <app-demo-container
      title="With Aspect Ratio Presets (X)"
      demoUrl="/demos/image-cropper/aspect-ratio-cropper-demo"
      [code]="code"
    >
      <app-aspect-ratio-cropper-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AspectRatioCropperXDemoContainer {
  readonly code = `// See source for full implementation`;
}
