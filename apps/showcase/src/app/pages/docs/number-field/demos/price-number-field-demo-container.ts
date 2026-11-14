import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { PriceNumberFieldDemo } from './price-number-field-demo';

@Component({
  selector: 'app-price-number-field-demo-container',
  imports: [DemoContainer, PriceNumberFieldDemo],
  template: `
    <app-demo-container
      title="Currency in another locale"
      demoUrl="/demos/number-field/price-number-field-demo"
      [code]="code"
    >
      <app-price-number-field-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export default class PriceNumberFieldDemoContainer {
  readonly code = `import { Component, LOCALE_ID, ViewEncapsulation, signal } from '@angular/core';
import {
  ScFrame,
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
    ScFrame,
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
  template: \`
    <div class="w-56 space-y-4">
      <div
        scNumberField
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
      <p scFrame class="bg-muted p-4 text-sm">Value: {{ price() ?? 'none' }}</p>
    </div>
  \`,
  providers: [{ provide: LOCALE_ID, useValue: 'de-DE' }],
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class PriceNumberFieldDemo {
  readonly price = signal<number | null>(1234.5);
}`;
}
