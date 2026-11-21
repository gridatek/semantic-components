import { Dir } from '@angular/cdk/bidi';
import { Component, LOCALE_ID, ViewEncapsulation, signal } from '@angular/core';
import {
  ScTimeClock,
  ScTimeClockDial,
  ScTimeClockHeader,
} from '@semantic-components/ui';

/** In a right-to-left page: the numbers are the locale's, the face never turns (a clock is a clock), the header's time stays left to right; AM/PM in Arabic. */
@Component({
  selector: 'app-rtl-time-clock-demo',
  imports: [Dir, ScTimeClock, ScTimeClockHeader, ScTimeClockDial],
  template: `
    <div dir="rtl" lang="ar" scTimeClock #clock="scTimeClock" [(value)]="time">
      <div scTimeClockHeader></div>
      <div
        scTimeClockDial
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
export class RtlTimeClockDemo {
  private readonly time = signal<Temporal.PlainTime | null>(
    Temporal.PlainTime.from('10:30'),
  );
}
