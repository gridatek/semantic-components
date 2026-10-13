import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { WithoutLabelNumberDemo } from './without-label-number-demo';

@Component({
  selector: 'app-without-label-number-demo-container',
  imports: [DemoContainer, WithoutLabelNumberDemo],
  template: `
    <app-demo-container
      title="Without a scrub area"
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
  ScNumber,
  ScNumberDecrement,
  ScNumberGroup,
  ScNumberIncrement,
  ScNumberInput,
} from '@semantic-components/ui';
import { SiMinusIcon, SiPlusIcon } from '@semantic-icons/lucide-icons';

/** No visible label, no scrub area: the group alone, named by \`aria-label\`. */
@Component({
  selector: 'app-without-label-number-demo',
  imports: [
    ScNumber,
    ScNumberGroup,
    ScNumberDecrement,
    ScNumberInput,
    ScNumberIncrement,
    SiMinusIcon,
    SiPlusIcon,
  ],
  template: \`
    <div scNumber class="w-36" [(value)]="quantity" [min]="1" [max]="10">
      <div scNumberGroup>
        <button scNumberDecrement>
          <svg siMinusIcon></svg>
          <span class="sr-only">Decrease quantity</span>
        </button>
        <input scNumberInput aria-label="Quantity" />
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
export class WithoutLabelNumberDemo {
  readonly quantity = signal<number | null>(1);
}`;
}
