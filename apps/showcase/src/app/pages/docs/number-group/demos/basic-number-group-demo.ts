import { Component, ViewEncapsulation, signal } from '@angular/core';
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

/** The value as you type and step; `valueCommitted` on blur, Enter or a step. */
@Component({
  selector: 'app-basic-number-group-demo',
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
  template: `
    <div class="w-48 space-y-4">
      <div scField>
        <div scNumberScrubArea>
          <label scLabel>Count</label>
        </div>
        <div
          scNumberGroup
          [(value)]="count"
          [min]="0"
          [max]="100"
          (valueCommitted)="committed.set($event)"
        >
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
        scFrame
        class="bg-muted grid grid-cols-[auto_1fr] gap-x-3 p-4 text-sm"
      >
        <dt class="text-muted-foreground">Value</dt>
        <dd>{{ count() ?? 'none' }}</dd>
        <dt class="text-muted-foreground">Committed</dt>
        <dd>{{ committed() ?? 'none' }}</dd>
      </dl>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicNumberGroupDemo {
  private readonly count = signal<number | null>(10);
  private readonly committed = signal<number | null>(10);
}
