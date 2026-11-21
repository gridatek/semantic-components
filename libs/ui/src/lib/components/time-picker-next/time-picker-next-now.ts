import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { type ScButtonVariants } from '../button';
import { ScTimePickerNext } from './time-picker-next';

/**
 * Sets the current time — on the picker's steps — and closes: the style's
 * button (ghost, small). Write its text ("Now").
 */
@Directive({
  selector: 'button[scTimePickerNextNow]',
  host: {
    'data-slot': 'time-picker-now',
    type: 'button',
    '[disabled]':
      'picker.timeInput().disabled() || picker.timeInput().readonly()',
    '[class]': 'class()',
    '(click)': 'picker.now()',
  },
})
export class ScTimePickerNextNow {
  private readonly buttonStyles = injectStyle().button;
  private readonly picker = inject(ScTimePickerNext);

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
