import { Directive, computed, inject, input, model } from '@angular/core';
import { cn } from '../../utils';
import { ScRangeSlider } from './range-slider';
import { MIN_THUMB_CLASSES } from './range-slider-thumb-base';

@Directive({
  selector: 'input[scRangeSliderMin]',
  host: {
    type: 'range',
    '[min]': 'rangeSlider.min()',
    '[max]': 'rangeSlider.max()',
    '[step]': 'rangeSlider.step()',
    '[disabled]': 'rangeSlider.disabled()',
    '[value]': 'value()',
    '[class]': 'class()',
    '(input)': 'onInput($event)',
  },
})
export class ScRangeSliderMin {
  protected readonly rangeSlider = inject(ScRangeSlider);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly value = model<number>(this.rangeSlider.min());

  protected readonly class = computed(() => {
    const maxVal =
      this.rangeSlider.maxThumb()?.value() ?? this.rangeSlider.max();
    const midpoint = (this.rangeSlider.min() + this.rangeSlider.max()) / 2;
    const stepBack = this.value() === maxVal && this.value() <= midpoint;

    return cn(...MIN_THUMB_CLASSES, stepBack && 'z-0', this.classInput());
  });

  protected onInput(event: Event) {
    const el = event.target as HTMLInputElement;
    const val = +el.value;
    const maxVal =
      this.rangeSlider.maxThumb()?.value() ?? this.rangeSlider.max();
    const clamped = Math.min(val, maxVal);
    this.value.set(clamped);

    if (val !== clamped) {
      el.value = String(clamped);
    }
  }
}
