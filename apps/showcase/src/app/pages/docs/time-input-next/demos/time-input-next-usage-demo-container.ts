import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { TimeInputNextUsageDemo } from './time-input-next-usage-demo';

@Component({
  selector: 'app-time-input-next-usage-demo-container',
  imports: [DemoContainer, TimeInputNextUsageDemo],
  template: `
    <app-demo-container
      title="Usage"
      [code]="code"
      demoUrl="/demos/time-input-next/time-input-next-usage-demo"
    >
      <app-time-input-next-usage-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class TimeInputNextUsageDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScField,
  ScFieldDescription,
  ScLabel,
  ScTimeInputNext,
} from '@semantic-components/ui';

/** A time in a field: named by its label, described by its description. */
@Component({
  selector: 'app-time-input-next-usage-demo',
  imports: [ScField, ScFieldDescription, ScLabel, ScTimeInputNext],
  template: \`
    <div scField class="w-44">
      <label scLabel>Meeting time</label>
      <div scTimeInputNext [(value)]="time"></div>
      <p scFieldDescription>In your local time.</p>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class TimeInputNextUsageDemo {
  private readonly time = signal<Temporal.PlainTime | null>(
    Temporal.PlainTime.from('09:30'),
  );
}`;
}
