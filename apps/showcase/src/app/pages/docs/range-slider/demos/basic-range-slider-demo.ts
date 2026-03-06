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
      <div
        scRangeSlider
        [(minValue)]="minValue"
        [(maxValue)]="maxValue"
        [min]="0"
        [max]="1000"
        [step]="10"
      >
        <input scRangeSliderMin aria-label="Minimum price" />
        <input scRangeSliderMax aria-label="Maximum price" />
      </div>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicRangeSliderDemo {
  minValue = 200;
  maxValue = 800;
}
