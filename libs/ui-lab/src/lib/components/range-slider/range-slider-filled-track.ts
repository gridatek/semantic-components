import { computed, Directive, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

import { ScRangeSlider } from './range-slider';

@Directive({
  selector: 'div[scRangeSliderFilledTrack]',
  host: {
    '[class]': 'class()',
    '[style.left.%]': 'rangeSlider.minPercent()',
    '[style.right.%]': 'rightPercent()',
  },
})
export class ScRangeSliderFilledTrack {
  protected readonly rangeSlider = inject(ScRangeSlider);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('absolute h-1 rounded-full bg-primary', this.classInput()),
  );

  protected readonly rightPercent = computed(
    () => 100 - this.rangeSlider.maxPercent(),
  );
}
