import { Temporal } from '@js-temporal/polyfill';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScDateRangePicker } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-constrained-date-range-picker-demo',
  imports: [ScDateRangePicker],
  template: `
    <p class="text-muted-foreground mb-4 text-sm">
      Restrict selection to dates within the last 30 days.
    </p>
    <sc-date-range-picker
      [minDate]="minDate"
      [maxDate]="maxDate"
      placeholder="Select within last 30 days"
    />
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConstrainedDateRangePickerDemo {
  readonly minDate = Temporal.Now.plainDateISO().subtract({ days: 30 });
  readonly maxDate = Temporal.Now.plainDateISO();
}
