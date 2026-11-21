import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { LimitsTimeClockNextDemo } from './limits-time-clock-next-demo';

@Component({
  selector: 'app-limits-time-clock-next-demo-container',
  imports: [DemoContainer, LimitsTimeClockNextDemo],
  template: `
    <app-demo-container
      title="Limits"
      [code]="code"
      demoUrl="/demos/time-clock-next/limits-time-clock-next-demo"
    >
      <app-limits-time-clock-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class LimitsTimeClockNextDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScTimeClockNext,
  ScTimeClockNextDial,
  ScTimeClockNextHeader,
} from '@semantic-components/ui';

/** minTime and maxTime: the hours and minutes outside them are dimmed and cannot be picked. Here, 9:00 to 17:30, every quarter hour. */
@Component({
  selector: 'app-limits-time-clock-next-demo',
  imports: [ScTimeClockNext, ScTimeClockNextHeader, ScTimeClockNextDial],
  template: \`
    <div
      scTimeClockNext
      #clock="scTimeClockNext"
      [minuteStep]="15"
      [minTime]="open"
      [maxTime]="close"
      [(value)]="time"
    >
      <div scTimeClockNextHeader></div>
      <div
        scTimeClockNextDial
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
export class LimitsTimeClockNextDemo {
  private readonly open = Temporal.PlainTime.from('09:00');
  private readonly close = Temporal.PlainTime.from('17:30');
  private readonly time = signal<Temporal.PlainTime | null>(
    Temporal.PlainTime.from('09:00'),
  );
}`;
}
