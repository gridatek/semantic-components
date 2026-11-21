import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DateTimeInputUsageDemo } from './date-time-input-usage-demo';

@Component({
  selector: 'app-date-time-input-usage-demo-container',
  imports: [DemoContainer, DateTimeInputUsageDemo],
  template: `
    <app-demo-container
      title="Usage"
      [code]="code"
      demoUrl="/demos/date-time-input/date-time-input-usage-demo"
    >
      <app-date-time-input-usage-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class DateTimeInputUsageDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScDateTimeInput,
  ScField,
  ScFieldDescription,
  ScLabel,
} from '@semantic-components/ui';

/** A date and a time in a field: named by its label, described by its description. */
@Component({
  selector: 'app-date-time-input-usage-demo',
  imports: [ScDateTimeInput, ScField, ScFieldDescription, ScLabel],
  template: \`
    <div scField class="w-64">
      <label scLabel>Departure</label>
      <div scDateTimeInput [(value)]="departure"></div>
      <p scFieldDescription>The airport's local time.</p>
    </div>
  \`,
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class DateTimeInputUsageDemo {
  private readonly departure = signal<Temporal.PlainDateTime | null>(
    Temporal.PlainDateTime.from('2026-11-02T14:30'),
  );
}`;
}
