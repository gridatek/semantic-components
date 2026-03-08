import { Temporal } from '@js-temporal/polyfill';
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
  selector: 'app-single-date-calendar-demo',
  imports: [
    ScCalendar,
    ScCalendarHeader,
    ScCalendarHeading,
    ScCalendarNext,
    ScCalendarPrevious,
    SiChevronLeftIcon,
    SiChevronRightIcon,
  ],
  template: `
    <div class="space-y-4">
      <div class="w-fit rounded-md border">
        <sc-calendar [(value)]="selectedDate" #cal="scCalendar">
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
        </sc-calendar>
      </div>

      <div class="space-y-2">
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
            No date selected
          </p>
        }
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SingleDateCalendarDemo {
  readonly selectedDate = signal<Temporal.PlainDate | undefined>(undefined);

  clearSelection(): void {
    this.selectedDate.set(undefined);
  }
}
