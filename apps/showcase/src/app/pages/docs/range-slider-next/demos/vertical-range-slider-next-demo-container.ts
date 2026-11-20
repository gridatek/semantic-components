import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { VerticalRangeSliderNextDemo } from './vertical-range-slider-next-demo';

@Component({
  selector: 'app-vertical-range-slider-next-demo-container',
  imports: [DemoContainer, VerticalRangeSliderNextDemo],
  template: `
    <app-demo-container
      title="Vertical"
      demoUrl="/demos/range-slider-next/vertical-range-slider-next-demo"
      [code]="code"
    >
      <app-vertical-range-slider-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class VerticalRangeSliderNextDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScRangeSliderNext, ScRangeSliderNextThumb } from '@semantic-components/ui';

/** Upright: the values grow upward, ArrowUp raises a thumb. */
@Component({
  selector: 'app-vertical-range-slider-next-demo',
  imports: [ScRangeSliderNext, ScRangeSliderNextThumb],
  template: \`
    <div
      scRangeSliderNext
      orientation="vertical"
      [(value)]="range"
      class="h-48"
    >
      <input scRangeSliderNextThumb aria-label="Lowest" />
      <input scRangeSliderNextThumb aria-label="Highest" />
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class VerticalRangeSliderNextDemo {
  private readonly range = signal<readonly [number, number]>([20, 60]);
}`;
}
