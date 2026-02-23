import { computed, Directive, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

import { ScRangeSlider } from './range-slider';
import { RANGE_SLIDER_THUMB_CLASSES } from './range-slider-thumb-base';

@Directive({
  selector: 'input[scRangeSliderMinThumb]',
  host: {
    type: 'range',
    '[min]': 'rangeSlider.min()',
    '[max]': 'rangeSlider.max()',
    '[step]': 'rangeSlider.step()',
    '[disabled]': 'rangeSlider.disabled()',
    '[value]': 'rangeSlider.minValue()',
    '[class]': 'class()',
    '(input)': 'onInput($event)',
  },
})
export class ScRangeSliderMinThumb {
  protected readonly rangeSlider = inject(ScRangeSlider);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(...RANGE_SLIDER_THUMB_CLASSES, this.classInput()),
  );

  protected onInput(event: Event) {
    const el = event.target as HTMLInputElement;
    const val = +el.value;
    const clamped = this.rangeSlider.clampMin(val);
    this.rangeSlider.minValue.set(clamped);

    if (val !== clamped) {
      el.value = String(clamped);
    }
  }
}
