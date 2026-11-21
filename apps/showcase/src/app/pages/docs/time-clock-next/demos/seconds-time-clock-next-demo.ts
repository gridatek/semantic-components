import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScTimeClockNext,
  ScTimeClockNextDial,
  ScTimeClockNextHeader,
} from '@semantic-components/ui';

/** granularity="second", 24 hours: hours, minutes, then seconds — each pick moves on to the next; seconds every 5. */
@Component({
  selector: 'app-seconds-time-clock-next-demo',
  imports: [ScTimeClockNext, ScTimeClockNextHeader, ScTimeClockNextDial],
  template: `
    <div
      scTimeClockNext
      #clock="scTimeClockNext"
      granularity="second"
      [hourCycle]="24"
      [secondStep]="5"
      [(value)]="time"
    >
      <div scTimeClockNextHeader></div>
      <div
        scTimeClockNextDial
        [attr.aria-label]="clock.names()[clock.view()]"
      ></div>
    </div>
    <p class="text-muted-foreground text-sm" data-testid="picked">
      {{ time()?.toString() ?? 'No time.' }}
    </p>
  `,
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class SecondsTimeClockNextDemo {
  private readonly time = signal<Temporal.PlainTime | null>(
    Temporal.PlainTime.from('10:30'),
  );
}
