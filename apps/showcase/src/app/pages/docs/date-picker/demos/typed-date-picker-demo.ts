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
  ScField,
  ScFieldDescription,
  ScInputGroup,
  ScInputGroupAddon,
  ScLabel,
  ScPopover,
  ScPopoverPortal,
  ScPopoverProvider,
} from '@semantic-components/ui';
import {
  SiCalendarIcon,
  SiChevronLeftIcon,
  SiChevronRightIcon,
} from '@semantic-icons/lucide-icons';

/** Typed, or picked: the locale’s numeric order (here 10/14/2026) or ISO, read on Enter or leaving; text that is not a day stays, marked. The button in the field opens the calendar. */
@Component({
  selector: 'app-typed-date-picker-demo',
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
    ScCalendarHeading,
    ScCalendarPrevious,
    ScCalendarNext,
    ScDatePickerInput,
    ScField,
    ScFieldDescription,
    ScLabel,
    SiCalendarIcon,
    SiChevronLeftIcon,
    SiChevronRightIcon,
  ],
  template: `
    <div scField class="w-64">
      <label scLabel>Start date</label>
      <div scDatePicker #dp="scDatePicker" [(value)]="date">
        <div scPopoverProvider [origin]="trigger.overlayOrigin" align="end">
          <div scInputGroup>
            <input scDatePickerInput placeholder="MM/DD/YYYY" />
            <div scInputGroupAddon align="inline-end">
              <button scDatePickerTrigger #trigger="scDatePickerTrigger">
                <svg siCalendarIcon></svg>
                <span class="sr-only">Choose a date</span>
              </button>
            </div>
          </div>
          <ng-template scPopoverPortal>
            <div scPopover class="w-auto p-0" aria-label="Choose a date">
              <div
                scCalendar
                #cal="scCalendar"
                initialFocus
                aria-label="Choose a date"
                [mode]="dp.mode()"
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
      <p scFieldDescription>Month, day, year.</p>
    </div>
    <p class="text-muted-foreground text-sm" data-testid="picked">
      {{ dp.text() || 'Nothing picked.' }}
    </p>
  `,
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class TypedDatePickerDemo {
  readonly date = signal<ScCalendarValue>(
    Temporal.PlainDate.from('2026-10-14'),
  );
}
