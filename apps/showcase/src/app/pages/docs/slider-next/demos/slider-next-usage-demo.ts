import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScSliderNext } from '@semantic-components/ui';

/** A slider, named by aria-label (no label beside it). */
@Component({
  selector: 'app-slider-next-usage-demo',
  imports: [ScSliderNext],
  template: `
    <input
      type="range"
      scSliderNext
      [(value)]="volume"
      aria-label="Volume"
      class="max-w-xs"
    />
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SliderNextUsageDemo {
  protected readonly volume = signal(75);
}
