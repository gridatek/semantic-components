import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { type ScButtonVariants } from '../button';
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
  private readonly buttonStyles = injectStyle().button;

  private readonly picker = inject(ScDatePicker);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('outline');
  readonly size = input<ScButtonVariants['size']>('sm');

  private readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );
}
