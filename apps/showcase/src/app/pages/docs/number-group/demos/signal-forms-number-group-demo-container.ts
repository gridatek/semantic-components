import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SignalFormsNumberGroupDemo } from './signal-forms-number-group-demo';

@Component({
  selector: 'app-signal-forms-number-group-demo-container',
  imports: [DemoContainer, SignalFormsNumberGroupDemo],
  template: `
    <app-demo-container
      title="Signal Forms"
      demoUrl="/demos/number-group/signal-forms-number-group-demo"
      [code]="code"
    >
      <app-signal-forms-number-group-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export default class SignalFormsNumberGroupDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, computed, signal } from '@angular/core';
import { FormField, form, max, min, required } from '@angular/forms/signals';
import {
  ScButton,
  ScFieldErrors,
  ScFrame,
  ScLabel,
  ScField,
  ScNumberDecrement,
  ScNumberGroup,
  ScNumberIncrement,
  ScNumberInput,
  ScNumberScrubArea,
} from '@semantic-components/ui';
import { SiMinusIcon, SiPlusIcon } from '@semantic-icons/lucide-icons';

/**
 * \`[formField]\` on the number: min, max and required come from the schema,
 * their messages show in \`scFieldErrors\`. Ordering an invalid quantity
 * focuses its input.
 */
@Component({
  selector: 'app-signal-forms-number-group-demo',
  imports: [
    ScFrame,
    FormField,
    ScButton,
    ScFieldErrors,
    ScLabel,
    ScField,
    ScNumberScrubArea,
    ScNumberGroup,
    ScNumberDecrement,
    ScNumberInput,
    ScNumberIncrement,
    SiMinusIcon,
    SiPlusIcon,
  ],
  template: \`
    <form class="w-56 space-y-4" novalidate (submit)="placeOrder($event)">
      <div scField>
        <div scNumberScrubArea>
          <label scLabel>Quantity</label>
        </div>
        <div scNumberGroup [formField]="orderForm.quantity">
          <button type="button" scNumberDecrement>
            <svg siMinusIcon></svg>
            <span class="sr-only">Decrease quantity</span>
          </button>
          <input scNumberInput />
          <button type="button" scNumberIncrement>
            <svg siPlusIcon></svg>
            <span class="sr-only">Increase quantity</span>
          </button>
        </div>
        <p scFieldErrors></p>
      </div>

      <button scButton type="submit">Order</button>

      <pre scFrame class="bg-muted p-4 text-xs">{{ state() }}</pre>
    </form>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SignalFormsNumberGroupDemo {
  private readonly order = signal<{ quantity: number | null }>({
    quantity: 10,
  });
  private readonly ordered = signal<number | null>(null);

  private readonly orderForm = form(this.order, (path) => {
    required(path.quantity, { message: 'Enter a quantity.' });
    min(path.quantity, 1, { message: 'At least 1.' });
    max(path.quantity, 100, { message: 'At most 100.' });
  });

  private readonly state = computed(() =>
    JSON.stringify(
      {
        value: this.order().quantity,
        valid: this.orderForm.quantity().valid(),
        touched: this.orderForm.quantity().touched(),
        ordered: this.ordered(),
      },
      null,
      2,
    ),
  );

  private placeOrder(event: Event): void {
    event.preventDefault();
    const quantity = this.orderForm.quantity();
    if (quantity.invalid()) {
      quantity.markAsTouched();
      quantity.focusBoundControl();
      return;
    }
    this.ordered.set(quantity.value());
  }
}`;
}
