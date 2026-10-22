import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '../../utils';
import { type ScButtonVariants, buttonVariants } from '../button';
import { ScDatePicker } from './date-picker';

/** `confirm`: keeps the draft and closes — disabled until it is a day, a whole range, or days. Write its text. */
@Directive({
  selector: 'button[scDatePickerApply]',
  host: {
    'data-slot': 'date-picker-apply',
    type: 'button',
    '[disabled]': '!picker.canApply()',
    '[class]': 'class()',
    '(click)': 'picker.apply()',
  },
})
export class ScDatePickerApply {
  protected readonly picker = inject(ScDatePicker);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('default');
  readonly size = input<ScButtonVariants['size']>('sm');

  protected readonly class = computed(() =>
    cn(
      buttonVariants({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );
}
