import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScRangeSlider, ScRangeSliderThumb } from '@semantic-components/ui';

/** Upright: the values grow upward, ArrowUp raises a thumb. */
@Component({
  selector: 'app-vertical-range-slider-demo',
  imports: [ScRangeSlider, ScRangeSliderThumb],
  template: `
    <div scRangeSlider orientation="vertical" [(value)]="range" class="h-48">
      <input scRangeSliderThumb aria-label="Lowest" />
      <input scRangeSliderThumb aria-label="Highest" />
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class VerticalRangeSliderDemo {
  private readonly range = signal<readonly [number, number]>([20, 60]);
}
