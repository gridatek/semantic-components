import { computed, Directive, inject } from '@angular/core';

import { ScRangeSlider } from './range-slider';

@Directive({
  selector: 'div[scRangeSliderFilledTrack]',
  host: {
    'aria-hidden': 'true',
    class: 'absolute h-1 rounded-full bg-primary',
    '[style.left.%]': 'rangeSlider.minPercent()',
    '[style.right.%]': 'rightPercent()',
  },
})
export class ScRangeSliderFilledTrack {
  protected readonly rangeSlider = inject(ScRangeSlider);

  protected readonly rightPercent = computed(
    () => 100 - this.rangeSlider.maxPercent(),
  );
}
