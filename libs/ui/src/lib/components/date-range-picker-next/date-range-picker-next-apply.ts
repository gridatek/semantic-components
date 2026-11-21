import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { type ScButtonVariants } from '../button';
import { ScDateRangePickerNext } from './date-range-picker-next';

/** `confirm`: keeps the draft and closes — disabled until the range is whole. Write its text. */
@Directive({
  selector: 'button[scDateRangePickerNextApply]',
  host: {
    'data-slot': 'date-range-picker-apply',
    type: 'button',
    '[disabled]': '!picker.canApply()',
    '[class]': 'class()',
    '(click)': 'picker.apply()',
  },
})
export class ScDateRangePickerNextApply {
  private readonly buttonStyles = injectStyle().button;

  private readonly picker = inject(ScDateRangePickerNext);

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
