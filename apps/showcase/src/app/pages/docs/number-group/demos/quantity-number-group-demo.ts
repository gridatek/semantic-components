import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScField,
  ScFieldDescription,
  ScLabel,
  ScNumberDecrement,
  ScNumberGroup,
  ScNumberIncrement,
  ScNumberInput,
} from '@semantic-components/ui';
import { SiMinusIcon, SiPlusIcon } from '@semantic-icons/lucide-icons';

/**
 * The APG's quantity spin buttons: each with its bounds (a button at its
 * bound is unavailable), its hint, and its value read out on a button press.
 */
@Component({
  selector: 'app-quantity-number-group-demo',
  imports: [
    ScFieldDescription,
    ScLabel,
    ScField,
    ScNumberGroup,
    ScNumberDecrement,
    ScNumberInput,
    ScNumberIncrement,
    SiMinusIcon,
    SiPlusIcon,
  ],
  template: `
    <div class="flex w-56 flex-col gap-6">
      <div scField>
        <label scLabel>Adults</label>
        <div scNumberGroup [(value)]="adults" [min]="1" [max]="8">
          <button scNumberDecrement>
            <svg siMinusIcon></svg>
            <span class="sr-only">Remove adult</span>
          </button>
          <input scNumberInput />
          <button scNumberIncrement>
            <svg siPlusIcon></svg>
            <span class="sr-only">Add adult</span>
          </button>
        </div>
        <p scFieldDescription>Between 1 and 8.</p>
      </div>

      <div scField>
        <label scLabel>Kids</label>
        <div scNumberGroup [(value)]="kids" [min]="0" [max]="8">
          <button scNumberDecrement>
            <svg siMinusIcon></svg>
            <span class="sr-only">Remove kid</span>
          </button>
          <input scNumberInput />
          <button scNumberIncrement>
            <svg siPlusIcon></svg>
            <span class="sr-only">Add kid</span>
          </button>
        </div>
        <p scFieldDescription>Up to 8.</p>
      </div>

      <div scField>
        <label scLabel>Animals</label>
        <div scNumberGroup [(value)]="animals" [min]="0" [max]="4">
          <button scNumberDecrement>
            <svg siMinusIcon></svg>
            <span class="sr-only">Remove animal</span>
          </button>
          <input scNumberInput />
          <button scNumberIncrement>
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
export class QuantityNumberGroupDemo {
  private readonly adults = signal<number | null>(1);
  private readonly kids = signal<number | null>(0);
  private readonly animals = signal<number | null>(0);
}
