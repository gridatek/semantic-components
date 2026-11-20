import { JsonPipe } from '@angular/common';
import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  FormField,
  applyEach,
  form,
  max,
  min,
  validate,
} from '@angular/forms/signals';
import {
  ScField,
  ScFieldErrors,
  ScFrame,
  ScLabel,
  ScRangeSlider,
  ScRangeSliderThumb,
} from '@semantic-components/ui';

/** One Signal Forms field, the pair: its bounds in the schema (each value 0–1000), a rule on it (100 apart at least), its error once touched. */
@Component({
  selector: 'app-form-range-slider-demo',
  imports: [
    FormField,
    JsonPipe,
    ScField,
    ScFieldErrors,
    ScFrame,
    ScLabel,
    ScRangeSlider,
    ScRangeSliderThumb,
  ],
  template: `
    <div class="flex w-full max-w-xs flex-col gap-4">
      <div scField>
        <label scLabel>Budget</label>
        <div scRangeSlider [formField]="budgetForm.budget" [step]="50">
          <input scRangeSliderThumb aria-label="Lowest budget" />
          <input scRangeSliderThumb aria-label="Highest budget" />
        </div>
        <div scFieldErrors></div>
      </div>
      <pre scFrame class="bg-muted p-4 text-xs">{{ model() | json }}</pre>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class FormRangeSliderDemo {
  private readonly model = signal<{ budget: readonly [number, number] }>({
    budget: [400, 450],
  });
  private readonly budgetForm = form(this.model, (path) => {
    // The bounds: each value from 0 to 1000 — the slider's ends.
    applyEach(path.budget, (value) => {
      min(value, 0);
      max(value, 1000);
    });
    validate(path.budget, ({ value }) =>
      value()[1] - value()[0] >= 100
        ? null
        : { kind: 'narrow', message: 'Leave 100 at least between them.' },
    );
  });
}
