import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScRangeSlider, ScRangeSliderThumb } from '@semantic-components/ui';

/** Two thumbs on one track, the range between them: the value is the pair. */
@Component({
  selector: 'app-range-slider-usage-demo',
  imports: [ScRangeSlider, ScRangeSliderThumb],
  template: `
    <div scRangeSlider [(value)]="range" class="max-w-xs">
      <input scRangeSliderThumb aria-label="Minimum" />
      <input scRangeSliderThumb aria-label="Maximum" />
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RangeSliderUsageDemo {
  private readonly range = signal<readonly [number, number]>([25, 75]);
}
