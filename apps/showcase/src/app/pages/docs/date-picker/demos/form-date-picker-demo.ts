import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { Temporal } from '@js-temporal/polyfill';
import { ScDatePicker } from '@semantic-components/ui';

@Component({
  selector: 'app-form-date-picker-demo',
  imports: [ScDatePicker],
  template: `
    <div class="grid gap-4 max-w-sm">
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
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormDatePickerDemo {
  readonly dob = signal<Temporal.PlainDate | undefined>(undefined);
  readonly appointment = signal<Temporal.PlainDate | undefined>(undefined);
  readonly today = Temporal.Now.plainDateISO();
}
