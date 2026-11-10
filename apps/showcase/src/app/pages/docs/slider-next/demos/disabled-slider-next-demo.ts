import { Component, ViewEncapsulation } from '@angular/core';
import { ScSliderNext } from '@semantic-components/ui';

/** Disabled: dimmed, out of the Tab order. */
@Component({
  selector: 'app-disabled-slider-next-demo',
  imports: [ScSliderNext],
  template: `
    <input
      type="range"
      scSliderNext
      [value]="50"
      disabled
      aria-label="Volume"
      class="max-w-xs"
    />
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledSliderNextDemo {}
