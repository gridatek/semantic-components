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
    <p class="text-sm text-muted-foreground mb-4">
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
  readonly minDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  readonly maxDate = new Date();
}
