import { Directive, computed, inject, input } from '@angular/core';
import {
  type ScButtonVariants,
  buttonVariants,
  cn,
} from '@semantic-components/ui';
import { ScDateRangePicker } from './date-range-picker';

/** Closes the popover without the new range. On a button of yours: write its text. */
@Directive({
  selector: 'button[scDateRangePickerCancel]',
  host: {
    '[class]': 'class()',
    type: 'button',
    'data-slot': 'date-range-picker-cancel',
    '(click)': 'picker.onCancel()',
  },
})
export class ScDateRangePickerCancel {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('outline');
  readonly size = input<ScButtonVariants['size']>('sm');

  protected readonly class = computed(() =>
    cn(
      buttonVariants({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );

  protected readonly picker = inject(ScDateRangePicker);
}
