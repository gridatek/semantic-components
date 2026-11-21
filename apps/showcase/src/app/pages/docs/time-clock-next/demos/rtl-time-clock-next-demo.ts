import { Dir } from '@angular/cdk/bidi';
import { Component, LOCALE_ID, ViewEncapsulation, signal } from '@angular/core';
import {
  ScTimeClockNext,
  ScTimeClockNextDial,
  ScTimeClockNextHeader,
} from '@semantic-components/ui';

/** In a right-to-left page: the numbers are the locale's, the face never turns (a clock is a clock), the header's time stays left to right; AM/PM in Arabic. */
@Component({
  selector: 'app-rtl-time-clock-next-demo',
  imports: [Dir, ScTimeClockNext, ScTimeClockNextHeader, ScTimeClockNextDial],
  template: `
    <div
      dir="rtl"
      lang="ar"
      scTimeClockNext
      #clock="scTimeClockNext"
      [(value)]="time"
    >
      <div scTimeClockNextHeader></div>
      <div
        scTimeClockNextDial
        [attr.aria-label]="clock.view() === 'hours' ? 'الساعات' : 'الدقائق'"
      ></div>
    </div>
    <p class="text-muted-foreground text-sm" data-testid="picked">
      {{ time()?.toString() ?? 'No time.' }}
    </p>
  `,
  providers: [{ provide: LOCALE_ID, useValue: 'ar' }],
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlTimeClockNextDemo {
  private readonly time = signal<Temporal.PlainTime | null>(
    Temporal.PlainTime.from('10:30'),
  );
}
