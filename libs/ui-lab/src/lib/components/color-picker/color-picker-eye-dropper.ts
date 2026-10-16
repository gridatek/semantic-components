import { Directive, computed, inject, input } from '@angular/core';
import {
  type ScButtonVariants,
  buttonVariants,
  cn,
  ɵwarnIfUnnamed,
} from '@semantic-components/ui';
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
  protected readonly picker = inject(ScColorPicker);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('outline');
  readonly size = input<ScButtonVariants['size']>('icon');

  protected readonly class = computed(() =>
    cn(
      buttonVariants({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );

  constructor() {
    ɵwarnIfUnnamed('scColorPickerEyeDropper');
  }
}
