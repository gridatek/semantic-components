import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScCalendar,
  ScCalendarHeader,
  ScCalendarHeading,
  ScCalendarNext,
  ScCalendarPrevious,
  type ScCalendarValue,
  ScDatePicker,
  ScDatePickerInput,
  ScDatePickerTrigger,
  ScInputGroup,
  ScInputGroupAddon,
  ScLabelText,
  ScPopover,
  ScPopoverPortal,
  ScPopoverProvider,
} from '@semantic-components/ui';
import {
  SiCalendarIcon,
  SiChevronLeftIcon,
  SiChevronRightIcon,
} from '@semantic-icons/lucide-icons';

/** Each end typed — part="start" and part="end" in one input group: the locale’s numeric order or ISO; an end before the start is marked. The button in the field opens the calendar. */
@Component({
  selector: 'app-typed-date-range-picker-demo',
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
    ScDatePickerInput,
    ScInputGroup,
    ScInputGroupAddon,
    ScLabelText,
    SiCalendarIcon,
    SiChevronLeftIcon,
    SiChevronRightIcon,
  ],
  template: `
    <div class="grid w-80 gap-2">
      <p scLabelText id="stay-label">Stay</p>
      <div scDatePicker #dp="scDatePicker" mode="range" [(value)]="range">
        <div scPopoverProvider [origin]="trigger.overlayOrigin" align="end">
          <div scInputGroup aria-labelledby="stay-label">
            <input
              scDatePickerInput
              part="start"
              aria-label="Check-in"
              placeholder="MM/DD/YYYY"
            />
            <span aria-hidden="true" class="text-muted-foreground">–</span>
            <input
              scDatePickerInput
              part="end"
              aria-label="Check-out"
              placeholder="MM/DD/YYYY"
            />
            <div scInputGroupAddon align="inline-end">
              <button scDatePickerTrigger #trigger="scDatePickerTrigger">
                <svg siCalendarIcon></svg>
                <span class="sr-only">Choose dates</span>
              </button>
            </div>
          </div>
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
    </div>
    <p class="text-muted-foreground text-sm" data-testid="picked">
      {{ dp.text() || 'Nothing picked.' }}
    </p>
  `,
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class TypedDateRangePickerDemo {
  readonly range = signal<ScCalendarValue>({
    from: Temporal.PlainDate.from('2026-10-14'),
    to: Temporal.PlainDate.from('2026-10-18'),
  });
}
