import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScFieldDescription,
  ScLabel,
  ScNumberField,
  ScNumberFieldDecrement,
  ScNumberFieldGroup,
  ScNumberFieldIncrement,
  ScNumberFieldInput,
} from '@semantic-components/ui';
import { SiMinusIcon, SiPlusIcon } from '@semantic-icons/lucide-icons';

/**
 * The APG's quantity spin buttons: each with its bounds (a button at its
 * bound is unavailable), its hint, and its value read out on a button press.
 */
@Component({
  selector: 'app-quantity-number-field-demo',
  imports: [
    ScFieldDescription,
    ScLabel,
    ScNumberField,
    ScNumberFieldGroup,
    ScNumberFieldDecrement,
    ScNumberFieldInput,
    ScNumberFieldIncrement,
    SiMinusIcon,
    SiPlusIcon,
  ],
  template: `
    <div class="flex w-56 flex-col gap-6">
      <div scNumberField [(value)]="adults" [min]="1" [max]="8">
        <label scLabel>Adults</label>
        <div scNumberFieldGroup>
          <button scNumberFieldDecrement>
            <svg siMinusIcon></svg>
            <span class="sr-only">Remove adult</span>
          </button>
          <input scNumberFieldInput />
          <button scNumberFieldIncrement>
            <svg siPlusIcon></svg>
            <span class="sr-only">Add adult</span>
          </button>
        </div>
        <p scFieldDescription>Between 1 and 8.</p>
      </div>

      <div scNumberField [(value)]="kids" [min]="0" [max]="8">
        <label scLabel>Kids</label>
        <div scNumberFieldGroup>
          <button scNumberFieldDecrement>
            <svg siMinusIcon></svg>
            <span class="sr-only">Remove kid</span>
          </button>
          <input scNumberFieldInput />
          <button scNumberFieldIncrement>
            <svg siPlusIcon></svg>
            <span class="sr-only">Add kid</span>
          </button>
        </div>
        <p scFieldDescription>Up to 8.</p>
      </div>

      <div scNumberField [(value)]="animals" [min]="0" [max]="4">
        <label scLabel>Animals</label>
        <div scNumberFieldGroup>
          <button scNumberFieldDecrement>
            <svg siMinusIcon></svg>
            <span class="sr-only">Remove animal</span>
          </button>
          <input scNumberFieldInput />
          <button scNumberFieldIncrement>
            <svg siPlusIcon></svg>
            <span class="sr-only">Add animal</span>
          </button>
        </div>
        <p scFieldDescription>Up to 4.</p>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class QuantityNumberFieldDemo {
  readonly adults = signal<number | null>(1);
  readonly kids = signal<number | null>(0);
  readonly animals = signal<number | null>(0);
}
