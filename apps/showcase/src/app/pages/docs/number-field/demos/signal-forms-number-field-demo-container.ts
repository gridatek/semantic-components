import { Component, ViewEncapsulation } from '@angular/core';
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
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export default class SignalFormsNumberFieldDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, computed, signal } from '@angular/core';
import { FormField, form, max, min, required } from '@angular/forms/signals';
import {
  ScLabel,
  ScNumberField,
  ScNumberFieldDecrement,
  ScNumberFieldGroup,
  ScNumberFieldIncrement,
  ScNumberFieldInput,
  ScNumberFieldScrubArea,
} from '@semantic-components/ui';
import { SiMinusIcon, SiPlusIcon } from '@semantic-icons/lucide-icons';

/** \`[formField]\` on the number: min, max and required come from the schema. */
@Component({
  selector: 'app-signal-forms-number-field-demo',
  imports: [
    FormField,
    ScLabel,
    ScNumberField,
    ScNumberFieldScrubArea,
    ScNumberFieldGroup,
    ScNumberFieldDecrement,
    ScNumberFieldInput,
    ScNumberFieldIncrement,
    SiMinusIcon,
    SiPlusIcon,
  ],
  template: \`
    <div class="w-56 space-y-4">
      <div scNumberField [formField]="orderForm.quantity">
        <div scNumberFieldScrubArea>
          <label scLabel>Quantity</label>
        </div>
        <div scNumberFieldGroup>
          <button scNumberFieldDecrement>
            <svg siMinusIcon></svg>
            <span class="sr-only">Decrease quantity</span>
          </button>
          <input scNumberFieldInput />
          <button scNumberFieldIncrement>
            <svg siPlusIcon></svg>
            <span class="sr-only">Increase quantity</span>
          </button>
        </div>
        @if (showErrors()) {
          <p class="text-destructive text-sm" role="alert">
            @switch (orderForm.quantity().errors()[0]?.kind) {
              @case ('required') {
                Enter a quantity.
              }
              @case ('min') {
                At least 1.
              }
              @case ('max') {
                At most 100.
              }
            }
          </p>
        }
      </div>

      <pre class="bg-muted rounded-md p-4 text-xs">{{ state() }}</pre>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SignalFormsNumberFieldDemo {
  private readonly order = signal<{ quantity: number | null }>({
    quantity: 10,
  });

  readonly orderForm = form(this.order, (path) => {
    required(path.quantity);
    min(path.quantity, 1);
    max(path.quantity, 100);
  });

  protected readonly showErrors = computed(
    () =>
      this.orderForm.quantity().invalid() &&
      this.orderForm.quantity().touched(),
  );

  protected readonly state = computed(() =>
    JSON.stringify(
      {
        value: this.order().quantity,
        valid: this.orderForm.quantity().valid(),
        touched: this.orderForm.quantity().touched(),
      },
      null,
      2,
    ),
  );
}`;
}
