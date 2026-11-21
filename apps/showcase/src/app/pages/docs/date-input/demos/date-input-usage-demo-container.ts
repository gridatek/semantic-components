import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DateInputUsageDemo } from './date-input-usage-demo';

@Component({
  selector: 'app-date-input-usage-demo-container',
  imports: [DemoContainer, DateInputUsageDemo],
  template: `
    <app-demo-container
      title="Usage"
      [code]="code"
      demoUrl="/demos/date-input/date-input-usage-demo"
    >
      <app-date-input-usage-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class DateInputUsageDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScDateInput,
  ScField,
  ScFieldDescription,
  ScLabel,
} from '@semantic-components/ui';

/** A date in a field: named by its label, described by its description. */
@Component({
  selector: 'app-date-input-usage-demo',
  imports: [ScDateInput, ScField, ScFieldDescription, ScLabel],
  template: \`
    <div scField class="w-44">
      <label scLabel>Birthday</label>
      <div scDateInput [(value)]="birthday"></div>
      <p scFieldDescription>We send a card on the day.</p>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DateInputUsageDemo {
  private readonly birthday = signal<Temporal.PlainDate | null>(null);
}`;
}
