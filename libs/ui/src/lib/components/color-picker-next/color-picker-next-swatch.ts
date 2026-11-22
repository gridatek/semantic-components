import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { ScColorPickerNext } from './color-picker-next';
import { SC_COLOR_CHECKERBOARD } from './color-picker-next-slider';

/** The colour, shown — on a checkerboard, for its transparency. Decorative: say the colour in text where it matters. */
@Directive({
  selector: '[scColorPickerNextSwatch]',
  host: {
    'data-slot': 'color-picker-swatch',
    'aria-hidden': 'true',
    '[attr.data-out-of-gamut]': 'picker.outOfGamut() || null',
    '[style.background]': 'background()',
    '[class]': 'class()',
  },
})
export class ScColorPickerNextSwatch {
  private readonly picker = inject(ScColorPickerNext);
  private readonly styles = injectStyle().colorPicker;

  readonly classInput = input<string>('', { alias: 'class' });

  /** No colour (an empty value): the checkerboard alone. */
  private readonly background = computed(() =>
    this.picker.value()
      ? `linear-gradient(${this.picker.css()}, ${this.picker.css()}), ${SC_COLOR_CHECKERBOARD}`
      : SC_COLOR_CHECKERBOARD,
  );

  private readonly class = computed(() =>
    cn(
      'inline-block size-9 shrink-0 border',
      this.styles.swatch,
      this.classInput(),
    ),
  );
}
