import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScTimeClock,
  ScTimeClockDial,
  ScTimeClockHeader,
} from '@semantic-components/ui-lab';

/** The hour, then the minute: drag or click the hand, or the keyboard on the dial (arrows, Page Up/Down, Home/End, Enter). The header shows the time and switches the view; AM and PM in 12 hours. */
@Component({
  selector: 'app-basic-time-clock-demo',
  imports: [ScTimeClock, ScTimeClockHeader, ScTimeClockDial],
  template: `
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
  `,
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicTimeClockDemo {
  readonly time = signal<Temporal.PlainTime | null>(
    Temporal.PlainTime.from('10:30'),
  );
}
