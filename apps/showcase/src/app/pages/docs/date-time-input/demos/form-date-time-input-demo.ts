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
  ScDateTimeInput,
  ScField,
  ScFieldDescription,
  ScFieldErrors,
  ScLabel,
} from '@semantic-components/ui';

/** A [formField]: required and not in the past, from the schema — their messages under it once left. */
@Component({
  selector: 'app-form-date-time-input-demo',
  imports: [
    FormField,
    FormRoot,
    ScButton,
    ScDateTimeInput,
    ScField,
    ScFieldDescription,
    ScFieldErrors,
    ScLabel,
  ],
  template: `
    <form [formRoot]="callForm" class="grid w-64 gap-3">
      <div scField>
        <label scLabel>Call</label>
        <div scDateTimeInput [formField]="callForm.at"></div>
        <p scFieldDescription>From now on.</p>
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
export class FormDateTimeInputDemo {
  private readonly model = signal<{ at: Temporal.PlainDateTime | null }>({
    at: null,
  });
  private readonly booked = signal('');
  private readonly callForm = form(
    this.model,
    (s) => {
      required(s.at, { message: 'Pick a date and time.' });
      validate(s.at, ({ value }) => {
        const at = value();
        return at &&
          Temporal.PlainDateTime.compare(at, Temporal.Now.plainDateTimeISO()) <
            0
          ? { kind: 'past', message: 'Pick a time from now on.' }
          : null;
      });
    },
    {
      submission: {
        action: async () =>
          this.booked.set(
            this.model().at?.toString({ smallestUnit: 'minute' }) ?? '',
          ),
      },
    },
  );
}
