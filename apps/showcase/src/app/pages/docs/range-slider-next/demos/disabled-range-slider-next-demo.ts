import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScRangeSliderNext,
  ScRangeSliderNextThumb,
} from '@semantic-components/ui';

/** Disabled: neither thumb takes the pointer or the focus. */
@Component({
  selector: 'app-disabled-range-slider-next-demo',
  imports: [ScRangeSliderNext, ScRangeSliderNextThumb],
  template: `
    <div scRangeSliderNext disabled [(value)]="range" class="max-w-xs">
      <input scRangeSliderNextThumb aria-label="Minimum" />
      <input scRangeSliderNextThumb aria-label="Maximum" />
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledRangeSliderNextDemo {
  private readonly range = signal<readonly [number, number]>([25, 75]);
}
