import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { LimitsDateInputDemo } from './limits-date-input-demo';

@Component({
  selector: 'app-limits-date-input-demo-container',
  imports: [DemoContainer, LimitsDateInputDemo],
  template: `
    <app-demo-container
      title="Limits"
      [code]="code"
      demoUrl="/demos/date-input/limits-date-input-demo"
    >
      <app-limits-date-input-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class LimitsDateInputDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScDateInput,
  ScField,
  ScFieldDescription,
  ScLabel,
} from '@semantic-components/ui';

/** minDate, maxDate and unavailable days: a date outside them is not read — marked. Here, weekdays from today on. */
@Component({
  selector: 'app-limits-date-input-demo',
  imports: [ScDateInput, ScField, ScFieldDescription, ScLabel],
  template: \`
    <div scField class="w-48">
      <label scLabel>Delivery</label>
      <input
        scDateInput
        placeholder="MM/DD/YYYY"
        [minDate]="today"
        [unavailable]="weekend"
        [(value)]="date"
      />
      <p scFieldDescription>A weekday, from today.</p>
    </div>
    <p class="text-muted-foreground text-sm" data-testid="picked">
      {{ date()?.toString() ?? 'No date.' }}
    </p>
  \`,
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class LimitsDateInputDemo {
  readonly today = Temporal.Now.plainDateISO();
  readonly date = signal<Temporal.PlainDate | null>(null);
  /** Saturdays and Sundays. */
  readonly weekend = (date: Temporal.PlainDate) => date.dayOfWeek > 5;
}`;
}
