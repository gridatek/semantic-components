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
  ScDatePicker,
  ScDatePickerTrigger,
  ScField,
  ScFieldGroup,
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

@Component({
  selector: 'app-form-date-picker-demo',
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
    ScField,
    ScFieldGroup,
    ScLabel,
    SiCalendarIcon,
    SiChevronLeftIcon,
    SiChevronRightIcon,
  ],
  template: `
    <div scFieldGroup class="max-w-sm">
      <div scField>
        <label scLabel>Date of Birth</label>
        <div
          scDatePicker
          [(value)]="dob"
          placeholder="Select date of birth"
          #dpDob="scDatePicker"
        >
          <div
            scPopoverProvider
            [origin]="triggerDob.overlayOrigin"
            align="start"
          >
            <button scDatePickerTrigger #triggerDob="scDatePickerTrigger">
              <svg siCalendarIcon class="mr-2 size-4"></svg>
              <span
                [class]="dpDob.displayText() ? '' : 'text-muted-foreground'"
              >
                {{ dpDob.displayText() || dpDob.placeholder() }}
              </span>
            </button>
            <ng-template scPopoverPortal>
              <div scPopover class="w-auto p-0">
                <div
                  scCalendar
                  [value]="dpDob.value()"
                  [maxDate]="today"
                  (valueChange)="dpDob.onValueChange($event)"
                  #calDob="scCalendar"
                >
                  <div scCalendarHeader>
                    <button scCalendarPrevious>
                      <svg siChevronLeftIcon class="size-4"></svg>
                      <span class="sr-only">
                        @switch (calDob.viewMode()) {
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
                    <button scCalendarHeading>{{ calDob.heading() }}</button>
                    <button scCalendarNext>
                      <svg siChevronRightIcon class="size-4"></svg>
                      <span class="sr-only">
                        @switch (calDob.viewMode()) {
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
            </ng-template>
          </div>
        </div>
      </div>
      <div scField>
        <label scLabel>Appointment Date</label>
        <div
          scDatePicker
          [(value)]="appointment"
          placeholder="Select appointment"
          #dpAppt="scDatePicker"
        >
          <div
            scPopoverProvider
            [origin]="triggerAppt.overlayOrigin"
            align="start"
          >
            <button scDatePickerTrigger #triggerAppt="scDatePickerTrigger">
              <svg siCalendarIcon class="mr-2 size-4"></svg>
              <span
                [class]="dpAppt.displayText() ? '' : 'text-muted-foreground'"
              >
                {{ dpAppt.displayText() || dpAppt.placeholder() }}
              </span>
            </button>
            <ng-template scPopoverPortal>
              <div scPopover class="w-auto p-0">
                <div
                  scCalendar
                  [value]="dpAppt.value()"
                  [minDate]="today"
                  (valueChange)="dpAppt.onValueChange($event)"
                  #calAppt="scCalendar"
                >
                  <div scCalendarHeader>
                    <button scCalendarPrevious>
                      <svg siChevronLeftIcon class="size-4"></svg>
                      <span class="sr-only">
                        @switch (calAppt.viewMode()) {
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
                    <button scCalendarHeading>{{ calAppt.heading() }}</button>
                    <button scCalendarNext>
                      <svg siChevronRightIcon class="size-4"></svg>
                      <span class="sr-only">
                        @switch (calAppt.viewMode()) {
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
            </ng-template>
          </div>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormDatePickerDemo {
  readonly dob = signal<Temporal.PlainDate | undefined>(undefined);
  readonly appointment = signal<Temporal.PlainDate | undefined>(undefined);
  readonly today = Temporal.Now.plainDateISO();
}
