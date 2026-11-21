import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { LimitsDateTimeInputDemo } from './limits-date-time-input-demo';

@Component({
  selector: 'app-limits-date-time-input-demo-container',
  imports: [DemoContainer, LimitsDateTimeInputDemo],
  template: `
    <app-demo-container
      title="Limits"
      [code]="code"
      demoUrl="/demos/date-time-input/limits-date-time-input-demo"
    >
      <app-limits-date-time-input-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class LimitsDateTimeInputDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScDateTimeInput,
  ScField,
  ScFieldDescription,
  ScLabel,
} from '@semantic-components/ui';

/** minDateTime and maxDateTime, and unavailable days: outside them, marked invalid. */
@Component({
  selector: 'app-limits-date-time-input-demo',
  imports: [ScDateTimeInput, ScField, ScFieldDescription, ScLabel],
  template: \`
    <div scField class="w-64">
      <label scLabel>Pickup</label>
      <div
        scDateTimeInput
        [minDateTime]="first"
        [maxDateTime]="last"
        [unavailable]="sunday"
        [(value)]="pickup"
      ></div>
      <p scFieldDescription>
        November 2, 9:00 AM to November 30, 6:00 PM; not on Sundays.
      </p>
    </div>
  \`,
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class LimitsDateTimeInputDemo {
  private readonly first = Temporal.PlainDateTime.from('2026-11-02T09:00');
  private readonly last = Temporal.PlainDateTime.from('2026-11-30T18:00');
  private readonly sunday = (date: Temporal.PlainDate) => date.dayOfWeek === 7;
  private readonly pickup = signal<Temporal.PlainDateTime | null>(
    Temporal.PlainDateTime.from('2026-11-03T10:00'),
  );
}`;
}
