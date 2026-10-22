import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScCalendar,
  ScCalendarHeader,
  ScCalendarHeading,
  ScCalendarNext,
  ScCalendarPrevious,
  type ScCalendarValue,
  ScDatePicker,
  ScDatePickerTrigger,
  ScPopover,
  ScPopoverPortal,
  ScPopoverProvider,
} from '@semantic-components/ui';
import {
  SiCalendarIcon,
  SiChevronLeftIcon,
  SiChevronRightIcon,
} from '@semantic-icons/lucide-icons';

/** minDate and maxDate on the picker and its calendar: from today, up to 90 days ahead. */
@Component({
  selector: 'app-constraints-date-range-picker-next-demo',
  imports: [
    ScDatePicker,
    ScDatePickerTrigger,
    ScPopoverProvider,
    ScPopoverPortal,
    ScPopover,
    ScCalendar,
    ScCalendarHeader,
    ScCalendarHeading,
    ScCalendarPrevious,
    ScCalendarNext,
    SiCalendarIcon,
    SiChevronLeftIcon,
    SiChevronRightIcon,
  ],
  template: `
    <div
      scDatePicker
      #dp="scDatePicker"
      mode="range"
      [minDate]="today"
      [maxDate]="latest"
      [(value)]="range"
      class="w-fit"
    >
      <div scPopoverProvider [origin]="trigger.overlayOrigin" align="start">
        <button scDatePickerTrigger #trigger="scDatePickerTrigger">
          <svg siCalendarIcon></svg>
          <span>{{ dp.text() || 'Pick dates' }}</span>
        </button>
        <ng-template scPopoverPortal>
          <div scPopover class="w-auto p-0" aria-label="Choose dates">
            <div
              scCalendar
              #cal="scCalendar"
              initialFocus
              aria-label="Choose dates"
              [mode]="dp.mode()"
              [numberOfMonths]="2"
              [value]="dp.draft()"
              (valueChange)="dp.pick($event)"
              [minDate]="today"
              [maxDate]="latest"
            >
              <div scCalendarHeader>
                <button scCalendarPrevious>
                  <svg siChevronLeftIcon></svg>
                  <span class="sr-only">Previous month</span>
                </button>
                <button scCalendarHeading>{{ cal.heading() }}</button>
                <button scCalendarNext>
                  <svg siChevronRightIcon></svg>
                  <span class="sr-only">Next month</span>
                </button>
              </div>
            </div>
          </div>
        </ng-template>
      </div>
    </div>
    <p class="text-muted-foreground text-sm" data-testid="picked">
      {{ dp.text() || 'Nothing picked.' }}
    </p>
  `,
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class ConstraintsDateRangePickerNextDemo {
  readonly range = signal<ScCalendarValue>(null);
  readonly today = Temporal.Now.plainDateISO();
  readonly latest = this.today.add({ days: 90 });
}
