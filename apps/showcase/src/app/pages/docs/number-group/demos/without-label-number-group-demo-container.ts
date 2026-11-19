import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { WithoutLabelNumberGroupDemo } from './without-label-number-group-demo';

@Component({
  selector: 'app-without-label-number-group-demo-container',
  imports: [DemoContainer, WithoutLabelNumberGroupDemo],
  template: `
    <app-demo-container
      title="Without a scrub area"
      demoUrl="/demos/number-group/without-label-number-group-demo"
      [code]="code"
    >
      <app-without-label-number-group-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export default class WithoutLabelNumberGroupDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScField,
  ScNumberDecrement,
  ScNumberGroup,
  ScNumberIncrement,
  ScNumberInput,
} from '@semantic-components/ui';
import { SiMinusIcon, SiPlusIcon } from '@semantic-icons/lucide-icons';

/** No visible label, no scrub area: the group alone, named by \`aria-label\`. */
@Component({
  selector: 'app-without-label-number-group-demo',
  imports: [
    ScField,
    ScNumberGroup,
    ScNumberDecrement,
    ScNumberInput,
    ScNumberIncrement,
    SiMinusIcon,
    SiPlusIcon,
  ],
  template: \`
    <div scField class="w-36">
      <div scNumberGroup [(value)]="quantity" [min]="1" [max]="10">
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
export class WithoutLabelNumberGroupDemo {
  private readonly quantity = signal<number | null>(1);
}`;
}
