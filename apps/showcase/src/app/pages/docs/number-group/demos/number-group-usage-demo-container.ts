import { Component, ViewEncapsulation } from '@angular/core';
import { UsageCode } from '../../../../components/usage-code/usage-code';
import { NumberGroupUsageDemo } from './number-group-usage-demo';

@Component({
  selector: 'app-number-group-usage-demo-container',
  imports: [UsageCode, NumberGroupUsageDemo],
  template: `
    <app-usage-code [code]="code">
      <ng-template><app-number-group-usage-demo /></ng-template>
    </app-usage-code>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class NumberGroupUsageDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScLabel,
  ScField,
  ScNumberDecrement,
  ScNumberGroup,
  ScNumberIncrement,
  ScNumberInput,
  ScNumberScrubArea,
} from '@semantic-components/ui';
import { SiMinusIcon, SiPlusIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-number-group-usage-demo',
  imports: [
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
    <div scField class="w-40">
      <div scNumberScrubArea [pixelSensitivity]="10">
        <label scLabel>Quantity</label>
      </div>
      <div scNumberGroup [(value)]="quantity" [min]="1" [max]="10">
        <button scNumberDecrement>
          <svg siMinusIcon></svg>
          <span class="sr-only">Decrease quantity</span>
        </button>
        <input scNumberInput />
        <button scNumberIncrement>
          <svg siPlusIcon></svg>
          <span class="sr-only">Increase quantity</span>
        </button>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class NumberGroupUsageDemo {
  private readonly quantity = signal<number | null>(1);
}`;
}
