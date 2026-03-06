import { Temporal } from '@js-temporal/polyfill';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import {
  ScDatePicker,
  ScField,
  ScFieldGroup,
  ScLabel,
} from '@semantic-components/ui';

@Component({
  selector: 'app-form-date-picker-demo',
  imports: [ScDatePicker, ScField, ScFieldGroup, ScLabel],
  template: `
    <div scFieldGroup class="max-w-sm">
      <div scField>
        <label scLabel>Date of Birth</label>
        <sc-date-picker
          [(value)]="dob"
          placeholder="Select date of birth"
          [maxDate]="today"
        />
      </div>
      <div scField>
        <label scLabel>Appointment Date</label>
        <sc-date-picker
          [(value)]="appointment"
          placeholder="Select appointment"
          [minDate]="today"
        />
      </div>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormDatePickerDemo {
  readonly dob = signal<Temporal.PlainDate | undefined>(undefined);
  readonly appointment = signal<Temporal.PlainDate | undefined>(undefined);
  readonly today = Temporal.Now.plainDateISO();
}
