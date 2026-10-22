import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { FormDateRangePickerDemo } from './form-date-range-picker-demo';

@Component({
  selector: 'app-form-date-range-picker-demo-container',
  imports: [DemoContainer, FormDateRangePickerDemo],
  template: `
    <app-demo-container
      title="In a form"
      [code]="code"
      demoUrl="/demos/date-range-picker/form-date-range-picker-demo"
    >
      <app-form-date-range-picker-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class FormDateRangePickerDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, FormRoot, form, validate } from '@angular/forms/signals';
import {
  ScButton,
  ScCalendar,
  ScCalendarHeader,
  ScCalendarHeading,
  ScCalendarNext,
  ScCalendarPrevious,
  type ScCalendarRange,
  type ScCalendarValue,
  ScDatePicker,
  ScDatePickerTrigger,
  ScField,
  ScFieldErrors,
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

/** A [formField]: a whole range required, by a validator in the schema; marked once the calendar has closed. */
@Component({
  selector: 'app-form-date-range-picker-demo',
  imports: [
    FormField,
    FormRoot,
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
    ScFieldErrors,
    ScLabel,
    ScButton,
    SiCalendarIcon,
    SiChevronLeftIcon,
    SiChevronRightIcon,
  ],
  template: \`
    <form [formRoot]="bookingForm" class="grid w-72 gap-3">
      <div scField>
        <label scLabel for="stay">Stay</label>
        <div
          scDatePicker
          #dp="scDatePicker"
          mode="range"
          [formField]="bookingForm.stay"
        >
          <div scPopoverProvider [origin]="trigger.overlayOrigin" align="start">
            <button
              id="stay"
              scDatePickerTrigger
              #trigger="scDatePickerTrigger"
            >
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
        <div scFieldErrors></div>
      </div>
      <button scButton type="submit" class="justify-self-start">Book</button>
      @if (booked()) {
        <p class="text-sm" role="status">Booked: {{ booked() }}.</p>
      }
    </form>
  \`,
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class FormDateRangePickerDemo {
  readonly model = signal<{ stay: ScCalendarValue }>({ stay: null });
  readonly booked = signal('');
  readonly bookingForm = form(
    this.model,
    (s) =>
      validate(s.stay, ({ value }) =>
        (value() as ScCalendarRange | null)?.to
          ? null
          : { kind: 'required', message: 'Pick your arrival and departure.' },
      ),
    {
      submission: {
        action: async () => {
          const stay = this.model().stay as ScCalendarRange | null;
          if (stay?.from && stay.to) {
            this.booked.set(
              new Intl.DateTimeFormat('en-US', {
                dateStyle: 'medium',
              }).formatRange(stay.from, stay.to),
            );
          }
        },
      },
    },
  );
}`;
}
