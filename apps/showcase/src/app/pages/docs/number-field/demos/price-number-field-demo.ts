import { Component, ViewEncapsulation, signal } from '@angular/core';
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

/** In euros, written the German way: type "1.234,5" — or "1234.5" — and leave the field. */
@Component({
  selector: 'app-price-number-field-demo',
  imports: [
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
    <div class="w-56 space-y-4">
      <div
        scNumberField
        locale="de-DE"
        [(value)]="price"
        [min]="0"
        [step]="0.5"
        [largeStep]="10"
        [format]="{ style: 'currency', currency: 'EUR' }"
      >
        <div scNumberFieldScrubArea>
          <label scLabel>Preis</label>
        </div>
        <div scNumberFieldGroup>
          <button scNumberFieldDecrement>
            <svg siMinusIcon></svg>
            <span class="sr-only">Decrease price</span>
          </button>
          <input scNumberFieldInput />
          <button scNumberFieldIncrement>
            <svg siPlusIcon></svg>
            <span class="sr-only">Increase price</span>
          </button>
        </div>
      </div>
      <p class="bg-muted rounded-md p-4 text-sm">
        Value: {{ price() ?? 'none' }}
      </p>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class PriceNumberFieldDemo {
  readonly price = signal<number | null>(1234.5);
}
