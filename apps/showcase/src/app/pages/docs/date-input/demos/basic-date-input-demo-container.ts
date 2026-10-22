import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicDateInputDemo } from './basic-date-input-demo';

@Component({
  selector: 'app-basic-date-input-demo-container',
  imports: [DemoContainer, BasicDateInputDemo],
  template: `
    <app-demo-container
      title="Basic"
      [code]="code"
      demoUrl="/demos/date-input/basic-date-input-demo"
    >
      <app-basic-date-input-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicDateInputDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScDateInput,
  ScField,
  ScFieldDescription,
  ScLabel,
} from '@semantic-components/ui';

/** A text input in a field: the locale’s numeric order (here 10/14/2026) or ISO (2026-10-14), read on Enter or leaving. Text that is not a day stays, marked — the value as it was. */
@Component({
  selector: 'app-basic-date-input-demo',
  imports: [ScDateInput, ScField, ScFieldDescription, ScLabel],
  template: \`
    <div scField class="w-48">
      <label scLabel>Start date</label>
      <input scDateInput placeholder="MM/DD/YYYY" [(value)]="date" />
      <p scFieldDescription>Month, day, year.</p>
    </div>
    <p class="text-muted-foreground text-sm" data-testid="picked">
      {{ date()?.toString() ?? 'No date.' }}
    </p>
  \`,
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicDateInputDemo {
  readonly date = signal<Temporal.PlainDate | null>(null);
}`;
}
