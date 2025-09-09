import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
  model,
} from '@angular/core';

import { cn } from '@semantic-components/utils';

import { ScDualRangeSliderRange } from './dual-range-slider-range';
import { ScDualRangeSliderThumb } from './dual-range-slider-thumb';
import { ScDualRangeSliderTrack } from './dual-range-slider-track';

@Component({
  selector: 'div[sc-dual-range-slider]',
  imports: [ScDualRangeSliderTrack, ScDualRangeSliderRange, ScDualRangeSliderThumb],
  template: `
    <!-- Track background -->
    <div sc-dual-range-slider-track></div>

    <!-- Selected range track -->
    <div
      [style.left]="minPercentage() + '%'"
      [style.right]="100 - maxPercentage() + '%'"
      sc-dual-range-slider-range
    ></div>

    <!-- Min value slider -->
    <input
      class="z-20"
      [value]="minValue()"
      [min]="min()"
      [max]="max()"
      [step]="step()"
      (valueChange)="onMinChange($event)"
      sc-dual-range-slider-thumb
    />

    <!-- Max value slider -->
    <input
      class="z-30"
      [value]="maxValue()"
      [min]="min()"
      [max]="max()"
      [step]="step()"
      (valueChange)="onMaxChange($event)"
      sc-dual-range-slider-thumb
    />
  `,
  host: {
    '[class]': 'class()',
  },
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScDualRangeSlider {
  readonly classInput = input<string>('', {
    alias: 'class',
  });

  protected readonly class = computed(() => cn('block relative w-full py-4', this.classInput()));

  readonly min = input(0);
  readonly max = input(100);
  readonly step = input(1);

  readonly minValue = model<number>(20);
  readonly maxValue = model<number>(80);

  protected readonly minPercentage = computed(() => {
    const range = this.max() - this.min();
    return range > 0 ? ((this.minValue() - this.min()) * 100) / range : 0;
  });

  protected readonly maxPercentage = computed(() => {
    const range = this.max() - this.min();
    return range > 0 ? ((this.maxValue() - this.min()) * 100) / range : 100;
  });

  protected onMinChange(value: number): void {
    const currentMax = this.maxValue();

    if (value > currentMax) {
      // If min tries to go past max, set both to the attempted value
      this.minValue.set(currentMax);
      this.maxValue.set(value);
    } else {
      this.minValue.set(value);
    }
  }

  protected onMaxChange(value: number): void {
    const currentMin = this.minValue();

    if (value < currentMin) {
      // If max tries to go below min, set both to the attempted value
      this.maxValue.set(currentMin);
      this.minValue.set(value);
    } else {
      this.maxValue.set(value);
    }
  }
}
