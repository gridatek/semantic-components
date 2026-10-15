import { Directive, computed, inject } from '@angular/core';
import { ScDateRangePicker } from './date-range-picker';

/** Applies the range and closes the popover (disabled until it has both ends). On a button of yours: write its text. */
@Directive({
  selector: 'button[scDateRangePickerApply]',
  host: {
    type: 'button',
    'data-slot': 'date-range-picker-apply',
    '[disabled]': 'disabled()',
    '(click)': 'picker.onApply()',
  },
})
export class ScDateRangePickerApply {
  protected readonly picker = inject(ScDateRangePicker);

  protected readonly disabled = computed(
    () => !this.picker.value().from || !this.picker.value().to,
  );
}
