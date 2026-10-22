import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { FormCalendarNextDemo } from './form-calendar-next-demo';

@Component({
  selector: 'app-form-calendar-next-demo-container',
  imports: [DemoContainer, FormCalendarNextDemo],
  template: `
    <app-demo-container
      title="In a form"
      [code]="code"
      demoUrl="/demos/calendar-next/form-calendar-next-demo"
    >
      <app-form-calendar-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class FormCalendarNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, FormRoot, form, required } from '@angular/forms/signals';
import {
  ScButton,
  ScCalendarNext,
  ScCalendarNextHeader,
  ScCalendarNextHeading,
  ScCalendarNextNext,
  ScCalendarNextPrevious,
  type ScCalendarNextValue,
  ScField,
  ScFieldErrors,
} from '@semantic-components/ui';
import {
  SiChevronLeftIcon,
  SiChevronRightIcon,
} from '@semantic-icons/lucide-icons';

/** A [formField]: a required day, from the schema; marked once touched. */
@Component({
  selector: 'app-form-calendar-next-demo',
  imports: [
    FormField,
    FormRoot,
    ScCalendarNext,
    ScCalendarNextHeader,
    ScCalendarNextHeading,
    ScCalendarNextPrevious,
    ScCalendarNextNext,
    ScButton,
    ScField,
    ScFieldErrors,
    SiChevronLeftIcon,
    SiChevronRightIcon,
  ],
  template: \`
    <form [formRoot]="bookingForm" class="grid w-fit gap-3">
      <div scField>
        <p id="booking-day" class="text-sm font-medium">Day</p>
        <div
          scCalendarNext
          #cal="scCalendarNext"
          aria-labelledby="booking-day"
          [formField]="bookingForm.day"
          class="rounded-lg border"
        >
          <div scCalendarNextHeader>
            <button scCalendarNextPrevious>
              <svg siChevronLeftIcon></svg>
              <span class="sr-only">{{ previousLabel[cal.view()] }}</span>
            </button>
            <button scCalendarNextHeading>{{ cal.heading() }}</button>
            <button scCalendarNextNext>
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
  \`,
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class FormCalendarNextDemo {
  readonly model = signal<{ day: ScCalendarNextValue }>({ day: null });
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
}`;
}
