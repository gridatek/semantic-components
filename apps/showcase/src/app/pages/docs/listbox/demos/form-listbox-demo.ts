import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  FormField,
  FormRoot,
  form,
  maxLength,
  minLength,
} from '@angular/forms/signals';
import {
  ScButton,
  ScField,
  ScFieldDescription,
  ScFieldErrors,
  ScLabel,
  ScListboxItem,
  ScListboxItemIndicator,
  ScListboxMultiple,
} from '@semantic-components/ui';
import { SiCheckIcon } from '@semantic-icons/lucide-icons';

/** A [formField]: at least one topping, three at most, from the schema (an empty array is not empty to required(): minLength). */
@Component({
  selector: 'app-form-listbox-demo',
  imports: [
    FormField,
    FormRoot,
    ScButton,
    ScField,
    ScFieldDescription,
    ScFieldErrors,
    ScLabel,
    ScListboxItem,
    ScListboxItemIndicator,
    ScListboxMultiple,
    SiCheckIcon,
  ],
  template: `
    <form [formRoot]="orderForm" class="grid w-56 gap-3">
      <div scField>
        <label scLabel>Toppings</label>
        <div scListbox multiple [formField]="orderForm.toppings">
          @for (item of items; track item.value) {
            <div scListboxItem [value]="item.value">
              {{ item.label }}
              <span scListboxItemIndicator><svg siCheckIcon></svg></span>
            </div>
          }
        </div>
        <p scFieldDescription>One to three.</p>
        <div scFieldErrors></div>
      </div>
      <button scButton type="submit" class="justify-self-start">Order</button>
      @if (ordered()) {
        <p class="text-sm" role="status">{{ ordered() }}</p>
      }
    </form>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class FormListboxDemo {
  private readonly model = signal<{ toppings: string[] }>({ toppings: [] });
  private readonly ordered = signal('');
  private readonly orderForm = form(
    this.model,
    (s) => {
      minLength(s.toppings, 1, { message: 'Choose a topping.' });
      maxLength(s.toppings, 3, { message: 'Three at most.' });
    },
    {
      submission: {
        action: async () =>
          this.ordered.set(`Ordered: ${this.model().toppings.join(', ')}.`),
      },
    },
  );
  private readonly items = [
    { value: 'cheese', label: 'Cheese' },
    { value: 'basil', label: 'Basil' },
    { value: 'onion', label: 'Onion' },
    { value: 'mushroom', label: 'Mushroom' },
    { value: 'olive', label: 'Olive' },
  ];
}
