import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicNumberFieldDemo } from './basic-number-field-demo';

@Component({
  selector: 'app-basic-number-field-demo-container',
  imports: [DemoContainer, BasicNumberFieldDemo],
  template: `
    <app-demo-container
      title="Value and committed value"
      demoUrl="/demos/number-field/basic-number-field-demo"
      [code]="code"
    >
      <app-basic-number-field-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export default class BasicNumberFieldDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScLabel,
  ScNumberField,
  ScNumberFieldDecrement,
  ScNumberFieldGroup,
  ScNumberFieldIncrement,
  ScNumberFieldInput,
  ScNumberFieldScrubArea,
} from '@semantic-components/ui';
import { SiMinusIcon, SiPlusIcon } from '@semantic-icons/lucide-icons';

/** The value as you type and step; \`valueCommitted\` on blur, Enter or a step. */
@Component({
  selector: 'app-basic-number-field-demo',
  imports: [
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
    <div class="w-48 space-y-4">
      <div
        scNumberField
        [(value)]="count"
        [min]="0"
        [max]="100"
        (valueCommitted)="committed.set($event)"
      >
        <div scNumberFieldScrubArea>
          <label scLabel>Count</label>
        </div>
        <div scNumberFieldGroup>
          <button scNumberFieldDecrement>
            <svg siMinusIcon></svg>
            <span class="sr-only">Decrease count</span>
          </button>
          <input scNumberFieldInput />
          <button scNumberFieldIncrement>
            <svg siPlusIcon></svg>
            <span class="sr-only">Increase count</span>
          </button>
        </div>
      </div>
      <dl
        class="bg-muted grid grid-cols-[auto_1fr] gap-x-3 rounded-md p-4 text-sm"
      >
        <dt class="text-muted-foreground">Value</dt>
        <dd>{{ count() ?? 'none' }}</dd>
        <dt class="text-muted-foreground">Committed</dt>
        <dd>{{ committed() ?? 'none' }}</dd>
      </dl>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicNumberFieldDemo {
  readonly count = signal<number | null>(10);
  readonly committed = signal<number | null>(10);
}`;
}
