import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_COLOR_PICKER } from './color-picker';

@Directive({
  selector: 'button[scColorPickerSwatch]',
  host: {
    type: 'button',
    '[class]': 'class()',
    '[style.background-color]': 'color()',
    '[attr.aria-label]': 'ariaLabel()',
    '(click)': 'selectColor()',
  },
})
export class ScColorPickerSwatch {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly color = input.required<string>();
  readonly ariaLabelInput = input('', { alias: 'aria-label' });

  private readonly colorPicker = inject(SC_COLOR_PICKER);

  protected readonly class = computed(() =>
    cn(
      'size-6 rounded-md border shadow-sm transition-transform hover:scale-110',
      'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
      this.classInput(),
    ),
  );

  protected readonly ariaLabel = computed(
    () => this.ariaLabelInput() || `Select color ${this.color()}`,
  );

  protected selectColor(): void {
    if (!this.colorPicker.disabled()) {
      this.colorPicker.setHex(this.color());
    }
  }
}
