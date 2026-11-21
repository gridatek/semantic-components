import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { FormDateInputNextDemo } from './form-date-input-next-demo';

@Component({
  selector: 'app-form-date-input-next-demo-container',
  imports: [DemoContainer, FormDateInputNextDemo],
  template: `
    <app-demo-container
      title="Form"
      [code]="code"
      demoUrl="/demos/date-input-next/form-date-input-next-demo"
    >
      <app-form-date-input-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class FormDateInputNextDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  FormField,
  FormRoot,
  form,
  required,
  validate,
} from '@angular/forms/signals';
import {
  ScButton,
  ScDateInputNext,
  ScField,
  ScFieldDescription,
  ScFieldErrors,
  ScLabel,
} from '@semantic-components/ui';

/** A [formField]: required and not in the past, from the schema — their messages under it once left. */
@Component({
  selector: 'app-form-date-input-next-demo',
  imports: [
    FormField,
    FormRoot,
    ScButton,
    ScDateInputNext,
    ScField,
    ScFieldDescription,
    ScFieldErrors,
    ScLabel,
  ],
  template: \`
    <form [formRoot]="bookingForm" class="grid w-56 gap-3">
      <div scField>
        <label scLabel>Date</label>
        <div scDateInputNext [formField]="bookingForm.date"></div>
        <p scFieldDescription>From today on.</p>
        <div scFieldErrors></div>
      </div>
      <button scButton type="submit" class="justify-self-start">Book</button>
      @if (booked()) {
        <p class="text-sm" role="status">Booked for {{ booked() }}.</p>
      }
    </form>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class FormDateInputNextDemo {
  private readonly model = signal<{ date: Temporal.PlainDate | null }>({
    date: null,
  });
  private readonly booked = signal('');
  private readonly bookingForm = form(
    this.model,
    (s) => {
      required(s.date, { message: 'Pick a date.' });
      validate(s.date, ({ value }) => {
        const date = value();
        return date &&
          Temporal.PlainDate.compare(date, Temporal.Now.plainDateISO()) < 0
          ? { kind: 'past', message: 'Pick a day from today on.' }
          : null;
      });
    },
    {
      submission: {
        action: async () =>
          this.booked.set(this.model().date?.toString() ?? ''),
      },
    },
  );
}`;
}
