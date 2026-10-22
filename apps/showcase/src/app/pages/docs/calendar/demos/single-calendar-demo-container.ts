import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SingleCalendarDemo } from './single-calendar-demo';

@Component({
  selector: 'app-single-calendar-demo-container',
  imports: [DemoContainer, SingleCalendarDemo],
  template: `
    <app-demo-container
      title="Single"
      [code]="code"
      demoUrl="/demos/calendar/single-calendar-demo"
    >
      <app-single-calendar-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class SingleCalendarDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, computed, signal } from '@angular/core';
import {
  ScCalendar,
  ScCalendarClear,
  ScCalendarFooter,
  ScCalendarHeader,
  ScCalendarNext,
  ScCalendarPrevious,
  ScCalendarToday,
  type ScCalendarValue,
} from '@semantic-components/ui';
import {
  SiChevronLeftIcon,
  SiChevronRightIcon,
} from '@semantic-icons/lucide-icons';

/** One day. One Tab stop — the focused day: arrows, Home and End, PageUp and PageDown (with Shift, years) move it, across months; Enter or Space picks it. The heading shows the months, then the years. */
@Component({
  selector: 'app-single-calendar-demo',
  imports: [
    ScCalendar,
    ScCalendarHeader,
    ScCalendarPrevious,
    ScCalendarNext,
    ScCalendarFooter,
    ScCalendarToday,
    ScCalendarClear,
    SiChevronLeftIcon,
    SiChevronRightIcon,
  ],
  template: \`
    <div
      scCalendar
      #cal="scCalendar"
      aria-label="Appointment"
      [(value)]="date"
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
      <div scCalendarFooter>
        <button scCalendarToday>Today</button>
        <button scCalendarClear>Clear</button>
      </div>
    </div>
    <p class="text-muted-foreground text-sm" data-testid="picked">
      {{ picked() }}
    </p>
  \`,
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class SingleCalendarDemo {
  readonly date = signal<ScCalendarValue>(
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
