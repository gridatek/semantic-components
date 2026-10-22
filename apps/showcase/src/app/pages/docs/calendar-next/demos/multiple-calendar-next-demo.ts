import { Component, ViewEncapsulation, computed, signal } from '@angular/core';
import {
  ScCalendarNext,
  ScCalendarNextHeader,
  ScCalendarNextHeading,
  ScCalendarNextNext,
  ScCalendarNextPrevious,
  type ScCalendarNextValue,
} from '@semantic-components/ui';
import {
  SiChevronLeftIcon,
  SiChevronRightIcon,
} from '@semantic-icons/lucide-icons';

/** Several days, each picked or unpicked on its own. */
@Component({
  selector: 'app-multiple-calendar-next-demo',
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
      aria-label="Shifts"
      mode="multiple"
      [(value)]="days"
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
export class MultipleCalendarNextDemo {
  readonly days = signal<ScCalendarNextValue>([
    Temporal.PlainDate.from('2026-10-05'),
    Temporal.PlainDate.from('2026-10-07'),
  ]);
  readonly picked = computed(() => {
    const days = (this.days() as readonly Temporal.PlainDate[] | null) ?? [];
    return days.length + ' days: ' + days.map((d) => d.day).join(', ');
  });
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
