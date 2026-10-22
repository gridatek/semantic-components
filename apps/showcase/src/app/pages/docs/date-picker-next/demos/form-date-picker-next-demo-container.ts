import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { FormDatePickerNextDemo } from './form-date-picker-next-demo';

@Component({
  selector: 'app-form-date-picker-next-demo-container',
  imports: [DemoContainer, FormDatePickerNextDemo],
  template: `
    <app-demo-container
      title="In a form"
      [code]="code"
      demoUrl="/demos/date-picker-next/form-date-picker-next-demo"
    >
      <app-form-date-picker-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class FormDatePickerNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, FormRoot, form, required } from '@angular/forms/signals';
import {
  ScButton,
  ScCalendar,
  ScCalendarHeader,
  ScCalendarHeading,
  ScCalendarNext,
  ScCalendarPrevious,
  type ScCalendarValue,
  ScDatePickerNext,
  ScDatePickerNextTrigger,
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

/** A [formField]: required, from the schema; marked once the calendar has closed — the trigger, then its field. */
@Component({
  selector: 'app-form-date-picker-next-demo',
  imports: [
    FormField,
    FormRoot,
    ScDatePickerNext,
    ScDatePickerNextTrigger,
    ScPopoverProvider,
    ScPopoverPortal,
    ScPopover,
    ScCalendar,
    ScCalendarHeader,
    ScCalendarHeading,
    ScCalendarPrevious,
    ScCalendarNext,
    ScButton,
    ScField,
    ScFieldErrors,
    ScLabel,
    SiCalendarIcon,
    SiChevronLeftIcon,
    SiChevronRightIcon,
  ],
  template: \`
    <form [formRoot]="bookingForm" class="grid w-64 gap-3">
      <div scField>
        <label scLabel for="arrival">Arrival</label>
        <div
          scDatePickerNext
          #dp="scDatePickerNext"
          [formField]="bookingForm.arrival"
        >
          <div scPopoverProvider [origin]="trigger.overlayOrigin" align="start">
            <button
              id="arrival"
              scDatePickerNextTrigger
              #trigger="scDatePickerNextTrigger"
            >
              <svg siCalendarIcon></svg>
              <span>{{ dp.text() || 'Pick a date' }}</span>
            </button>
            <ng-template scPopoverPortal>
              <div scPopover class="w-auto p-0" aria-label="Choose a date">
                <div
                  scCalendar
                  #cal="scCalendar"
                  initialFocus
                  aria-label="Choose a date"
                  [mode]="dp.mode()"
                  [value]="dp.value()"
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
        <p class="text-sm" role="status">Booked from {{ booked() }}.</p>
      }
    </form>
  \`,
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class FormDatePickerNextDemo {
  readonly model = signal<{ arrival: ScCalendarValue }>({ arrival: null });
  readonly booked = signal('');
  readonly bookingForm = form(
    this.model,
    (s) => required(s.arrival, { message: 'Pick your arrival.' }),
    {
      submission: {
        action: async () => {
          const day = this.model().arrival;
          if (day instanceof Temporal.PlainDate) {
            this.booked.set(day.toLocaleString('en-US', { dateStyle: 'long' }));
          }
        },
      },
    },
  );
}`;
}
