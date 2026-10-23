import { Directive, computed, inject, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { ɵwarnIfUnnamed } from '../../utils/accessible-name/accessible-name';
import { cn } from '../../utils/cn/cn';
import { type ScButtonVariants } from '../button/button';
import { ScColorPicker } from './color-picker';

/**
 * Picks a colour from the screen. Only some browsers can: show it while
 * `picker.canPickFromScreen()`. Write its icon and name it ("Pick from screen").
 */
@Directive({
  selector: 'button[scColorPickerEyeDropper]',
  host: {
    type: 'button',
    'data-slot': 'color-picker-eye-dropper',
    '[disabled]': 'picker.disabled()',
    '[class]': 'class()',
    '(click)': 'picker.pickFromScreen()',
  },
})
export class ScColorPickerEyeDropper {
  private readonly buttonStyles = injectPreset().button;

  protected readonly picker = inject(ScColorPicker);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('outline');
  readonly size = input<ScButtonVariants['size']>('icon');

  protected readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );

  constructor() {
    ɵwarnIfUnnamed('scColorPickerEyeDropper');
  }
}
