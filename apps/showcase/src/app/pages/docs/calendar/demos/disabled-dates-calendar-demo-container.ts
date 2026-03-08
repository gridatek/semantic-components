import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DisabledDatesCalendarDemo } from './disabled-dates-calendar-demo';

@Component({
  selector: 'app-disabled-dates-calendar-demo-container',
  imports: [DemoContainer, DisabledDatesCalendarDemo],
  template: `
    <app-demo-container
      title="With Disabled Dates"
      description="Weekends are disabled."
      demoUrl="/demos/calendar/disabled-dates-calendar-demo"
      [code]="code"
    >
      <app-disabled-dates-calendar-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledDatesCalendarDemoContainer {
  readonly code = `import { Temporal } from '@js-temporal/polyfill';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import {
  ScCalendar,
  ScCalendarHeader,
  ScCalendarHeading,
  ScCalendarNext,
  ScCalendarPrevious,
} from '@semantic-components/ui';
import {
  SiChevronLeftIcon,
  SiChevronRightIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-disabled-dates-calendar-demo',
  imports: [
    ScCalendar,
    ScCalendarHeader,
    ScCalendarHeading,
    ScCalendarNext,
    ScCalendarPrevious,
    SiChevronLeftIcon,
    SiChevronRightIcon,
  ],
  template: \`
    <div class="space-y-4">
      <div class="w-fit rounded-md border">
        <div
          scCalendar
          [(value)]="selectedDate"
          [disabled]="disabledDates()"
          #cal="scCalendar"
        >
          <div scCalendarHeader>
            <button scCalendarPrevious>
              <svg siChevronLeftIcon class="size-4"></svg>
              <span class="sr-only">
                @switch (cal.viewMode()) {
                  @case ('day') {
                    Go to previous month
                  }
                  @case ('month') {
                    Go to previous year
                  }
                  @case ('year') {
                    Go to previous decade
                  }
                }
              </span>
            </button>
            <button scCalendarHeading>{{ cal.heading() }}</button>
            <button scCalendarNext>
              <svg siChevronRightIcon class="size-4"></svg>
              <span class="sr-only">
                @switch (cal.viewMode()) {
                  @case ('day') {
                    Go to next month
                  }
                  @case ('month') {
                    Go to next year
                  }
                  @case ('year') {
                    Go to next decade
                  }
                }
              </span>
            </button>
          </div>
        </div>
      </div>

      <div class="space-y-2">
        <div class="bg-muted/50 rounded-md border p-4">
          <p class="mb-2 text-sm font-medium">Configuration</p>
          <p class="text-muted-foreground text-xs">
            Weekends (Saturday & Sunday) are disabled for the current and next
            month.
          </p>
        </div>

        @if (selectedDate(); as date) {
          <div
            class="bg-muted/50 flex items-center justify-between rounded-md border p-4"
          >
            <div>
              <p class="text-sm font-medium">Selected Date</p>
              <p class="text-muted-foreground text-sm">
                {{
                  date.toLocaleString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })
                }}
              </p>
            </div>
            <button
              type="button"
              class="hover:bg-accent rounded-md border px-3 py-1 text-sm"
              (click)="clearSelection()"
            >
              Clear
            </button>
          </div>
        } @else {
          <p
            class="text-muted-foreground rounded-md border p-4 text-center text-sm"
          >
            No date selected. Weekends are disabled.
          </p>
        }
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledDatesCalendarDemo {
  readonly selectedDate = signal<Temporal.PlainDate | undefined>(undefined);
  readonly disabledDates = signal<Temporal.PlainDate[]>(this.getWeekendDates());

  clearSelection(): void {
    this.selectedDate.set(undefined);
  }

  private getWeekendDates(): Temporal.PlainDate[] {
    const weekends: Temporal.PlainDate[] = [];
    const today = Temporal.Now.plainDateISO();
    const start = today.with({ day: 1 });
    const nextMonth = start.add({ months: 1 });
    const end = nextMonth.with({ day: nextMonth.daysInMonth });

    let current = start;
    while (Temporal.PlainDate.compare(current, end) <= 0) {
      if (current.dayOfWeek === 6 || current.dayOfWeek === 7) {
        weekends.push(current);
      }
      current = current.add({ days: 1 });
    }
    return weekends;
  }
}`;
}
