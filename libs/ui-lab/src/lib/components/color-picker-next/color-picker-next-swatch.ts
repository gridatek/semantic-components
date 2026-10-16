import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScColorPickerNext } from './color-picker-next';
import { CHECKERBOARD } from './color-picker-next-slider';

/** The colour, shown — on a checkerboard, for its transparency. Decorative: say the colour in text if it matters. */
@Directive({
  selector: '[scColorPickerNextSwatch]',
  host: {
    'data-slot': 'color-picker-swatch',
    'aria-hidden': 'true',
    '[style.background]': 'background()',
    '[class]': 'class()',
  },
})
export class ScColorPickerNextSwatch {
  private readonly picker = inject(ScColorPickerNext);

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
