import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScCalendar,
  ScCalendarHeader,
  ScCalendarNext,
  ScCalendarPrevious,
  type ScCalendarValue,
  ScCard,
  ScCardContent,
} from '@semantic-components/ui';
import {
  SiChevronLeftIcon,
  SiChevronRightIcon,
} from '@semantic-icons/lucide-icons';

/** unavailable: booked days can’t be picked (struck through). */
@Component({
  selector: 'app-booked-calendar-demo',
  imports: [
    ScCalendar,
    ScCalendarHeader,
    ScCalendarNext,
    ScCalendarPrevious,
    ScCard,
    ScCardContent,
    SiChevronLeftIcon,
    SiChevronRightIcon,
  ],
  template: `
    <div scCard class="w-fit p-0">
      <div scCardContent class="p-0">
        <div
          scCalendar
          #cal="scCalendar"
          aria-label="Booking"
          [unavailable]="booked"
          [(value)]="date"
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
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class BookedCalendarDemo {
  readonly date = signal<ScCalendarValue>(
    Temporal.PlainDate.from('2026-01-06'),
  );
  private readonly first = Temporal.PlainDate.from('2026-01-12');
  /** 15 days from January 12. */
  readonly booked = (date: Temporal.PlainDate) => {
    const days = date.since(this.first).days;
    return days >= 0 && days < 15;
  };
  readonly previousLabel = {
    day: 'Previous month',
    month: 'Previous year',
    year: 'Previous years',
  };
  readonly nextLabel = {
    day: 'Next month',
    month: 'Next year',
    year: 'Next years',
  };
}
