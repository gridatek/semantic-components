import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScCalendar,
  ScCalendarHeader,
  ScCalendarNext,
  ScCalendarPrevious,
  type ScCalendarValue,
  ScDateInput,
  ScDatePicker,
  ScDatePickerTrigger,
  ScInputGroup,
  ScInputGroupAddon,
  ScPopover,
  ScPopoverPortal,
  ScPopoverProvider,
} from '@semantic-components/ui';
import {
  SiCalendarIcon,
  SiChevronLeftIcon,
  SiChevronRightIcon,
} from '@semantic-icons/lucide-icons';

/** minDate, maxDate and unavailable days on the picker — given to its calendar, and kept for typed days too: weekends cannot be picked. */
@Component({
  selector: 'app-constraints-date-picker-demo',
  imports: [
    ScInputGroup,
    ScInputGroupAddon,
    ScDatePicker,
    ScDatePickerTrigger,
    ScPopoverProvider,
    ScPopoverPortal,
    ScPopover,
    ScCalendar,
    ScCalendarHeader,
    ScCalendarPrevious,
    ScCalendarNext,
    ScDateInput,
    SiCalendarIcon,
    SiChevronLeftIcon,
    SiChevronRightIcon,
  ],
  template: `
    <div
      scDatePicker
      #dp="scDatePicker"
      [minDate]="min"
      [maxDate]="max"
      [unavailable]="weekend"
      [(value)]="date"
      class="w-64"
    >
      <div scPopoverProvider [origin]="trigger.overlayOrigin" align="end">
        <div scInputGroup>
          <input
            scDateInput
            aria-label="Delivery date"
            placeholder="MM/DD/YYYY"
          />
          <div scInputGroupAddon align="inline-end">
            <button scDatePickerTrigger #trigger="scDatePickerTrigger">
              <svg siCalendarIcon></svg>
              <span class="sr-only">Choose a delivery date</span>
            </button>
          </div>
        </div>
        <ng-template scPopoverPortal>
          <div scPopover class="w-auto p-0" aria-label="Choose a date">
            <div
              scCalendar
              initialFocus
              aria-label="Choose a date"
              [mode]="dp.mode()"
              [value]="dp.draft()"
              (valueChange)="dp.pick($event)"
              [minDate]="dp.minDate()"
              [maxDate]="dp.maxDate()"
              [unavailable]="dp.unavailable()"
            >
              <div scCalendarHeader>
                <button scCalendarPrevious>
                  <svg siChevronLeftIcon></svg>
                  <span class="sr-only">Previous month</span>
                </button>
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
export class ConstraintsDatePickerDemo {
  readonly min = Temporal.PlainDate.from('2026-10-08');
  readonly max = Temporal.PlainDate.from('2026-11-20');
  readonly date = signal<ScCalendarValue>(null);
  /** Saturdays and Sundays. */
  readonly weekend = (date: Temporal.PlainDate) => date.dayOfWeek > 5;
}
