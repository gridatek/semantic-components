import { Component, ViewEncapsulation, computed, signal } from '@angular/core';
import {
  ScCalendar,
  ScCalendarHeader,
  ScCalendarNext,
  ScCalendarPrevious,
  type ScCalendarRange,
  type ScCalendarValue,
} from '@semantic-components/ui';
import {
  SiChevronLeftIcon,
  SiChevronRightIcon,
} from '@semantic-icons/lucide-icons';

/** From a day to a day, over two months: between the first pick and the pointer, a preview; picked before the start, the two swap. */
@Component({
  selector: 'app-range-calendar-demo',
  imports: [
    ScCalendar,
    ScCalendarHeader,
    ScCalendarPrevious,
    ScCalendarNext,
    SiChevronLeftIcon,
    SiChevronRightIcon,
  ],
  template: `
    <div
      scCalendar
      #cal="scCalendar"
      aria-label="Stay"
      mode="range"
      [numberOfMonths]="2"
      [(value)]="stay"
      class="rounded-lg border"
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
    <p class="text-muted-foreground text-sm" data-testid="picked">
      {{ picked() }}
    </p>
  `,
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class RangeCalendarDemo {
  readonly stay = signal<ScCalendarValue>({
    from: Temporal.PlainDate.from('2026-10-12'),
    to: Temporal.PlainDate.from('2026-10-16'),
  });
  readonly picked = computed(() => {
    const range = this.stay() as ScCalendarRange | null;
    if (!range?.from) return 'No days picked.';
    return range.to
      ? this.long(range.from) + ' – ' + this.long(range.to)
      : 'From ' + this.long(range.from) + '…';
  });
  private readonly long = (date: Temporal.PlainDate) =>
    date.toLocaleString('en-US', { dateStyle: 'long' });
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
