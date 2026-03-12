import { Directive, computed, inject, input, model } from '@angular/core';
import { cn } from '../../utils';
import { ScRangeSlider } from './range-slider';
import { MAX_THUMB_CLASSES } from './range-slider-thumb-base';

@Directive({
  selector: 'input[scRangeSliderMax]',
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
export class ScRangeSliderMax {
  protected readonly rangeSlider = inject(ScRangeSlider);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly value = model<number>(this.rangeSlider.max());

  protected readonly class = computed(() =>
    cn(...MAX_THUMB_CLASSES, this.classInput()),
  );

  protected onInput(event: Event) {
    const el = event.target as HTMLInputElement;
    const val = +el.value;
    const minVal =
      this.rangeSlider.minThumb()?.value() ?? this.rangeSlider.min();
    const clamped = Math.max(val, minVal);
    this.value.set(clamped);

    if (val !== clamped) {
      el.value = String(clamped);
    }
  }
}
