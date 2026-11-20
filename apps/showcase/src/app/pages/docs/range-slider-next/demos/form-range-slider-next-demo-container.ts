import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { FormRangeSliderNextDemo } from './form-range-slider-next-demo';

@Component({
  selector: 'app-form-range-slider-next-demo-container',
  imports: [DemoContainer, FormRangeSliderNextDemo],
  template: `
    <app-demo-container
      title="Form"
      demoUrl="/demos/range-slider-next/form-range-slider-next-demo"
      [code]="code"
    >
      <app-form-range-slider-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class FormRangeSliderNextDemoContainer {
  private readonly code = `import { JsonPipe } from '@angular/common';
import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form, validate } from '@angular/forms/signals';
import {
  ScField,
  ScFieldErrors,
  ScFrame,
  ScLabel,
  ScRangeSliderNext,
  ScRangeSliderNextThumb,
} from '@semantic-components/ui';

/** One Signal Forms field, the pair: a rule on it (100 apart at least), its error once touched. */
@Component({
  selector: 'app-form-range-slider-next-demo',
  imports: [FormField, JsonPipe, ScField, ScFieldErrors, ScFrame, ScLabel, ScRangeSliderNext, ScRangeSliderNextThumb],
  template: \`
    <div class="flex w-full max-w-xs flex-col gap-4">
      <div scField>
        <label scLabel>Budget</label>
        <div
          scRangeSliderNext
          [formField]="budgetForm.budget"
          [maxValue]="1000"
          [step]="50"
        >
          <input scRangeSliderNextThumb aria-label="Lowest budget" />
          <input scRangeSliderNextThumb aria-label="Highest budget" />
        </div>
        <div scFieldErrors></div>
      </div>
      <pre scFrame class="bg-muted p-4 text-xs">{{ model() | json }}</pre>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class FormRangeSliderNextDemo {
  private readonly model = signal<{ budget: readonly [number, number] }>({
    budget: [400, 450],
  });
  private readonly budgetForm = form(this.model, (path) =>
    validate(path.budget, ({ value }) =>
      value()[1] - value()[0] >= 100
        ? null
        : { kind: 'narrow', message: 'Leave 100 at least between them.' },
    ),
  );
}`;
}
