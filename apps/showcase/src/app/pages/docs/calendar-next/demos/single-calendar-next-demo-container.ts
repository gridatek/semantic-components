import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SingleCalendarNextDemo } from './single-calendar-next-demo';

@Component({
  selector: 'app-single-calendar-next-demo-container',
  imports: [DemoContainer, SingleCalendarNextDemo],
  template: `
    <app-demo-container
      title="Single"
      [code]="code"
      demoUrl="/demos/calendar-next/single-calendar-next-demo"
    >
      <app-single-calendar-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class SingleCalendarNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, computed, signal } from '@angular/core';
import {
  ScCalendarNext,
  ScCalendarNextClear,
  ScCalendarNextFooter,
  ScCalendarNextHeader,
  ScCalendarNextHeading,
  ScCalendarNextNext,
  ScCalendarNextPrevious,
  ScCalendarNextToday,
  type ScCalendarNextValue,
} from '@semantic-components/ui';
import {
  SiChevronLeftIcon,
  SiChevronRightIcon,
} from '@semantic-icons/lucide-icons';

/** One day. One Tab stop — the focused day: arrows, Home and End, PageUp and PageDown (with Shift, years) move it, across months; Enter or Space picks it. The heading shows the months, then the years. */
@Component({
  selector: 'app-single-calendar-next-demo',
  imports: [
    ScCalendarNext,
    ScCalendarNextHeader,
    ScCalendarNextHeading,
    ScCalendarNextPrevious,
    ScCalendarNextNext,
    ScCalendarNextFooter,
    ScCalendarNextToday,
    ScCalendarNextClear,
    SiChevronLeftIcon,
    SiChevronRightIcon,
  ],
  template: \`
    <div
      scCalendarNext
      #cal="scCalendarNext"
      aria-label="Appointment"
      [(value)]="date"
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
      <div scCalendarNextFooter>
        <button scCalendarNextToday>Today</button>
        <button scCalendarNextClear>Clear</button>
      </div>
    </div>
    <p class="text-muted-foreground text-sm" data-testid="picked">
      {{ picked() }}
    </p>
  \`,
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class SingleCalendarNextDemo {
  readonly date = signal<ScCalendarNextValue>(
    Temporal.PlainDate.from('2026-10-14'),
  );
  readonly picked = computed(() => {
    const date = this.date();
    return date instanceof Temporal.PlainDate
      ? this.long(date)
      : 'No day picked.';
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
}`;
}
