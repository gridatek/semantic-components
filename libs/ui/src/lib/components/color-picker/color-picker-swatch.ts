import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '../../utils/cn/cn';
import { ScColorPicker } from './color-picker';
import { CHECKERBOARD } from './color-picker-slider';

/** The colour, shown — on a checkerboard, for its transparency. Decorative: say the colour in text if it matters. */
@Directive({
  selector: '[scColorPickerSwatch]',
  host: {
    'data-slot': 'color-picker-swatch',
    'aria-hidden': 'true',
    '[style.background]': 'background()',
    '[class]': 'class()',
  },
})
export class ScColorPickerSwatch {
  private readonly picker = inject(ScColorPicker);

  readonly classInput = input<string>('', { alias: 'class' });

  /** No colour (an empty value): the checkerboard alone. */
  protected readonly background = computed(() =>
    this.picker.value()
      ? `linear-gradient(${this.picker.css()}, ${this.picker.css()}), ${CHECKERBOARD}`
      : CHECKERBOARD,
  );

  protected readonly class = computed(() =>
    cn('inline-block size-9 shrink-0 rounded-md border', this.classInput()),
  );
}
