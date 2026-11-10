import { Component, ViewEncapsulation } from '@angular/core';
import { ScSlider } from '@semantic-components/ui';

/** Disabled: dimmed, out of the Tab order. */
@Component({
  selector: 'app-disabled-slider-demo',
  imports: [ScSlider],
  template: `
    <input
      scSlider
      [value]="50"
      disabled
      aria-label="Volume"
      class="max-w-xs"
    />
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledSliderDemo {}
