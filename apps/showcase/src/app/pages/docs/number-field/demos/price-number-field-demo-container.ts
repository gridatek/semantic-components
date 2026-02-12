import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { PriceNumberFieldDemo } from './price-number-field-demo';

@Component({
  selector: 'app-price-number-field-demo-container',
  imports: [DemoContainer, PriceNumberFieldDemo],
  template: `
    <app-demo-container
      title="Price Input"
      demoUrl="/demos/number-field/price-number-field-demo"
      [code]="code"
    >
      <app-price-number-field-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PriceNumberFieldDemoContainer {
  readonly code = `import {
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
import { ScLabel } from '@semantic-components/ui-lab';

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
  template: \`
    <div
      sc-number-field
      [(value)]="price"
      [step]="0.01"
      [min]="0"
      [formatOptions]="formatOptions"
    >
      <div sc-number-field-scrub-area>
        <label sc-label>Price ($)</label>
      </div>

      <div sc-number-field-group>
        <button sc-number-field-decrement></button>
        <input sc-number-field-input />
        <button sc-number-field-increment></button>
      </div>
    </div>

    <p class="mt-4 text-sm text-muted-foreground">
      Current price: {{ '$' + (price() ?? 0).toFixed(2) }}
    </p>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PriceNumberFieldDemo {
  readonly price = signal<number | null>(29.99);
  readonly formatOptions: Intl.NumberFormatOptions = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };
}`;
}
