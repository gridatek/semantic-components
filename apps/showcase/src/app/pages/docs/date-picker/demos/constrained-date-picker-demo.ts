import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { Temporal } from '@js-temporal/polyfill';
import { ScDatePicker } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-constrained-date-picker-demo',
  imports: [ScDatePicker],
  template: `
    <p class="text-xs text-muted-foreground mb-4">
      Only dates within the next 30 days
    </p>
    <sc-date-picker
      [(value)]="selectedDate"
      [minDate]="minDate"
      [maxDate]="maxDate"
      placeholder="Pick a date (next 30 days)"
    />
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConstrainedDatePickerDemo {
  readonly selectedDate = signal<Temporal.PlainDate | undefined>(undefined);
  readonly minDate = Temporal.Now.plainDateISO();
  readonly maxDate = Temporal.Now.plainDateISO().add({ days: 30 });
}
