import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScDateRangePicker } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-no-clear-date-range-picker-demo',
  imports: [ScDateRangePicker],
  template: `
    <sc-date-range-picker [showClear]="false" placeholder="No clear button" />
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoClearDateRangePickerDemo {}
