import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  FormField,
  FormRoot,
  form,
  required,
  validate,
} from '@angular/forms/signals';
import {
  ScButton,
  ScField,
  ScFieldDescription,
  ScFieldErrors,
  ScLabel,
  ScTimeInput,
} from '@semantic-components/ui';

/** A [formField]: required, the opening hours and a 15-minute rule from the schema, their messages under it once left. */
@Component({
  selector: 'app-form-time-input-demo',
  imports: [
    FormField,
    FormRoot,
    ScButton,
    ScField,
    ScFieldDescription,
    ScFieldErrors,
    ScLabel,
    ScTimeInput,
  ],
  template: `
    <form [formRoot]="bookingForm" class="grid w-56 gap-3">
      <div scField>
        <label scLabel>Appointment time</label>
        <div scTimeInput [formField]="bookingForm.time"></div>
        <p scFieldDescription>9:00 AM to 5:00 PM, every 15 minutes.</p>
        <div scFieldErrors></div>
      </div>
      <button scButton type="submit" class="justify-self-start">Book</button>
      @if (booked()) {
        <p class="text-sm" role="status">Booked for {{ booked() }}.</p>
      }
    </form>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class FormTimeInputDemo {
  private readonly model = signal<{ time: Temporal.PlainTime | null }>({
    time: null,
  });
  private readonly booked = signal('');
  private readonly bookingForm = form(
    this.model,
    (s) => {
      required(s.time, { message: 'Pick a time.' });
      validate(s.time, ({ value }) => {
        const time = value();
        if (!time) return null;
        const closing = Temporal.PlainTime.from('17:00');
        if (time.hour < 9 || Temporal.PlainTime.compare(time, closing) > 0)
          return { kind: 'hours', message: 'We are open 9:00 AM to 5:00 PM.' };
        return time.minute % 15
          ? { kind: 'quarter', message: 'Appointments start every 15 minutes.' }
          : null;
      });
    },
    {
      submission: {
        action: async () =>
          this.booked.set(
            this.model().time?.toString({ smallestUnit: 'minute' }) ?? '',
          ),
      },
    },
  );
}
