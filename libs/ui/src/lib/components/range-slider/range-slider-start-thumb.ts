import { Directive, computed, inject, input, model } from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';
import { cn } from '../../utils';
import { ScRangeSlider } from './range-slider';
import { START_THUMB_CLASSES } from './range-slider-thumb-base';

@Directive({
  selector: 'input[scRangeSliderStartThumb]',
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
export class ScRangeSliderStartThumb implements FormValueControl<number> {
  protected readonly rangeSlider = inject(ScRangeSlider);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly value = model<number>(0);

  // Don't use input<number>(0) — type must be input<number | undefined> to match FormUiControl
  readonly min = input<number | undefined>(undefined);
  // Don't use input<number>(100) — type must be input<number | undefined> to match FormUiControl
  readonly max = input<number | undefined>(undefined);

  readonly resolvedMin = computed(() => this.min() ?? 0);
  readonly resolvedMax = computed(() => this.max() ?? 100);

  protected readonly class = computed(() => {
    const endVal = this.rangeSlider.endThumb()?.value() ?? this.resolvedMax();
    const midpoint = (this.resolvedMin() + this.resolvedMax()) / 2;

    // When both thumbs overlap, drop the start thumb's z-index so the end
    // thumb (higher in DOM order) becomes grabbable — this lets the user
    // drag the range open. When overlapping in the upper half, keep start
    // on top so it can be dragged left instead.
    const stepBack = this.value() === endVal && this.value() <= midpoint;

    return cn(...START_THUMB_CLASSES, stepBack && 'z-0', this.classInput());
  });

  protected onInput(event: Event) {
    const el = event.target as HTMLInputElement;
    const val = +el.value;
    const endVal = this.rangeSlider.endThumb()?.value() ?? this.resolvedMax();
    const clamped = Math.min(val, endVal);
    this.value.set(clamped);

    if (val !== clamped) {
      el.value = String(clamped);
    }
  }
}
