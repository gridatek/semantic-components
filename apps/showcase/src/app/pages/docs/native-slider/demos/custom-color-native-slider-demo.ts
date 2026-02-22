import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ScField, ScLabel } from '@semantic-components/ui';
import { ScNativeSlider } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-custom-color-native-slider-demo',
  imports: [ScNativeSlider, ScField, ScLabel],
  template: `
    <div
      scField
      class="w-[280px]"
      style="--primary: oklch(0.6 0.25 30); --muted: oklch(0.9 0.05 30); --ring: oklch(0.6 0.25 30)"
    >
      <label scLabel>Temperature — {{ value() }}</label>
      <input scNativeSlider [value]="value()" (input)="onInput($event)" />
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomColorNativeSliderDemo {
  readonly value = signal(50);

  onInput(event: Event): void {
    this.value.set(+(event.target as HTMLInputElement).value);
  }
}
