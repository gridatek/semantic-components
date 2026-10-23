import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { InputTimeClockDemo } from './input-time-clock-demo';

@Component({
  selector: 'app-input-time-clock-demo-container',
  imports: [DemoContainer, InputTimeClockDemo],
  template: `
    <app-demo-container
      title="With a time input"
      [code]="code"
      demoUrl="/demos/time-clock/input-time-clock-demo"
    >
      <app-input-time-clock-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class InputTimeClockDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScField, ScLabel, ScTimeInput, ScTimeClock, ScTimeClockDial, ScTimeClockHeader } from '@semantic-components/ui';

/** One value for a time input and the clock: type it, or pick it. */
@Component({
  selector: 'app-input-time-clock-demo',
  imports: [
    ScTimeInput,
    ScField,
    ScLabel,
    ScTimeClock,
    ScTimeClockHeader,
    ScTimeClockDial,
  ],
  template: \`
    <div scField class="w-40">
      <label scLabel>Wake up</label>
      <div scTimeInput [(value)]="time"></div>
    </div>
    <div scTimeClock #clock="scTimeClock" [(value)]="time">
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
export class InputTimeClockDemo {
  readonly time = signal<Temporal.PlainTime | null>(
    Temporal.PlainTime.from('07:15'),
  );
}`;
}
