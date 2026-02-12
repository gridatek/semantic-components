import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ScSlider } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-range-slider-demo',
  imports: [ScSlider],
  template: `
    <div class="w-[60%]">
      <div sc-slider [(value)]="rangeValue" [min]="0" [max]="50"></div>
      <p class="mt-2 text-sm text-muted-foreground">
        Value: {{ rangeValue() }}
      </p>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RangeSliderDemo {
  readonly rangeValue = signal(25);
}
