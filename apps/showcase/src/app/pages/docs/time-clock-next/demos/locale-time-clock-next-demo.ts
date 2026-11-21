import { Component, LOCALE_ID, ViewEncapsulation, signal } from '@angular/core';
import {
  ScTimeClockNext,
  ScTimeClockNextDial,
  ScTimeClockNextHeader,
} from '@semantic-components/ui';

/** LOCALE_ID provided as 'fr-FR': 24 hours — 13 to 00 on an inner ring. hourCycle overrides the locale’s 12 or 24. */
@Component({
  selector: 'app-locale-time-clock-next-demo',
  imports: [ScTimeClockNext, ScTimeClockNextHeader, ScTimeClockNextDial],
  template: `
    <div scTimeClockNext #clock="scTimeClockNext" [(value)]="time">
      <div scTimeClockNextHeader></div>
      <div
        scTimeClockNextDial
        [attr.aria-label]="clock.view() === 'hours' ? 'Heures' : 'Minutes'"
      ></div>
    </div>
    <p class="text-muted-foreground text-sm" data-testid="picked">
      {{ time()?.toString() ?? 'No time.' }}
    </p>
  `,
  providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class LocaleTimeClockNextDemo {
  private readonly time = signal<Temporal.PlainTime | null>(
    Temporal.PlainTime.from('18:45'),
  );
}
