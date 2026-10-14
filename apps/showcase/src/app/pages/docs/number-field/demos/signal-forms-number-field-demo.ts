import { Component, ViewEncapsulation, computed, signal } from '@angular/core';
import { FormField, form, max, min, required } from '@angular/forms/signals';
import {
  ScButton,
  ScFieldErrors,
  ScLabel,
  ScNumberField,
  ScNumberFieldDecrement,
  ScNumberFieldGroup,
  ScNumberFieldIncrement,
  ScNumberFieldInput,
  ScNumberFieldScrubArea,
} from '@semantic-components/ui';
import { SiMinusIcon, SiPlusIcon } from '@semantic-icons/lucide-icons';

/**
 * `[formField]` on the number: min, max and required come from the schema,
 * their messages show in `scFieldErrors`. Ordering an invalid quantity
 * focuses its input.
 */
@Component({
  selector: 'app-signal-forms-number-field-demo',
  imports: [
    FormField,
    ScButton,
    ScFieldErrors,
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
  template: `
    <form class="w-56 space-y-4" novalidate (submit)="placeOrder($event)">
      <div scNumberField [formField]="orderForm.quantity">
        <div scNumberFieldScrubArea>
          <label scLabel>Quantity</label>
        </div>
        <div scNumberFieldGroup>
          <button type="button" scNumberFieldDecrement>
            <svg siMinusIcon></svg>
            <span class="sr-only">Decrease quantity</span>
          </button>
          <input scNumberFieldInput />
          <button type="button" scNumberFieldIncrement>
            <svg siPlusIcon></svg>
            <span class="sr-only">Increase quantity</span>
          </button>
        </div>
        <p scFieldErrors></p>
      </div>

      <button scButton type="submit">Order</button>

      <pre class="bg-muted rounded-md p-4 text-xs">{{ state() }}</pre>
    </form>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SignalFormsNumberFieldDemo {
  private readonly order = signal<{ quantity: number | null }>({
    quantity: 10,
  });
  private readonly ordered = signal<number | null>(null);

  readonly orderForm = form(this.order, (path) => {
    required(path.quantity, { message: 'Enter a quantity.' });
    min(path.quantity, 1, { message: 'At least 1.' });
    max(path.quantity, 100, { message: 'At most 100.' });
  });

  protected readonly state = computed(() =>
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

  protected placeOrder(event: Event): void {
    event.preventDefault();
    const quantity = this.orderForm.quantity();
    if (quantity.invalid()) {
      quantity.markAsTouched();
      quantity.focusBoundControl();
      return;
    }
    this.ordered.set(quantity.value());
  }
}
