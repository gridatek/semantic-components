import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { FullFeaturedCropperDemo } from './full-featured-cropper-demo';

@Component({
  selector: 'app-full-featured-cropper-demo-container',
  imports: [DemoContainer, FullFeaturedCropperDemo],
  template: `
    <app-demo-container
      title="Full Featured"
      demoUrl="/demos/image-cropper/full-featured-cropper-demo"
      [code]="code"
    >
      <app-full-featured-cropper-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FullFeaturedCropperDemoContainer {
  readonly code = `// See source for full implementation`;
}
