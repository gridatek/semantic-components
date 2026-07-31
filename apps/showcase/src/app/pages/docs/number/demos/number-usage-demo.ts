import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScButtonGroup,
  ScLabel,
  ScNumber,
  ScNumberDecrement,
  ScNumberIncrement,
  ScNumberInput,
  ScNumberScrubArea,
} from '@semantic-components/ui';

@Component({
  selector: 'app-number-usage-demo',
  imports: [
    ScNumber,
    ScNumberScrubArea,
    ScButtonGroup,
    ScNumberDecrement,
    ScNumberInput,
    ScNumberIncrement,
    ScLabel,
  ],
  template: `
    <div scNumber [(value)]="quantity" [min]="1" [max]="10">
      <div scNumberScrubArea>
        <label scLabel>Quantity</label>
      </div>

      <div scButtonGroup>
        <button scNumberDecrement></button>
        <input scNumberInput aria-label="Quantity" />
        <button scNumberIncrement></button>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class NumberUsageDemo {
  readonly quantity = signal<number | null>(5);
}
