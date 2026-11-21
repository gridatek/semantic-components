import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { LimitsDateRangeInputDemo } from './limits-date-range-input-demo';

@Component({
  selector: 'app-limits-date-range-input-demo-container',
  imports: [DemoContainer, LimitsDateRangeInputDemo],
  template: `
    <app-demo-container
      title="Limits"
      [code]="code"
      demoUrl="/demos/date-range-input/limits-date-range-input-demo"
    >
      <app-limits-date-range-input-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class LimitsDateRangeInputDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  type ScCalendarRange,
  ScDateInput,
  ScDateRangeInput,
  ScField,
  ScFieldDescription,
  ScLabel,
} from '@semantic-components/ui';

/** minDate, maxDate and unavailable for both ends; an end before the start is marked too. */
@Component({
  selector: 'app-limits-date-range-input-demo',
  imports: [
    ScDateInput,
    ScDateRangeInput,
    ScField,
    ScLabel,
    ScFieldDescription,
  ],
  template: \`
    <div scField class="w-80">
      <label scLabel>Stay</label>
      <div
        scDateRangeInput
        [minDate]="first"
        [maxDate]="last"
        [unavailable]="closed"
        [(value)]="stay"
      >
        <div scDateInput part="start" aria-label="Check-in"></div>
        <span aria-hidden="true" class="text-muted-foreground">–</span>
        <div scDateInput part="end" aria-label="Check-out"></div>
      </div>
      <p scFieldDescription>In 2026; we are closed on Mondays.</p>
    </div>
  \`,
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class LimitsDateRangeInputDemo {
  private readonly first = Temporal.PlainDate.from('2026-01-01');
  private readonly last = Temporal.PlainDate.from('2026-12-31');
  private readonly closed = (date: Temporal.PlainDate) => date.dayOfWeek === 1;
  private readonly stay = signal<ScCalendarRange | null>({
    from: Temporal.PlainDate.from('2026-11-03'),
    to: Temporal.PlainDate.from('2026-11-06'),
  });
}`;
}
