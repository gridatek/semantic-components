import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { StackedNumberFieldDemo } from './stacked-number-field-demo';

@Component({
  selector: 'app-stacked-number-field-demo-container',
  imports: [DemoContainer, StackedNumberFieldDemo],
  template: `
    <app-demo-container
      title="Stacked buttons"
      demoUrl="/demos/number-field/stacked-number-field-demo"
      [code]="code"
    >
      <app-stacked-number-field-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export default class StackedNumberFieldDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScLabel,
  ScNumberField,
  ScNumberFieldDecrement,
  ScNumberFieldGroup,
  ScNumberFieldIncrement,
  ScNumberFieldInput,
} from '@semantic-components/ui';
import {
  SiChevronDownIcon,
  SiChevronUpIcon,
} from '@semantic-icons/lucide-icons';

/** The group's \`stacked\` variant: the input, then increment over decrement. */
@Component({
  selector: 'app-stacked-number-field-demo',
  imports: [
    ScLabel,
    ScNumberField,
    ScNumberFieldGroup,
    ScNumberFieldDecrement,
    ScNumberFieldInput,
    ScNumberFieldIncrement,
    SiChevronDownIcon,
    SiChevronUpIcon,
  ],
  template: \`
    <div scNumberField class="w-64" [(value)]="quantity" [min]="0">
      <label scLabel>Enter quantity</label>
      <div scNumberFieldGroup variant="stacked">
        <input scNumberFieldInput />
        <button scNumberFieldIncrement>
          <svg siChevronUpIcon></svg>
          <span class="sr-only">Increase quantity</span>
        </button>
        <button scNumberFieldDecrement>
          <svg siChevronDownIcon></svg>
          <span class="sr-only">Decrease quantity</span>
        </button>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class StackedNumberFieldDemo {
  readonly quantity = signal<number | null>(123);
}`;
}
