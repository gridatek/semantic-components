import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { ScLabel } from '@semantic-components/ui';
import {
  ScNumberField,
  ScNumberFieldDecrement,
  ScNumberFieldIncrement,
  ScNumberFieldInput,
  ScNumberFieldInputGroup,
  ScNumberFieldScrubArea,
} from '@semantic-components/ui-lab';
import { SiMinusIcon, SiPlusIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-price-number-field-demo',
  imports: [
    ScNumberField,
    ScNumberFieldScrubArea,
    ScNumberFieldInputGroup,
    ScNumberFieldDecrement,
    ScNumberFieldInput,
    ScNumberFieldIncrement,
    ScLabel,
    SiMinusIcon,
    SiPlusIcon,
  ],
  template: `
    <div
      scNumberField
      [(value)]="price"
      [step]="0.01"
      [min]="0"
      [formatOptions]="formatOptions"
    >
      <div scNumberFieldScrubArea>
        <label scLabel>Price ($)</label>
      </div>

      <div scNumberFieldGroup>
        <button scNumberFieldDecrement><svg siMinusIcon></svg></button>
        <input scNumberFieldInput aria-label="Price" />
        <button scNumberFieldIncrement><svg siPlusIcon></svg></button>
      </div>
    </div>

    <p class="text-muted-foreground mt-4 text-sm">
      Current price: {{ '$' + (price() ?? 0).toFixed(2) }}
    </p>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PriceNumberFieldDemo {
  readonly price = signal<number | null>(29.99);
  readonly formatOptions: Intl.NumberFormatOptions = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };
}
