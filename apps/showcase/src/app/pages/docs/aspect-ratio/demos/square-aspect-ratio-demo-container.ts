import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SquareAspectRatioDemo } from './square-aspect-ratio-demo';

@Component({
  selector: 'app-square-aspect-ratio-demo-container',
  imports: [DemoContainer, SquareAspectRatioDemo],
  template: `
    <app-demo-container
      title="Square"
      demoUrl="/demos/aspect-ratio/square-aspect-ratio-demo"
      [code]="code"
    >
      <app-square-aspect-ratio-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class SquareAspectRatioDemoContainer {
  readonly code = `import { NgOptimizedImage } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { ScAspectRatio, ScFrame } from '@semantic-components/ui';

/** A square: ratio 1. */
@Component({
  selector: 'app-square-aspect-ratio-demo',
  imports: [NgOptimizedImage, ScAspectRatio, ScFrame],
  template: \`
    <div scAspectRatio scFrame [ratio]="1" class="w-full max-w-48">
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
export class SquareAspectRatioDemo {}`;
}
