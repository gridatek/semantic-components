import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { CustomCalendarNextDemo } from './custom-calendar-next-demo';

@Component({
  selector: 'app-custom-calendar-next-demo-container',
  imports: [DemoContainer, CustomCalendarNextDemo],
  template: `
    <app-demo-container
      title="Custom days"
      [code]="code"
      demoUrl="/demos/calendar-next/custom-calendar-next-demo"
    >
      <app-custom-calendar-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class CustomCalendarNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScCalendarNext,
  ScCalendarNextDay,
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

/** Your content under a day’s number, from ng-template scCalendarNextDay — here, a dot for days with events, said in words for screen readers. */
@Component({
  selector: 'app-custom-calendar-next-demo',
  imports: [
    ScCalendarNext,
    ScCalendarNextHeader,
    ScCalendarNextHeading,
    ScCalendarNextPrevious,
    ScCalendarNextNext,
    ScCalendarNextDay,
    SiChevronLeftIcon,
    SiChevronRightIcon,
  ],
  template: \`
    <div
      scCalendarNext
      #cal="scCalendarNext"
      aria-label="Events"
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
      <ng-template scCalendarNextDay let-day>
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
export class CustomCalendarNextDemo {
  readonly date = signal<ScCalendarNextValue>(
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
