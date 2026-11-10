import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScSlider } from '@semantic-components/ui';

/** A slider, named by aria-label (no label beside it). */
@Component({
  selector: 'app-slider-usage-demo',
  imports: [ScSlider],
  template: `
    <input scSlider [(value)]="volume" aria-label="Volume" class="max-w-xs" />
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SliderUsageDemo {
  protected readonly volume = signal(75);
}
