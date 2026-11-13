import { Dir } from '@angular/cdk/bidi';
import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScCalendar,
  ScCalendarHeader,
  ScCalendarNext,
  ScCalendarPrevious,
  type ScCalendarValue,
  ScFrame,
} from '@semantic-components/ui';
import {
  SiChevronLeftIcon,
  SiChevronRightIcon,
} from '@semantic-icons/lucide-icons';

/** In a right-to-left page, in Arabic: the week from the right, the arrows turned. */
@Component({
  selector: 'app-rtl-calendar-demo',
  imports: [
    Dir,
    ScCalendar,
    ScCalendarHeader,
    ScCalendarNext,
    ScCalendarPrevious,
    ScFrame,
    SiChevronLeftIcon,
    SiChevronRightIcon,
  ],
  template: `
    <div dir="rtl" lang="ar">
      <div
        scCalendar
        #cal="scCalendar"
        aria-label="الموعد"
        locale="ar"
        [(value)]="date"
        scFrame
        class="[--cell-size:--spacing(12)]"
      >
        <div scCalendarHeader>
          <button scCalendarPrevious>
            <svg siChevronLeftIcon></svg>
            <span class="sr-only">{{ previousLabel[cal.view()] }}</span>
          </button>
          <button scCalendarNext>
            <svg siChevronRightIcon></svg>
            <span class="sr-only">{{ nextLabel[cal.view()] }}</span>
          </button>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlCalendarDemo {
  readonly date = signal<ScCalendarValue>(
    Temporal.PlainDate.from('2026-10-14'),
  );
  readonly previousLabel = {
    day: 'الشهر السابق',
    month: 'السنة السابقة',
    year: 'السنوات السابقة',
  };
  readonly nextLabel = {
    day: 'الشهر التالي',
    month: 'السنة التالية',
    year: 'السنوات التالية',
  };
}
