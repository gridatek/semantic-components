import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { PriceNumberDemo } from './price-number-demo';

@Component({
  selector: 'app-price-number-demo-container',
  imports: [DemoContainer, PriceNumberDemo],
  template: `
    <app-demo-container
      title="Price Input"
      demoUrl="/demos/number/price-number-demo"
      [code]="code"
    >
      <app-price-number-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PriceNumberDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import {
  ScButtonGroup,
  ScLabel,
  ScNumber,
  ScNumberDecrement,
  ScNumberIncrement,
  ScNumberInput,
  ScNumberScrubArea,
} from '@semantic-components/ui';
import { SiMinusIcon, SiPlusIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-price-number-demo',
  imports: [
    ScNumber,
    ScNumberScrubArea,
    ScButtonGroup,
    ScNumberDecrement,
    ScNumberInput,
    ScNumberIncrement,
    ScLabel,
    SiMinusIcon,
    SiPlusIcon,
  ],
  template: \`
    <div class="space-y-4">
      <div
        scNumber
        [(value)]="price"
        [step]="0.01"
        [min]="0"
        [formatOptions]="formatOptions"
      >
        <div scNumberScrubArea>
          <label scLabel>Price ($)</label>
        </div>

        <div scButtonGroup>
          <button scNumberDecrement>
            <svg siMinusIcon></svg>
            <span class="sr-only">Decrease</span>
          </button>
          <input scNumberInput aria-label="Price" />
          <button scNumberIncrement>
            <svg siPlusIcon></svg>
            <span class="sr-only">Increase</span>
          </button>
        </div>
      </div>

      <p class="text-muted-foreground text-sm">
        Current price: {{ '$' + (price() ?? 0).toFixed(2) }}
      </p>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PriceNumberDemo {
  readonly price = signal<number | null>(29.99);
  readonly formatOptions: Intl.NumberFormatOptions = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };
}`;
}
