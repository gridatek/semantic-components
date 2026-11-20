import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScRangeSliderNext,
  ScRangeSliderNextThumb,
} from '@semantic-components/ui';

/** Upright: the values grow upward, ArrowUp raises a thumb. */
@Component({
  selector: 'app-vertical-range-slider-next-demo',
  imports: [ScRangeSliderNext, ScRangeSliderNextThumb],
  template: `
    <div
      scRangeSliderNext
      orientation="vertical"
      [(value)]="range"
      class="h-48"
    >
      <input scRangeSliderNextThumb aria-label="Lowest" />
      <input scRangeSliderNextThumb aria-label="Highest" />
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class VerticalRangeSliderNextDemo {
  private readonly range = signal<readonly [number, number]>([20, 60]);
}
