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
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, FormRoot, form, validate } from '@angular/forms/signals';
import {
  ScButton,
  ScCalendar,
  ScCalendarHeader,
  ScCalendarNext,
  ScCalendarPrevious,
  type ScCalendarRange,
  ScDateRangePicker,
  ScDateRangePickerTrigger,
  ScField,
  ScFieldErrors,
  ScInputButton,
  ScLabel,
  ScPopover,
  ScPopoverPortal,
  ScPopoverProvider,
  injectFormatDate,
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
    ScInputButton,
    FormField,
    FormRoot,
    ScDateRangePicker,
    ScDateRangePickerTrigger,
    ScPopoverProvider,
    ScPopoverPortal,
    ScPopover,
    ScCalendar,
    ScCalendarHeader,
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
          scDateRangePicker
          #dp="scDateRangePicker"
          [formField]="bookingForm.stay"
        >
          <div
            scPopoverProvider
            [origin]="trigger.overlayOrigin"
            alignment="start"
          >
            <button
              scInputButton
              id="stay"
              scDateRangePickerTrigger
              #trigger="scDateRangePickerTrigger"
            >
              <svg siCalendarIcon></svg>
              <span>{{
                formatDate(bookingForm.stay().value()) || 'Pick dates'
              }}</span>
            </button>
            <ng-template scPopoverPortal>
              <div scPopover class="w-auto p-0" aria-label="Choose dates">
                <div
                  scCalendar
                  initialFocus
                  aria-label="Choose dates"
                  mode="range"
                  [numberOfMonths]="2"
                  [value]="dp.draft()"
                  (valueChange)="dp.pick($event)"
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
  // The value as written: Intl's, in the user's digits — or your own format.
  private readonly formatDate = injectFormatDate();
  private readonly model = signal<{ stay: ScCalendarRange | null }>({
    stay: null,
  });
  private readonly booked = signal('');
  private readonly bookingForm = form(
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
          const stay = this.model().stay;
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
