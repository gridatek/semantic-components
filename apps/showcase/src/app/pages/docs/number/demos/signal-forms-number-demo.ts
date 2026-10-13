import { Component, ViewEncapsulation, computed, signal } from '@angular/core';
import { FormField, form, max, min, required } from '@angular/forms/signals';
import {
  ScField,
  ScLabel,
  ScNumber,
  ScNumberDecrement,
  ScNumberGroup,
  ScNumberIncrement,
  ScNumberInput,
  ScNumberScrubArea,
} from '@semantic-components/ui';
import { SiMinusIcon, SiPlusIcon } from '@semantic-icons/lucide-icons';

/** `[formField]` on the number: min, max and required come from the schema. */
@Component({
  selector: 'app-signal-forms-number-demo',
  imports: [
    FormField,
    ScField,
    ScLabel,
    ScNumber,
    ScNumberScrubArea,
    ScNumberGroup,
    ScNumberDecrement,
    ScNumberInput,
    ScNumberIncrement,
    SiMinusIcon,
    SiPlusIcon,
  ],
  template: `
    <div class="w-56 space-y-4">
      <div scField scNumber [formField]="orderForm.quantity">
        <div scNumberScrubArea>
          <label scLabel>Quantity</label>
        </div>
        <div scNumberGroup>
          <button scNumberDecrement>
            <svg siMinusIcon></svg>
            <span class="sr-only">Decrease quantity</span>
          </button>
          <input scNumberInput />
          <button scNumberIncrement>
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
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SignalFormsNumberDemo {
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
}
