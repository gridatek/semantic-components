import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScCalendar,
  ScCalendarDay,
  ScCalendarHeader,
  ScCalendarNext,
  ScCalendarPrevious,
  type ScCalendarValue,
  ScCard,
  ScCardBody,
} from '@semantic-components/ui';
import {
  SiChevronLeftIcon,
  SiChevronRightIcon,
} from '@semantic-icons/lucide-icons';

/** A price under each day (more at the weekend), in bigger cells: --cell-size in your class. */
@Component({
  selector: 'app-custom-days-calendar-demo',
  imports: [
    ScCalendar,
    ScCalendarDay,
    ScCalendarHeader,
    ScCalendarNext,
    ScCalendarPrevious,
    ScCard,
    ScCardBody,
    SiChevronLeftIcon,
    SiChevronRightIcon,
  ],
  template: `
    <div scCard class="w-fit p-0">
      <div scCardBody class="p-0">
        <div
          scCalendar
          #cal="scCalendar"
          aria-label="Stay"
          mode="range"
          [(value)]="stay"
          class="[--cell-size:--spacing(10)] md:[--cell-size:--spacing(12)]"
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
          <ng-template scCalendarDay let-day let-outside="outside">
            @if (!outside) {
              <span class="text-[0.625rem] opacity-70">{{ price(day) }}</span>
            }
          </ng-template>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class CustomDaysCalendarDemo {
  readonly stay = signal<ScCalendarValue>({
    from: Temporal.PlainDate.from('2026-12-08'),
    to: Temporal.PlainDate.from('2026-12-18'),
  });
  /** Saturday and Sunday cost more. */
  price(day: Temporal.PlainDate): string {
    return day.dayOfWeek >= 6 ? '$120' : '$100';
  }
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
