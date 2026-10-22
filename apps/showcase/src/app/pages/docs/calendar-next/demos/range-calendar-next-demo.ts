import { Component, ViewEncapsulation, computed, signal } from '@angular/core';
import {
  ScCalendarNext,
  ScCalendarNextHeader,
  ScCalendarNextHeading,
  ScCalendarNextNext,
  ScCalendarNextPrevious,
  type ScCalendarNextValue,
  type ScCalendarRange,
} from '@semantic-components/ui';
import {
  SiChevronLeftIcon,
  SiChevronRightIcon,
} from '@semantic-icons/lucide-icons';

/** From a day to a day, over two months: between the first pick and the pointer, a preview; picked before the start, the two swap. */
@Component({
  selector: 'app-range-calendar-next-demo',
  imports: [
    ScCalendarNext,
    ScCalendarNextHeader,
    ScCalendarNextHeading,
    ScCalendarNextPrevious,
    ScCalendarNextNext,
    SiChevronLeftIcon,
    SiChevronRightIcon,
  ],
  template: `
    <div
      scCalendarNext
      #cal="scCalendarNext"
      aria-label="Stay"
      mode="range"
      [numberOfMonths]="2"
      [(value)]="stay"
      class="rounded-lg border"
    >
      <div scCalendarNextHeader>
        <button scCalendarNextPrevious>
          <svg siChevronLeftIcon></svg>
          <span class="sr-only">{{ previousLabel[cal.view()] }}</span>
        </button>
        <button scCalendarNextHeading>{{ cal.heading() }}</button>
        <button scCalendarNextNext>
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
export class RangeCalendarNextDemo {
  readonly stay = signal<ScCalendarNextValue>({
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
