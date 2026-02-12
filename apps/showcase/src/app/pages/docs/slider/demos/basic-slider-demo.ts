import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ScSlider } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-basic-slider-demo',
  imports: [ScSlider],
  template: `
    <div class="w-[60%]">
      <div sc-slider [(value)]="basicValue"></div>
      <p class="mt-2 text-sm text-muted-foreground">
        Value: {{ basicValue() }}
      </p>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicSliderDemo {
  readonly basicValue = signal(33);
}
