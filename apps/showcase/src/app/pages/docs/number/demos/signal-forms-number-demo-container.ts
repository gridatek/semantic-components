import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SignalFormsNumberDemo } from './signal-forms-number-demo';

@Component({
  selector: 'app-signal-forms-number-demo-container',
  imports: [DemoContainer, SignalFormsNumberDemo],
  template: `
    <app-demo-container
      title="Signal Forms"
      demoUrl="/demos/number/signal-forms-number-demo"
      [code]="code"
    >
      <app-signal-forms-number-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export default class SignalFormsNumberDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form, max, min, required } from '@angular/forms/signals';
import {
  ScButtonGroup,
  ScLabel,
  ScNumber,
  ScNumberDecrement,
  ScNumberIncrement,
  ScNumberInput,
  ScNumberScrubArea,
} from '@semantic-components/ui';
import { SiMinusIcon, SiPlusIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-signal-forms-number-demo',
  imports: [
    FormField,
    ScNumber,
    ScNumberScrubArea,
    ScButtonGroup,
    ScNumberDecrement,
    ScNumberInput,
    ScNumberIncrement,
    ScLabel,
    SiMinusIcon,
    SiPlusIcon,
  ],
  template: \`
    <div class="max-w-sm space-y-4">
      <div scNumber [min]="0" [max]="100" class="space-y-2">
        <div scNumberScrubArea>
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

        <div scButtonGroup>
          <button scNumberDecrement>
            <svg siMinusIcon></svg>
            <span class="sr-only">Decrease</span>
          </button>
          <input
            scNumberInput
            aria-label="Quantity"
            [formField]="quantityForm.quantity"
            [class.border-destructive]="
              quantityForm.quantity().invalid() &&
              quantityForm.quantity().touched()
            "
          />
          <button scNumberIncrement>
            <svg siPlusIcon></svg>
            <span class="sr-only">Increase</span>
          </button>
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
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SignalFormsNumberDemo {
  private readonly formModel = signal<{ quantity: number | null }>({
    quantity: 10,
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
