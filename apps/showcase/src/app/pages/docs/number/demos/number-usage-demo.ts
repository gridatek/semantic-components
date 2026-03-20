import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import {
  ScLabel,
  ScNumber,
  ScNumberDecrement,
  ScNumberIncrement,
  ScNumberInput,
  ScNumberInputGroup,
  ScNumberScrubArea,
} from '@semantic-components/ui';

@Component({
  selector: 'app-number-usage-demo',
  imports: [
    ScNumber,
    ScNumberScrubArea,
    ScNumberInputGroup,
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

      <div scNumberGroup>
        <button scNumberDecrement></button>
        <input scNumberInput aria-label="Quantity" />
        <button scNumberIncrement></button>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NumberUsageDemo {
  readonly quantity = signal<number | null>(5);
}
