import { Directive, computed, inject, input } from '@angular/core';
import {
  type ScButtonVariants,
  buttonVariants,
  cn,
} from '@semantic-components/ui';
import { SC_COLOR_PICKER } from './color-picker';

@Directive({
  selector: 'button[scColorPickerEyedropper]',
  host: {
    type: 'button',
    '[class]': 'class()',
    '[disabled]': 'colorPicker.disabled() || !isSupported',
    '(click)': 'pickColor()',
  },
})
export class ScColorPickerEyeDropper {
  readonly colorPicker = inject(SC_COLOR_PICKER);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('outline');
  readonly size = input<ScButtonVariants['size']>('icon-lg');

  protected readonly class = computed(() =>
    cn(
      buttonVariants({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );

  readonly isSupported = 'EyeDropper' in globalThis;

  async pickColor(): Promise<void> {
    if (!this.isSupported || this.colorPicker.disabled()) return;

    try {
      // @ts-expect-error EyeDropper API not yet in TypeScript types
      const eyeDropper = new window.EyeDropper();
      const result = await eyeDropper.open();
      this.colorPicker.setHex(result.sRGBHex);
    } catch {
      // User cancelled or error
    }
  }
}
