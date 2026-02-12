import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScSlider } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-disabled-slider-demo',
  imports: [ScSlider],
  template: `
    <div class="w-[60%]">
      <div sc-slider [value]="50" [disabled]="true"></div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledSliderDemo {}
