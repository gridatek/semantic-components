import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, FormRoot, form, required } from '@angular/forms/signals';
import {
  ScButton,
  ScCalendar,
  ScCalendarHeader,
  ScCalendarNext,
  ScCalendarPrevious,
  ScDateTimeInput,
  ScDateTimePicker,
  ScDateTimePickerTrigger,
  ScField,
  ScFieldErrors,
  ScInputGroup,
  ScInputGroupAddon,
  ScLabel,
  ScPopover,
  ScPopoverPortal,
  ScPopoverProvider,
  ScTimePickerColumns,
} from '@semantic-components/ui';
import {
  SiCalendarClockIcon,
  SiChevronLeftIcon,
  SiChevronRightIcon,
} from '@semantic-icons/lucide-icons';

/** A [formField] on the date-time input: required, from the schema — its message under it once the popover closes. */
@Component({
  selector: 'app-form-date-time-picker-demo',
  imports: [
    CdkOverlayOrigin,
    FormField,
    FormRoot,
    ScCalendar,
    ScCalendarHeader,
    ScCalendarNext,
    ScCalendarPrevious,
    ScDateTimeInput,
    ScDateTimePicker,
    ScDateTimePickerTrigger,
    ScField,
    ScInputGroup,
    ScInputGroupAddon,
    ScLabel,
    ScPopover,
    ScPopoverPortal,
    ScPopoverProvider,
    ScTimePickerColumns,
    ScButton,
    ScFieldErrors,
    SiCalendarClockIcon,
    SiChevronLeftIcon,
    SiChevronRightIcon,
  ],
  template: `
    <form [formRoot]="tripForm" class="grid w-64 gap-3">
      <div scField class="w-full">
        <label scLabel>Departure</label>
        <div scDateTimePicker #dtp="scDateTimePicker">
          <div scPopoverProvider [origin]="anchor" alignment="start">
            <div scInputGroup cdkOverlayOrigin #anchor="cdkOverlayOrigin">
              <div scDateTimeInput [formField]="tripForm.departure"></div>
              <div scInputGroupAddon side="inline-end">
                <button scDateTimePickerTrigger>
                  <svg siCalendarClockIcon></svg>
                  <span class="sr-only">Choose a date and time</span>
                </button>
              </div>
            </div>
            <ng-template scPopoverPortal>
              <div
                scPopover
                class="w-auto flex-row gap-0 p-0"
                aria-label="Choose a date and time"
              >
                <div
                  scCalendar
                  initialFocus
                  aria-label="Choose a date"
                  [value]="dtp.date()"
                  [minDate]="dtp.minDate()"
                  [maxDate]="dtp.maxDate()"
                  [unavailable]="dtp.unavailable()"
                  (valueChange)="dtp.pickDate($event)"
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
                <div
                  scTimePickerColumns
                  [initialFocus]="false"
                  class="border-s"
                ></div>
              </div>
            </ng-template>
          </div>
        </div>
        <div scFieldErrors></div>
      </div>
      <button scButton type="submit" class="justify-self-start">Book</button>
      @if (booked()) {
        <p class="text-sm" role="status">Booked for {{ booked() }}.</p>
      }
    </form>
  `,
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class FormDateTimePickerDemo {
  private readonly model = signal<{
    departure: Temporal.PlainDateTime | null;
  }>({ departure: null });
  private readonly booked = signal('');
  private readonly tripForm = form(
    this.model,
    (s) => required(s.departure, { message: 'Pick a date and time.' }),
    {
      submission: {
        action: async () =>
          this.booked.set(
            this.model().departure?.toString({ smallestUnit: 'minute' }) ?? '',
          ),
      },
    },
  );
}
