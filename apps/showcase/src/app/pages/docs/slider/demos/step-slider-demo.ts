import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ScSlider } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-step-slider-demo',
  imports: [ScSlider],
  template: `
    <div class="w-[60%]">
      <div sc-slider [(value)]="stepValue" [step]="10"></div>
      <p class="mt-2 text-sm text-muted-foreground">Value: {{ stepValue() }}</p>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepSliderDemo {
  readonly stepValue = signal(50);
}
