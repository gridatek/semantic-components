import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ConstraintsCalendarNextDemo } from './constraints-calendar-next-demo';

@Component({
  selector: 'app-constraints-calendar-next-demo-container',
  imports: [DemoContainer, ConstraintsCalendarNextDemo],
  template: `
    <app-demo-container
      title="Min, max and unavailable"
      [code]="code"
      demoUrl="/demos/calendar-next/constraints-calendar-next-demo"
    >
      <app-constraints-calendar-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ConstraintsCalendarNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
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

/** minDate and maxDate — kept in the month and year views too — and unavailable days: here, weekends. They can be reached, not picked. */
@Component({
  selector: 'app-constraints-calendar-next-demo',
  imports: [
    ScCalendarNext,
    ScCalendarNextHeader,
    ScCalendarNextHeading,
    ScCalendarNextPrevious,
    ScCalendarNextNext,
    SiChevronLeftIcon,
    SiChevronRightIcon,
  ],
  template: \`
    <div
      scCalendarNext
      #cal="scCalendarNext"
      aria-label="Delivery"
      [minDate]="min"
      [maxDate]="max"
      [unavailable]="weekend"
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
    </div>
  \`,
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class ConstraintsCalendarNextDemo {
  readonly min = Temporal.PlainDate.from('2026-10-08');
  readonly max = Temporal.PlainDate.from('2026-11-20');
  readonly date = signal<ScCalendarNextValue>(null);
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
