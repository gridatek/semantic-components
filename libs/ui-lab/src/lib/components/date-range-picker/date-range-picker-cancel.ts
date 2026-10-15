import { Directive, inject } from '@angular/core';
import { ScDateRangePicker } from './date-range-picker';

/** Closes the popover without the new range. On a button of yours: write its text. */
@Directive({
  selector: 'button[scDateRangePickerCancel]',
  host: {
    type: 'button',
    'data-slot': 'date-range-picker-cancel',
    '(click)': 'picker.onCancel()',
  },
})
export class ScDateRangePickerCancel {
  protected readonly picker = inject(ScDateRangePicker);
}
