import { computed, Directive, inject, input } from '@angular/core';
import { cn } from '../../utils';
import { SC_COLOR_PICKER } from './color-picker';

@Directive({
  selector: '[sc-color-picker-preview]',
  host: {
    'data-slot': 'color-picker-preview',
    '[class]': 'class()',
    '[style.background-color]': 'colorPicker.hex()',
  },
})
export class ScColorPickerPreview {
  readonly colorPicker = inject(SC_COLOR_PICKER);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('block size-10 rounded-md border shadow-sm', this.classInput()),
  );
}
