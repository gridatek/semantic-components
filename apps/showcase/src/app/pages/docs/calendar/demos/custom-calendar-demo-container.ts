import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { CustomCalendarDemo } from './custom-calendar-demo';

@Component({
  selector: 'app-custom-calendar-demo-container',
  imports: [DemoContainer, CustomCalendarDemo],
  template: `
    <app-demo-container
      title="Custom days"
      [code]="code"
      demoUrl="/demos/calendar/custom-calendar-demo"
    >
      <app-custom-calendar-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class CustomCalendarDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScCalendar,
  ScCalendarDay,
  ScCalendarHeader,
  ScCalendarNext,
  ScCalendarPrevious,
  type ScCalendarValue,
} from '@semantic-components/ui';
import {
  SiChevronLeftIcon,
  SiChevronRightIcon,
} from '@semantic-icons/lucide-icons';

/** Your content under a day’s number, from ng-template scCalendarDay — here, a dot for days with events, said in words for screen readers. */
@Component({
  selector: 'app-custom-calendar-demo',
  imports: [
    ScCalendar,
    ScCalendarHeader,
    ScCalendarPrevious,
    ScCalendarNext,
    ScCalendarDay,
    SiChevronLeftIcon,
    SiChevronRightIcon,
  ],
  template: \`
    <div
      scCalendar
      #cal="scCalendar"
      aria-label="Events"
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
      <ng-template scCalendarDay let-day>
        @if (events[day.toString()]; as count) {
          <span
            class="absolute bottom-1 size-1 rounded-full bg-current"
            aria-hidden="true"
          ></span>
          <span class="sr-only">, {{ count }} events</span>
        }
      </ng-template>
    </div>
  \`,
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class CustomCalendarDemo {
  readonly date = signal<ScCalendarValue>(
    Temporal.PlainDate.from('2026-10-14'),
  );
  readonly events: Record<string, number> = {
    '2026-10-06': 2,
    '2026-10-14': 1,
    '2026-10-22': 3,
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
}`;
}
