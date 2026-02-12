import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ScRangeSlider } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-disabled-range-slider-demo',
  imports: [ScRangeSlider],
  template: `
    <div class="w-[60%]">
      <div
        sc-range-slider
        [(minValue)]="minValue"
        [(maxValue)]="maxValue"
        [disabled]="true"
        [min-aria-label]="'Minimum value'"
        [max-aria-label]="'Maximum value'"
      ></div>
      <p class="mt-2 text-sm text-muted-foreground">
        Range: {{ minValue() }} - {{ maxValue() }}
      </p>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledRangeSliderDemo {
  readonly minValue = signal(40);
  readonly maxValue = signal(60);
}
