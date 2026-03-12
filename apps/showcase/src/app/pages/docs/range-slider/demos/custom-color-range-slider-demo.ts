import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScLabel,
  ScRangeSlider,
  ScRangeSliderMax,
  ScRangeSliderMin,
} from '@semantic-components/ui';

@Component({
  selector: 'app-custom-color-range-slider-demo',
  imports: [ScRangeSlider, ScRangeSliderMin, ScRangeSliderMax, ScLabel],
  template: `
    <div class="w-[280px] space-y-4">
      <label scLabel>
        Temperature: {{ minValue }}&deg;C &ndash; {{ maxValue }}&deg;C
      </label>
      <div
        scRangeSlider
        style="--primary: oklch(0.6 0.25 30); --muted: oklch(0.9 0.05 30); --ring: oklch(0.6 0.25 30)"
        [min]="0"
        [max]="50"
        [step]="1"
      >
        <input
          scRangeSliderMin
          [(value)]="minValue"
          aria-label="Minimum temperature"
        />
        <input
          scRangeSliderMax
          [(value)]="maxValue"
          aria-label="Maximum temperature"
        />
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomColorRangeSliderDemo {
  minValue = 15;
  maxValue = 35;
}
