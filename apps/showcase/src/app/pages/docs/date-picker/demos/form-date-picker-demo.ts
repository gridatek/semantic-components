import { Temporal } from '@js-temporal/polyfill';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { ScDatePicker } from '@semantic-components/ui';

@Component({
  selector: 'app-form-date-picker-demo',
  imports: [ScDatePicker],
  template: `
    <div class="grid max-w-sm gap-4">
      <div class="space-y-2">
        <label class="text-sm font-medium">Date of Birth</label>
        <sc-date-picker
          [(value)]="dob"
          placeholder="Select date of birth"
          [maxDate]="today"
        />
      </div>
      <div class="space-y-2">
        <label class="text-sm font-medium">Appointment Date</label>
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
