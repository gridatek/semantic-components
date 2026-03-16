import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_COLOR_PICKER } from './color-picker';

@Directive({
  selector: 'button[scColorPickerSwatch]',
  host: {
    'data-slot': 'color-picker-swatch',
    type: 'button',
    '[class]': 'class()',
    '[style.background-color]': 'color()',
    '(click)': 'selectColor()',
  },
})
export class ScColorPickerSwatch {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly color = input.required<string>();

  private readonly colorPicker = inject(SC_COLOR_PICKER);

  protected readonly class = computed(() =>
    cn(
      'focus:ring-ring size-6 rounded-md border shadow-sm transition-transform hover:scale-110 focus:ring-2 focus:outline-none',
      this.classInput(),
    ),
  );

  protected selectColor(): void {
    if (!this.colorPicker.disabled()) {
      this.colorPicker.setHex(this.color());
    }
  }
}
