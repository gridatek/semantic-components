import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { FormField, form, max, min, required } from '@angular/forms/signals';
import { ScLabel } from '@semantic-components/ui';
import {
  ScNumberField,
  ScNumberFieldDecrement,
  ScNumberFieldIncrement,
  ScNumberFieldInput,
  ScNumberFieldInputGroup,
  ScNumberFieldScrubArea,
} from '@semantic-components/ui-lab';

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
  template: `
    <div class="max-w-sm space-y-4">
      <div scNumberField [min]="0" [max]="100" class="space-y-2">
        <div scNumberFieldScrubArea>
          <label
            scLabel
            [class.text-destructive]="
              quantityForm.quantity().invalid() &&
              quantityForm.quantity().touched()
            "
          >
            Quantity
          </label>
        </div>

        <div scNumberFieldGroup>
          <button scNumberFieldDecrement></button>
          <input
            scNumberFieldInput
            aria-label="Quantity"
            [formField]="quantityForm.quantity"
            [class.border-destructive]="
              quantityForm.quantity().invalid() &&
              quantityForm.quantity().touched()
            "
          />
          <button scNumberFieldIncrement></button>
        </div>
        @if (
          quantityForm.quantity().invalid() && quantityForm.quantity().touched()
        ) {
          <p class="text-destructive text-sm font-medium" role="alert">
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

      <div class="bg-muted/50 rounded-lg border p-4">
        <p class="text-sm font-medium">Form State:</p>
        <pre class="text-muted-foreground mt-2 text-xs">{{ formState() }}</pre>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
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
}
