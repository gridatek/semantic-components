import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScDateRangePicker } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-disabled-date-range-picker-demo',
  imports: [ScDateRangePicker],
  template: `
    <scDateRangePicker [disabled]="true" placeholder="Disabled" />
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledDateRangePickerDemo {}
