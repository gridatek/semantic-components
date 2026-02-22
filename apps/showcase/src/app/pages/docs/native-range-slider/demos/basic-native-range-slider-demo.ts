import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScNativeRangeSlider } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-basic-native-range-slider-demo',
  imports: [ScNativeRangeSlider],
  template: `
    <div class="w-[280px] space-y-2">
      <label class="text-sm font-medium">
        Price range: {{ '$' + minValue }} &ndash; {{ '$' + maxValue }}
      </label>
      <sc-native-range-slider
        [(minValue)]="minValue"
        [(maxValue)]="maxValue"
        [min]="0"
        [max]="1000"
        [step]="10"
        min-aria-label="Minimum price"
        max-aria-label="Maximum price"
      />
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicNativeRangeSliderDemo {
  minValue = 200;
  maxValue = 800;
}
