import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { LimitsTimeInputDemo } from './limits-time-input-demo';

@Component({
  selector: 'app-limits-time-input-demo-container',
  imports: [DemoContainer, LimitsTimeInputDemo],
  template: `
    <app-demo-container
      title="Limits"
      [code]="code"
      demoUrl="/demos/time-input/limits-time-input-demo"
    >
      <app-limits-time-input-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class LimitsTimeInputDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScField,
  ScFieldDescription,
  ScLabel,
  ScTimeInput,
} from '@semantic-components/ui';

/** minTime and maxTime: a time outside them is marked invalid. */
@Component({
  selector: 'app-limits-time-input-demo',
  imports: [ScField, ScFieldDescription, ScLabel, ScTimeInput],
  template: \`
    <div scField class="w-44">
      <label scLabel>Opening time</label>
      <div
        scTimeInput
        [minTime]="open"
        [maxTime]="close"
        [(value)]="time"
      ></div>
      <p scFieldDescription>Between 9:00 AM and 5:30 PM.</p>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class LimitsTimeInputDemo {
  private readonly open = Temporal.PlainTime.from('09:00');
  private readonly close = Temporal.PlainTime.from('17:30');
  private readonly time = signal<Temporal.PlainTime | null>(
    Temporal.PlainTime.from('10:00'),
  );
}`;
}
