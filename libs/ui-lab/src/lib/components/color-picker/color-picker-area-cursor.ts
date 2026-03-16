import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_COLOR_PICKER } from './color-picker';

@Directive({
  selector: 'div[scColorPickerAreaCursor]',
  host: {
    'data-slot': 'color-picker-area-cursor',
    '[class]': 'class()',
    '[style.left.%]': 'colorPicker.hsv().s',
    '[style.top.%]': '100 - colorPicker.hsv().v',
    '[style.background-color]': 'colorPicker.hex()',
  },
})
export class ScColorPickerAreaCursor {
  protected readonly colorPicker = inject(SC_COLOR_PICKER);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'absolute size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-md',
      this.classInput(),
    ),
  );
}
