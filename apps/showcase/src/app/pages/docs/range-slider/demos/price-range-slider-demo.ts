import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ScRangeSlider } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-price-range-slider-demo',
  imports: [ScRangeSlider],
  template: `
    <div class="w-[60%]">
      <div class="flex justify-between text-sm mb-2">
        <span>Price Range</span>
        <span>{{ '$' + minPrice() + ' - $' + maxPrice() }}</span>
      </div>
      <div
        sc-range-slider
        [(minValue)]="minPrice"
        [(maxValue)]="maxPrice"
        [min]="0"
        [max]="1000"
        [step]="10"
        [min-aria-label]="'Minimum price'"
        [max-aria-label]="'Maximum price'"
      ></div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PriceRangeSliderDemo {
  readonly minPrice = signal(200);
  readonly maxPrice = signal(800);
}
