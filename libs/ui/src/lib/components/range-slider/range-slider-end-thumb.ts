import { Directive, computed, inject, input, model } from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';
import { cn } from '../../utils';
import { ScRangeSlider } from './range-slider';
import { END_THUMB_CLASSES } from './range-slider-thumb-base';

@Directive({
  selector: 'input[scRangeSliderEndThumb]',
  host: {
    type: 'range',
    '[min]': 'resolvedMin()',
    '[max]': 'resolvedMax()',
    '[step]': 'rangeSlider.step()',
    '[disabled]': 'rangeSlider.disabled()',
    '[value]': 'value()',
    '[class]': 'class()',
    '(input)': 'onInput($event)',
  },
})
export class ScRangeSliderEndThumb implements FormValueControl<number> {
  protected readonly rangeSlider = inject(ScRangeSlider);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly value = model<number>(100);

  // Don't use input<number>(0) — type must be input<number | undefined> to match FormUiControl
  readonly min = input<number | undefined>(undefined);
  // Don't use input<number>(100) — type must be input<number | undefined> to match FormUiControl
  readonly max = input<number | undefined>(undefined);

  readonly resolvedMin = computed(() => this.min() ?? 0);
  readonly resolvedMax = computed(() => this.max() ?? 100);

  protected readonly class = computed(() =>
    cn(...END_THUMB_CLASSES, this.classInput()),
  );

  protected onInput(event: Event) {
    const el = event.target as HTMLInputElement;
    const val = +el.value;
    const startVal =
      this.rangeSlider.startThumb()?.value() ?? this.resolvedMin();
    const clamped = Math.max(val, startVal);
    this.value.set(clamped);

    if (val !== clamped) {
      el.value = String(clamped);
    }
  }
}
