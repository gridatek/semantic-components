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
  selector: 'app-basic-range-slider-demo',
  imports: [ScRangeSlider, ScRangeSliderMin, ScRangeSliderMax, ScLabel],
  template: `
    <div class="w-[280px] space-y-4">
      <label scLabel>
        Price range: {{ '$' + minValue }} &ndash; {{ '$' + maxValue }}
      </label>
      <div scRangeSlider [step]="10">
        <input
          scRangeSliderMin
          [min]="0"
          [max]="1000"
          [(value)]="minValue"
          aria-label="Minimum price"
        />
        <input
          scRangeSliderMax
          [min]="0"
          [max]="1000"
          [(value)]="maxValue"
          aria-label="Maximum price"
        />
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicRangeSliderDemo {
  minValue = 200;
  maxValue = 800;
}
