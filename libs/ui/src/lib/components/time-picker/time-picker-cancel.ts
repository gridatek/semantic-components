import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { type ScButtonVariants } from '../button';
import { ScTimePicker } from './time-picker';

/** `confirm`: closes, the value from before it opened put back — as Escape does. Write its text. */
@Directive({
  selector: 'button[scTimePickerCancel]',
  host: {
    'data-slot': 'time-picker-cancel',
    type: 'button',
    '[class]': 'class()',
    '(click)': 'picker.cancel()',
  },
})
export class ScTimePickerCancel {
  private readonly buttonStyles = injectStyle().button;

  private readonly picker = inject(ScTimePicker);

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
