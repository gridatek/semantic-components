import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScLabel, ScSlider } from '@semantic-components/ui';

/** Its value shown beside its label: two-way, [(value)]; min, max and step. */
@Component({
  selector: 'app-controlled-slider-demo',
  imports: [ScLabel, ScSlider],
  template: `
    <div class="grid w-full max-w-xs gap-3">
      <div class="flex items-center justify-between gap-2">
        <label scLabel for="slider-temperature">Temperature</label>
        <span class="text-muted-foreground text-sm">{{ temperature() }}</span>
      </div>
      <input
        id="slider-temperature"
        scSlider
        [(value)]="temperature"
        [min]="0"
        [max]="1"
        [step]="0.1"
      />
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ControlledSliderDemo {
  protected readonly temperature = signal(0.3);
}
