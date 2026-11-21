import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { type ScButtonVariants } from '../button';
import { ScDateTimePicker } from './date-time-picker';

/** `confirm`: keeps what is picked and closes — disabled until the value is whole. Write its text. */
@Directive({
  selector: 'button[scDateTimePickerApply]',
  host: {
    'data-slot': 'date-time-picker-apply',
    type: 'button',
    '[disabled]': '!picker.canApply()',
    '[class]': 'class()',
    '(click)': 'picker.apply()',
  },
})
export class ScDateTimePickerApply {
  private readonly buttonStyles = injectStyle().button;

  private readonly picker = inject(ScDateTimePicker);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('default');
  readonly size = input<ScButtonVariants['size']>('sm');

  private readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );
}
