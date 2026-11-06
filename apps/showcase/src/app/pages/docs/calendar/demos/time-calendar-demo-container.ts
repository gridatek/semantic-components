import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { TimeCalendarDemo } from './time-calendar-demo';

@Component({
  selector: 'app-time-calendar-demo-container',
  imports: [DemoContainer, TimeCalendarDemo],
  template: `
    <app-demo-container
      title="Time"
      demoUrl="/demos/calendar/time-calendar-demo"
      [code]="code"
    >
      <app-time-calendar-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class TimeCalendarDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScCalendar,
  ScCalendarHeader,
  ScCalendarNext,
  ScCalendarPrevious,
  type ScCalendarValue,
  ScCard,
  ScCardContent,
  ScCardFooter,
  ScField,
  ScFieldGroup,
  ScInput,
  ScLabel,
} from '@semantic-components/ui';
import {
  SiChevronLeftIcon,
  SiChevronRightIcon,
} from '@semantic-icons/lucide-icons';

/** A day and a time: the calendar, then time fields in the card’s footer. */
@Component({
  selector: 'app-time-calendar-demo',
  imports: [
    ScCalendar,
    ScCalendarHeader,
    ScCalendarNext,
    ScCalendarPrevious,
    ScCard,
    ScCardContent,
    ScCardFooter,
    ScField,
    ScFieldGroup,
    ScInput,
    ScLabel,
    SiChevronLeftIcon,
    SiChevronRightIcon,
  ],
  template: \`
    <div scCard class="w-fit">
      <div scCardContent>
        <div
          scCalendar
          #cal="scCalendar"
          aria-label="Meeting day"
          [(value)]="date"
          class="p-0"
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
      </div>
      <div scCardFooter class="bg-card border-t">
        <div scFieldGroup>
          <div scField>
            <label scLabel>Start time</label>
            <input scInput type="time" step="1" value="10:30:00" />
          </div>
          <div scField>
            <label scLabel>End time</label>
            <input scInput type="time" step="1" value="12:30:00" />
          </div>
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class TimeCalendarDemo {
  readonly date = signal<ScCalendarValue>(
    Temporal.PlainDate.from('2026-10-12'),
  );
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
