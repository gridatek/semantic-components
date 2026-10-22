import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { LimitsTimeClockDemo } from './limits-time-clock-demo';

@Component({
  selector: 'app-limits-time-clock-demo-container',
  imports: [DemoContainer, LimitsTimeClockDemo],
  template: `
    <app-demo-container
      title="Limits"
      [code]="code"
      demoUrl="/demos/time-clock/limits-time-clock-demo"
    >
      <app-limits-time-clock-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class LimitsTimeClockDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScTimeClock,
  ScTimeClockDial,
  ScTimeClockHeader,
} from '@semantic-components/ui-lab';

/** minTime and maxTime: the hours and minutes outside them are dimmed and cannot be picked. Here, 9:00 to 17:30, every quarter hour. */
@Component({
  selector: 'app-limits-time-clock-demo',
  imports: [ScTimeClock, ScTimeClockHeader, ScTimeClockDial],
  template: \`
    <div
      scTimeClock
      #clock="scTimeClock"
      [step]="15"
      [minTime]="open"
      [maxTime]="close"
      [(value)]="time"
    >
      <div scTimeClockHeader></div>
      <div
        scTimeClockDial
        [attr.aria-label]="clock.view() === 'hours' ? 'Hours' : 'Minutes'"
      ></div>
    </div>
    <p class="text-muted-foreground text-sm" data-testid="picked">
      {{ time()?.toString() ?? 'No time.' }}
    </p>
  \`,
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class LimitsTimeClockDemo {
  readonly open = Temporal.PlainTime.from('09:00');
  readonly close = Temporal.PlainTime.from('17:30');
  readonly time = signal<Temporal.PlainTime | null>(
    Temporal.PlainTime.from('09:00'),
  );
}`;
}
