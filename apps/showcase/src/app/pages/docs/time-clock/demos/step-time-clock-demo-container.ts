import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { StepTimeClockDemo } from './step-time-clock-demo';

@Component({
  selector: 'app-step-time-clock-demo-container',
  imports: [DemoContainer, StepTimeClockDemo],
  template: `
    <app-demo-container
      title="Step"
      [code]="code"
      demoUrl="/demos/time-clock/step-time-clock-demo"
    >
      <app-step-time-clock-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class StepTimeClockDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScTimeClock,
  ScTimeClockDial,
  ScTimeClockHeader,
} from '@semantic-components/ui-lab';

/** step: 5 minutes — the hand snaps to them, the arrows move by them. */
@Component({
  selector: 'app-step-time-clock-demo',
  imports: [ScTimeClock, ScTimeClockHeader, ScTimeClockDial],
  template: \`
    <div scTimeClock #clock="scTimeClock" [step]="5" [(value)]="time">
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
export class StepTimeClockDemo {
  readonly time = signal<Temporal.PlainTime | null>(null);
}`;
}
