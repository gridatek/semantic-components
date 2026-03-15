import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_COLOR_PICKER } from './color-picker';

@Directive({
  selector: 'button[scColorPickerEyedropper]',
  host: {
    'data-slot': 'color-picker-eyedropper',
    type: 'button',
    '[class]': 'class()',
    '[disabled]': 'colorPicker.disabled() || !isSupported()',
    '(click)': 'pickColor()',
  },
})
export class ScColorPickerEyeDropper {
  readonly colorPicker = inject(SC_COLOR_PICKER);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'inline-flex size-9 items-center justify-center rounded-md border border-input bg-background',
      'hover:bg-accent hover:text-accent-foreground',
      'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
      'disabled:pointer-events-none disabled:opacity-50',
      this.classInput(),
    ),
  );

  isSupported(): boolean {
    return 'EyeDropper' in window;
  }

  async pickColor(): Promise<void> {
    if (!this.isSupported() || this.colorPicker.disabled()) return;

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
