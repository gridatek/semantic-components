import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { StepTimeClockNextDemo } from './step-time-clock-next-demo';

@Component({
  selector: 'app-step-time-clock-next-demo-container',
  imports: [DemoContainer, StepTimeClockNextDemo],
  template: `
    <app-demo-container
      title="Step"
      [code]="code"
      demoUrl="/demos/time-clock-next/step-time-clock-next-demo"
    >
      <app-step-time-clock-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class StepTimeClockNextDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScTimeClockNext,
  ScTimeClockNextDial,
  ScTimeClockNextHeader,
} from '@semantic-components/ui';

/** minuteStep: 5 minutes — the hand snaps to them, the arrows move by them. */
@Component({
  selector: 'app-step-time-clock-next-demo',
  imports: [ScTimeClockNext, ScTimeClockNextHeader, ScTimeClockNextDial],
  template: \`
    <div
      scTimeClockNext
      #clock="scTimeClockNext"
      [minuteStep]="5"
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
export class StepTimeClockNextDemo {
  private readonly time = signal<Temporal.PlainTime | null>(null);
}`;
}
