import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { ScField, ScLabel, ScSlider } from '@semantic-components/ui';

@Component({
  selector: 'app-basic-slider-demo',
  imports: [ScSlider, ScField, ScLabel],
  template: `
    <div scField class="w-[280px]">
      <label scLabel>Volume — {{ value() }}</label>
      <input scSlider [(value)]="value" />
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicSliderDemo {
  readonly value = signal(50);
}
