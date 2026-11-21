import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { InputTimeClockNextDemo } from './input-time-clock-next-demo';

@Component({
  selector: 'app-input-time-clock-next-demo-container',
  imports: [DemoContainer, InputTimeClockNextDemo],
  template: `
    <app-demo-container
      title="With a time input"
      [code]="code"
      demoUrl="/demos/time-clock-next/input-time-clock-next-demo"
    >
      <app-input-time-clock-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class InputTimeClockNextDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScField,
  ScLabel,
  ScTimeClockNext,
  ScTimeClockNextDial,
  ScTimeClockNextHeader,
  ScTimeInput,
} from '@semantic-components/ui';

/** One value for a time input and the clock: type it, or pick it. */
@Component({
  selector: 'app-input-time-clock-next-demo',
  imports: [
    ScTimeInput,
    ScField,
    ScLabel,
    ScTimeClockNext,
    ScTimeClockNextHeader,
    ScTimeClockNextDial,
  ],
  template: \`
    <div scField class="w-40">
      <label scLabel>Wake up</label>
      <div scTimeInput [(value)]="time"></div>
    </div>
    <div scTimeClockNext #clock="scTimeClockNext" [(value)]="time">
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
export class InputTimeClockNextDemo {
  private readonly time = signal<Temporal.PlainTime | null>(
    Temporal.PlainTime.from('07:15'),
  );
}`;
}
