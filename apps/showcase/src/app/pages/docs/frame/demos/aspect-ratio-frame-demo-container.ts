import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { AspectRatioFrameDemo } from './aspect-ratio-frame-demo';

@Component({
  selector: 'app-aspect-ratio-frame-demo-container',
  imports: [DemoContainer, AspectRatioFrameDemo],
  template: `
    <app-demo-container
      title="Aspect Ratio"
      demoUrl="/demos/frame/aspect-ratio-frame-demo"
      [code]="code"
    >
      <app-aspect-ratio-frame-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class AspectRatioFrameDemoContainer {
  readonly code = `import { NgOptimizedImage } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { ScAspectRatio, ScFrame } from '@semantic-components/ui';

/** A framed photo: the aspect ratio clips it to the frame's corners. */
@Component({
  selector: 'app-aspect-ratio-frame-demo',
  imports: [NgOptimizedImage, ScAspectRatio, ScFrame],
  template: \`
    <div scAspectRatio scFrame [ratio]="16 / 9" class="w-full max-w-sm">
      <img
        ngSrc="/images/gallery/coast.jpg"
        fill
        priority
        alt="A rocky coast"
        class="object-cover"
      />
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class AspectRatioFrameDemo {}`;
}
