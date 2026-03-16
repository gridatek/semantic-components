import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_COLOR_PICKER } from './color-picker';

@Directive({
  selector: 'div[scColorPickerHueCursor]',
  host: {
    'data-slot': 'color-picker-hue-cursor',
    '[class]': 'class()',
    '[style.left.%]': '(colorPicker.hsv().h / 360) * 100',
    '[style.background]': '"hsl(" + colorPicker.hsv().h + ", 100%, 50%)"',
  },
})
export class ScColorPickerHueCursor {
  protected readonly colorPicker = inject(SC_COLOR_PICKER);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'absolute top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-md',
      this.classInput(),
    ),
  );
}
