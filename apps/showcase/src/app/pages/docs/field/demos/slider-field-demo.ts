import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScField,
  ScFieldDescription,
  ScFieldTitle,
  ScSlider,
} from '@semantic-components/ui';

/** A slider under a title and a description that shows its value. */
@Component({
  selector: 'app-slider-field-demo',
  imports: [ScField, ScFieldDescription, ScFieldTitle, ScSlider],
  template: `
    <div scField class="w-full max-w-xs">
      <div scFieldTitle>Price limit</div>
      <p scFieldDescription>
        Set your budget ($<span class="font-medium tabular-nums">{{
          price()
        }}</span
        >).
      </p>
      <input
        scSlider
        [(value)]="price"
        [max]="1000"
        [step]="10"
        aria-label="Price limit"
        class="mt-2 w-full"
      />
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SliderFieldDemo {
  protected readonly price = signal(500);
}
