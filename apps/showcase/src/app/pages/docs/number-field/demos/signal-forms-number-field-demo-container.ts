import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SignalFormsNumberFieldDemo } from './signal-forms-number-field-demo';

@Component({
  selector: 'app-signal-forms-number-field-demo-container',
  imports: [DemoContainer, SignalFormsNumberFieldDemo],
  template: `
    <app-demo-container
      title="Signal Forms"
      demoUrl="/demos/number-field/signal-forms-number-field-demo"
      [code]="code"
    >
      <app-signal-forms-number-field-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SignalFormsNumberFieldDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { FormField, form, required, min, max } from '@angular/forms/signals';
import {
  ScNumberField,
  ScNumberFieldDecrement,
  ScNumberFieldInputGroup,
  ScNumberFieldIncrement,
  ScNumberFieldInput,
  ScNumberFieldScrubArea,
} from '@semantic-components/ui-lab';
import { ScLabel } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-signal-forms-number-field-demo',
  imports: [
    FormField,
    ScNumberField,
    ScNumberFieldScrubArea,
    ScNumberFieldInputGroup,
    ScNumberFieldDecrement,
    ScNumberFieldInput,
    ScNumberFieldIncrement,
    ScLabel,
  ],
  template: \`
    <div class="max-w-sm space-y-4">
      <div sc-number-field [min]="0" [max]="100" class="space-y-2">
        <div sc-number-field-scrub-area>
          <label
            sc-label
            [class.text-destructive]="
              quantityForm.quantity().invalid() &&
              quantityForm.quantity().touched()
            "
          >
            Quantity
          </label>
        </div>

        <div sc-number-field-group>
          <button sc-number-field-decrement></button>
          <input
            sc-number-field-input
            [formField]="quantityForm.quantity"
            [class.border-destructive]="
              quantityForm.quantity().invalid() &&
              quantityForm.quantity().touched()
            "
          />
          <button sc-number-field-increment></button>
        </div>
        @if (
          quantityForm.quantity().invalid() && quantityForm.quantity().touched()
        ) {
          <p class="text-sm font-medium text-destructive" role="alert">
            @if (hasError(quantityForm.quantity, 'required')) {
              Quantity is required
            } @else if (hasError(quantityForm.quantity, 'min')) {
              Minimum value is 1
            } @else if (hasError(quantityForm.quantity, 'max')) {
              Maximum value is 100
            }
          </p>
        }
      </div>

      <div class="rounded-lg border bg-muted/50 p-4">
        <p class="text-sm font-medium">Form State:</p>
        <pre class="mt-2 text-xs text-muted-foreground">{{ formState() }}</pre>
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignalFormsNumberFieldDemo {
  private readonly formModel = signal({
    quantity: '10',
  });

  readonly quantityForm = form(this.formModel, (path) => {
    required(path.quantity);
    min(path.quantity, 1);
    max(path.quantity, 100);
  });

  formState(): string {
    return JSON.stringify(
      {
        value: this.formModel(),
        valid: this.quantityForm.quantity().valid(),
        invalid: this.quantityForm.quantity().invalid(),
        touched: this.quantityForm.quantity().touched(),
      },
      null,
      2,
    );
  }

  hasError(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    field: any,
    errorKey: string,
  ): boolean {
    const errors = field().errors();
    if (!errors || !Array.isArray(errors)) return false;
    return errors.some(
      (e: { rule?: string; name?: string }) =>
        e.rule === errorKey || e.name === errorKey,
    );
  }
}`;
}
