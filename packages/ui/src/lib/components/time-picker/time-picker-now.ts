import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { type ScButtonVariants } from '../button';
import { ScTimePicker } from './time-picker';

/**
 * Sets the current time — on the picker's steps — and closes: the style's
 * button (ghost, small). Write its text ("Now").
 */
@Directive({
  selector: 'button[scTimePickerNow]',
  host: {
    'data-slot': 'time-picker-now',
    type: 'button',
    '[disabled]':
      'picker.timeInput().disabled() || picker.timeInput().readonly()',
    '[class]': 'class()',
    '(click)': 'picker.now()',
  },
})
export class ScTimePickerNow {
  private readonly buttonStyles = injectStyle().button;
  private readonly picker = inject(ScTimePicker);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('sm');

  private readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );
}
