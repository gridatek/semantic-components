import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ScRangeSlider } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-temperature-range-slider-demo',
  imports: [ScRangeSlider],
  template: `
    <div class="w-[60%]">
      <div class="flex justify-between text-sm mb-2">
        <span>Temperature Range</span>
        <span>{{ minTemp() }}°C - {{ maxTemp() }}°C</span>
      </div>
      <div
        sc-range-slider
        [(minValue)]="minTemp"
        [(maxValue)]="maxTemp"
        [min]="16"
        [max]="30"
        [step]="1"
        [min-aria-label]="'Minimum temperature'"
        [max-aria-label]="'Maximum temperature'"
      ></div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemperatureRangeSliderDemo {
  readonly minTemp = signal(18);
  readonly maxTemp = signal(26);
}
