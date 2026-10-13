import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { PriceNumberDemo } from './price-number-demo';

@Component({
  selector: 'app-price-number-demo-container',
  imports: [DemoContainer, PriceNumberDemo],
  template: `
    <app-demo-container
      title="Currency in another locale"
      demoUrl="/demos/number/price-number-demo"
      [code]="code"
    >
      <app-price-number-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export default class PriceNumberDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScField,
  ScLabel,
  ScNumber,
  ScNumberDecrement,
  ScNumberGroup,
  ScNumberIncrement,
  ScNumberInput,
  ScNumberScrubArea,
} from '@semantic-components/ui';
import { SiMinusIcon, SiPlusIcon } from '@semantic-icons/lucide-icons';

/** In euros, written the German way: type "1.234,5" — or "1234.5" — and leave the field. */
@Component({
  selector: 'app-price-number-demo',
  imports: [
    ScField,
    ScLabel,
    ScNumber,
    ScNumberScrubArea,
    ScNumberGroup,
    ScNumberDecrement,
    ScNumberInput,
    ScNumberIncrement,
    SiMinusIcon,
    SiPlusIcon,
  ],
  template: \`
    <div class="w-56 space-y-4">
      <div
        scField
        scNumber
        locale="de-DE"
        [(value)]="price"
        [min]="0"
        [step]="0.5"
        [largeStep]="10"
        [format]="{ style: 'currency', currency: 'EUR' }"
      >
        <div scNumberScrubArea>
          <label scLabel>Preis</label>
        </div>
        <div scNumberGroup>
          <button scNumberDecrement>
            <svg siMinusIcon></svg>
            <span class="sr-only">Decrease price</span>
          </button>
          <input scNumberInput />
          <button scNumberIncrement>
            <svg siPlusIcon></svg>
            <span class="sr-only">Increase price</span>
          </button>
        </div>
      </div>
      <p class="bg-muted rounded-md p-4 text-sm">
        Value: {{ price() ?? 'none' }}
      </p>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class PriceNumberDemo {
  readonly price = signal<number | null>(1234.5);
}`;
}
