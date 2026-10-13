import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { WithoutLabelNumberFieldDemo } from './without-label-number-field-demo';

@Component({
  selector: 'app-without-label-number-field-demo-container',
  imports: [DemoContainer, WithoutLabelNumberFieldDemo],
  template: `
    <app-demo-container
      title="Without a scrub area"
      demoUrl="/demos/number-field/without-label-number-field-demo"
      [code]="code"
    >
      <app-without-label-number-field-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export default class WithoutLabelNumberFieldDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScNumberField,
  ScNumberFieldDecrement,
  ScNumberFieldGroup,
  ScNumberFieldIncrement,
  ScNumberFieldInput,
} from '@semantic-components/ui';
import { SiMinusIcon, SiPlusIcon } from '@semantic-icons/lucide-icons';

/** No visible label, no scrub area: the group alone, named by \`aria-label\`. */
@Component({
  selector: 'app-without-label-number-field-demo',
  imports: [
    ScNumberField,
    ScNumberFieldGroup,
    ScNumberFieldDecrement,
    ScNumberFieldInput,
    ScNumberFieldIncrement,
    SiMinusIcon,
    SiPlusIcon,
  ],
  template: \`
    <div scNumberField class="w-36" [(value)]="quantity" [min]="1" [max]="10">
      <div scNumberFieldGroup>
        <button scNumberFieldDecrement>
          <svg siMinusIcon></svg>
          <span class="sr-only">Decrease quantity</span>
        </button>
        <input scNumberFieldInput aria-label="Quantity" />
        <button scNumberFieldIncrement>
          <svg siPlusIcon></svg>
          <span class="sr-only">Increase quantity</span>
        </button>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class WithoutLabelNumberFieldDemo {
  readonly quantity = signal<number | null>(1);
}`;
}
