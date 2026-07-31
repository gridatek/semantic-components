import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { WithoutLabelNumberDemo } from './without-label-number-demo';

@Component({
  selector: 'app-without-label-number-demo-container',
  imports: [DemoContainer, WithoutLabelNumberDemo],
  template: `
    <app-demo-container
      title="Without Scrub Area"
      demoUrl="/demos/number/without-label-number-demo"
      [code]="code"
    >
      <app-without-label-number-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export default class WithoutLabelNumberDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScButtonGroup,
  ScNumber,
  ScNumberDecrement,
  ScNumberIncrement,
  ScNumberInput,
} from '@semantic-components/ui';
import { SiMinusIcon, SiPlusIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-without-label-number-demo',
  imports: [
    ScNumber,
    ScButtonGroup,
    ScNumberDecrement,
    ScNumberInput,
    ScNumberIncrement,
    SiMinusIcon,
    SiPlusIcon,
  ],
  template: \`
    <div class="flex items-center gap-4">
      <span class="text-sm font-medium">Quantity:</span>
      <div scNumber [(value)]="quantity" [min]="1" [max]="10" class="w-28">
        <div scButtonGroup>
          <button scNumberDecrement>
            <svg siMinusIcon></svg>
            <span class="sr-only">Decrease</span>
          </button>
          <input scNumberInput aria-label="Quantity" />
          <button scNumberIncrement>
            <svg siPlusIcon></svg>
            <span class="sr-only">Increase</span>
          </button>
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class WithoutLabelNumberDemo {
  readonly quantity = signal<number | null>(1);
}`;
}
