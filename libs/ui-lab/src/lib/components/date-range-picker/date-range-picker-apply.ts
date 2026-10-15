import { Directive, computed, inject, input } from '@angular/core';
import {
  type ScButtonVariants,
  buttonVariants,
  cn,
} from '@semantic-components/ui';
import { ScDateRangePicker } from './date-range-picker';

/** Applies the range and closes the popover (disabled until it has both ends). On a button of yours: write its text. */
@Directive({
  selector: 'button[scDateRangePickerApply]',
  host: {
    '[class]': 'class()',
    type: 'button',
    'data-slot': 'date-range-picker-apply',
    '[disabled]': 'disabled()',
    '(click)': 'picker.onApply()',
  },
})
export class ScDateRangePickerApply {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('default');
  readonly size = input<ScButtonVariants['size']>('sm');

  protected readonly class = computed(() =>
    cn(
      buttonVariants({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );

  protected readonly picker = inject(ScDateRangePicker);

  protected readonly disabled = computed(
    () => !this.picker.value().from || !this.picker.value().to,
  );
}
