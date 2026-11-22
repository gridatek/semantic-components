import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { ɵwarnIfUnnamed } from '../../utils';
import { type ScButtonVariants } from '../button/button';
import { ScColorPickerNext } from './color-picker-next';

/**
 * Picks a colour from the screen — where the browser can; elsewhere it is
 * disabled, `data-unsupported`. Write its icon and name it ("Pick from screen").
 */
@Directive({
  selector: 'button[scColorPickerNextEyeDropper]',
  host: {
    type: 'button',
    'data-slot': 'color-picker-eye-dropper',
    '[attr.data-unsupported]': 'picker.canPickFromScreen() ? null : ""',
    '[disabled]': 'picker.disabled() || !picker.canPickFromScreen()',
    '[class]': 'class()',
    '(click)': 'picker.pickFromScreen()',
  },
})
export class ScColorPickerNextEyeDropper {
  private readonly buttonStyles = injectStyle().button;
  private readonly picker = inject(ScColorPickerNext);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('outline');
  readonly size = input<ScButtonVariants['size']>('icon');

  private readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );

  constructor() {
    ɵwarnIfUnnamed('scColorPickerNextEyeDropper');
  }
}
