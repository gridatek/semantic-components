import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DisabledTimeInputNextDemo } from './disabled-time-input-next-demo';

@Component({
  selector: 'app-disabled-time-input-next-demo-container',
  imports: [DemoContainer, DisabledTimeInputNextDemo],
  template: `
    <app-demo-container
      title="Disabled"
      [code]="code"
      demoUrl="/demos/time-input-next/disabled-time-input-next-demo"
    >
      <app-disabled-time-input-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledTimeInputNextDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScField, ScLabel, ScTimeInputNext } from '@semantic-components/ui';

/** Disabled: its parts leave the tab order. */
@Component({
  selector: 'app-disabled-time-input-next-demo',
  imports: [ScField, ScLabel, ScTimeInputNext],
  template: \`
    <div scField class="w-44">
      <label scLabel>Start time</label>
      <div scTimeInputNext disabled [(value)]="time"></div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledTimeInputNextDemo {
  private readonly time = signal<Temporal.PlainTime | null>(
    Temporal.PlainTime.from('09:30'),
  );
}`;
}
