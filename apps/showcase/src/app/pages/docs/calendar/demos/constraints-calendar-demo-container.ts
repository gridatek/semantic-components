import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ConstraintsCalendarDemo } from './constraints-calendar-demo';

@Component({
  selector: 'app-constraints-calendar-demo-container',
  imports: [DemoContainer, ConstraintsCalendarDemo],
  template: `
    <app-demo-container
      title="Min, max and unavailable"
      [code]="code"
      demoUrl="/demos/calendar/constraints-calendar-demo"
    >
      <app-constraints-calendar-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ConstraintsCalendarDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScCalendar,
  ScCalendarHeader,
  ScCalendarHeading,
  ScCalendarNext,
  ScCalendarPrevious,
  type ScCalendarValue,
} from '@semantic-components/ui';
import {
  SiChevronLeftIcon,
  SiChevronRightIcon,
} from '@semantic-icons/lucide-icons';

/** minDate and maxDate — kept in the month and year views too — and unavailable days: here, weekends. They can be reached, not picked. */
@Component({
  selector: 'app-constraints-calendar-demo',
  imports: [
    ScCalendar,
    ScCalendarHeader,
    ScCalendarHeading,
    ScCalendarPrevious,
    ScCalendarNext,
    SiChevronLeftIcon,
    SiChevronRightIcon,
  ],
  template: \`
    <div
      scCalendar
      #cal="scCalendar"
      aria-label="Delivery"
      [minDate]="min"
      [maxDate]="max"
      [unavailable]="weekend"
      [(value)]="date"
      class="rounded-lg border"
    >
      <div scCalendarHeader>
        <button scCalendarPrevious>
          <svg siChevronLeftIcon></svg>
          <span class="sr-only">{{ previousLabel[cal.view()] }}</span>
        </button>
        <button scCalendarHeading>{{ cal.heading() }}</button>
        <button scCalendarNext>
          <svg siChevronRightIcon></svg>
          <span class="sr-only">{{ nextLabel[cal.view()] }}</span>
        </button>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class ConstraintsCalendarDemo {
  readonly min = Temporal.PlainDate.from('2026-10-08');
  readonly max = Temporal.PlainDate.from('2026-11-20');
  readonly date = signal<ScCalendarValue>(null);
  /** Saturdays and Sundays. */
  readonly weekend = (date: Temporal.PlainDate) => date.dayOfWeek > 5;
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
