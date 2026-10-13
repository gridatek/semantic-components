import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicNumberDemo } from './basic-number-demo';

@Component({
  selector: 'app-basic-number-demo-container',
  imports: [DemoContainer, BasicNumberDemo],
  template: `
    <app-demo-container
      title="Value and committed value"
      demoUrl="/demos/number/basic-number-demo"
      [code]="code"
    >
      <app-basic-number-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export default class BasicNumberDemoContainer {
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

/** The value as you type and step; \`valueCommitted\` on blur, Enter or a step. */
@Component({
  selector: 'app-basic-number-demo',
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
    <div class="w-48 space-y-4">
      <div
        scField
        scNumber
        [(value)]="count"
        [min]="0"
        [max]="100"
        (valueCommitted)="committed.set($event)"
      >
        <div scNumberScrubArea>
          <label scLabel>Count</label>
        </div>
        <div scNumberGroup>
          <button scNumberDecrement>
            <svg siMinusIcon></svg>
            <span class="sr-only">Decrease count</span>
          </button>
          <input scNumberInput />
          <button scNumberIncrement>
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
export class BasicNumberDemo {
  readonly count = signal<number | null>(10);
  readonly committed = signal<number | null>(10);
}`;
}
