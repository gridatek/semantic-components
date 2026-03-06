import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { ScField, ScLabel, ScSlider } from '@semantic-components/ui';

@Component({
  selector: 'app-custom-color-slider-demo',
  imports: [ScSlider, ScField, ScLabel],
  template: `
    <div
      scField
      class="w-[280px]"
      style="--primary: oklch(0.6 0.25 30); --muted: oklch(0.9 0.05 30); --ring: oklch(0.6 0.25 30)"
    >
      <label scLabel>Temperature — {{ value() }}</label>
      <input scSlider [value]="value()" (input)="onInput($event)" />
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomColorSliderDemo {
  readonly value = signal(50);

  onInput(event: Event): void {
    this.value.set(+(event.target as HTMLInputElement).value);
  }
}
