import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { PriceNumberGroupDemo } from './price-number-group-demo';

@Component({
  selector: 'app-price-number-group-demo-container',
  imports: [DemoContainer, PriceNumberGroupDemo],
  template: `
    <app-demo-container
      title="Currency in another locale"
      demoUrl="/demos/number-group/price-number-group-demo"
      [code]="code"
    >
      <app-price-number-group-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export default class PriceNumberGroupDemoContainer {
  private readonly code = `import { Component, LOCALE_ID, ViewEncapsulation, signal } from '@angular/core';
import {
  ScField,
  ScFrame,
  ScLabel,
  ScNumberDecrement,
  ScNumberGroup,
  ScNumberIncrement,
  ScNumberInput,
  ScNumberScrubArea,
} from '@semantic-components/ui';
import { SiMinusIcon, SiPlusIcon } from '@semantic-icons/lucide-icons';

/** In euros, written the German way: type "1.234,5" — or "1234.5" — and leave the field. */
@Component({
  selector: 'app-price-number-group-demo',
  imports: [
    ScFrame,
    ScLabel,
    ScField,
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
      <div scField>
        <div scNumberScrubArea>
          <label scLabel>Preis</label>
        </div>
        <div
          scNumberGroup
          [(value)]="price"
          [min]="0"
          [step]="0.5"
          [largeStep]="10"
          [format]="{ style: 'currency', currency: 'EUR' }"
        >
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
      <p scFrame class="bg-muted p-4 text-sm">Value: {{ price() ?? 'none' }}</p>
    </div>
  \`,
  providers: [{ provide: LOCALE_ID, useValue: 'de-DE' }],
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class PriceNumberGroupDemo {
  private readonly price = signal<number | null>(1234.5);
}`;
}
