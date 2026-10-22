import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '../../utils';
import { type ScButtonVariants, buttonVariants } from '../button';
import { ScDatePicker } from './date-picker';

/** `confirm`: closes, the draft dropped — as Escape does. Write its text. */
@Directive({
  selector: 'button[scDatePickerCancel]',
  host: {
    'data-slot': 'date-picker-cancel',
    type: 'button',
    '[class]': 'class()',
    '(click)': 'picker.cancel()',
  },
})
export class ScDatePickerCancel {
  protected readonly picker = inject(ScDatePicker);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('outline');
  readonly size = input<ScButtonVariants['size']>('sm');

  protected readonly class = computed(() =>
    cn(
      buttonVariants({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );
}
