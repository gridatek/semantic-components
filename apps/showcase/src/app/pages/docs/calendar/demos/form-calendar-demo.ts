import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, FormRoot, form, required } from '@angular/forms/signals';
import {
  ScButton,
  ScCalendar,
  ScCalendarHeader,
  ScCalendarNext,
  ScCalendarPrevious,
  type ScCalendarValue,
  ScField,
  ScFieldErrors,
} from '@semantic-components/ui';
import {
  SiChevronLeftIcon,
  SiChevronRightIcon,
} from '@semantic-icons/lucide-icons';

/** A [formField]: a required day, from the schema; marked once touched. */
@Component({
  selector: 'app-form-calendar-demo',
  imports: [
    FormField,
    FormRoot,
    ScCalendar,
    ScCalendarHeader,
    ScCalendarPrevious,
    ScCalendarNext,
    ScButton,
    ScField,
    ScFieldErrors,
    SiChevronLeftIcon,
    SiChevronRightIcon,
  ],
  template: `
    <form [formRoot]="bookingForm" class="grid w-fit gap-3">
      <div scField>
        <p id="booking-day" class="text-sm font-medium">Day</p>
        <div
          scCalendar
          #cal="scCalendar"
          aria-labelledby="booking-day"
          [formField]="bookingForm.day"
          class="rounded-lg border"
        >
          <div scCalendarHeader>
            <button scCalendarPrevious>
              <svg siChevronLeftIcon></svg>
              <span class="sr-only">{{ previousLabel[cal.view()] }}</span>
            </button>
            <button scCalendarNext>
              <svg siChevronRightIcon></svg>
              <span class="sr-only">{{ nextLabel[cal.view()] }}</span>
            </button>
          </div>
        </div>
        <div scFieldErrors></div>
      </div>
      <button scButton type="submit" class="justify-self-start">Book</button>
      @if (booked()) {
        <p class="text-sm" role="status">Booked: {{ booked() }}</p>
      }
    </form>
  `,
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class FormCalendarDemo {
  readonly model = signal<{ day: ScCalendarValue }>({ day: null });
  readonly booked = signal('');
  readonly bookingForm = form(
    this.model,
    (s) => required(s.day, { message: 'Pick a day.' }),
    {
      submission: {
        action: async () => {
          const day = this.model().day;
          if (day instanceof Temporal.PlainDate)
            this.booked.set(this.long(day));
        },
      },
    },
  );
  private readonly long = (date: Temporal.PlainDate) =>
    date.toLocaleString('en-US', { dateStyle: 'long' });
  readonly previousLabel = {
    day: 'Previous month',
    month: 'Previous year',
    year: 'Previous years',
  };
  readonly nextLabel = {
    day: 'Next month',
    month: 'Next year',
    year: 'Next years',
  };
}
