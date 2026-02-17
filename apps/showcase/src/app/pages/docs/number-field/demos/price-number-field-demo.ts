import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScNumberField,
  ScNumberFieldDecrement,
  ScNumberFieldInputGroup,
  ScNumberFieldIncrement,
  ScNumberFieldInput,
  ScNumberFieldScrubArea,
} from '@semantic-components/ui-lab';
import { ScLabel } from '@semantic-components/ui';

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
        <button scNumberFieldDecrement></button>
        <input scNumberFieldInput />
        <button scNumberFieldIncrement></button>
      </div>
    </div>

    <p class="mt-4 text-sm text-muted-foreground">
      Current price: {{ '$' + (price() ?? 0).toFixed(2) }}
    </p>
  `,
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
