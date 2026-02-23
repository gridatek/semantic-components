import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScRangeSlider,
  ScRangeSliderMaxThumb,
  ScRangeSliderMinThumb,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-basic-range-slider-demo',
  imports: [ScRangeSlider, ScRangeSliderMinThumb, ScRangeSliderMaxThumb],
  template: `
    <div class="w-[280px] space-y-4">
      <label class="text-sm font-medium">
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
        <input scRangeSliderMinThumb aria-label="Minimum price" />
        <input scRangeSliderMaxThumb aria-label="Maximum price" />
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicRangeSliderDemo {
  minValue = 200;
  maxValue = 800;
}
