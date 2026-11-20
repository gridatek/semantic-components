import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScRangeSlider, ScRangeSliderThumb } from '@semantic-components/ui';

/** Disabled: neither thumb takes the pointer or the focus. */
@Component({
  selector: 'app-disabled-range-slider-demo',
  imports: [ScRangeSlider, ScRangeSliderThumb],
  template: `
    <div scRangeSlider disabled [(value)]="range" class="max-w-xs">
      <input scRangeSliderThumb aria-label="Minimum" />
      <input scRangeSliderThumb aria-label="Maximum" />
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledRangeSliderDemo {
  private readonly range = signal<readonly [number, number]>([25, 75]);
}
