import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
  model,
  signal,
} from '@angular/core';

import { cn } from '@semantic-components/utils';

import { ScSlider } from '../slider/slider';

@Component({
  selector: 'div[sc-dual-range-slider]',
  imports: [ScSlider],
  template: `
    <div class="relative">
      <!-- Track background -->
      <div class="absolute top-1/2 -translate-y-1/2 w-full h-2 bg-input rounded-full"></div>

      <!-- Selected range track -->
      <div
        class="absolute top-1/2 -translate-y-1/2 h-2 bg-primary rounded-full z-10"
        [style.left]="minPercentage() + '%'"
        [style.right]="100 - maxPercentage() + '%'"
      ></div>

      <!-- Min value slider -->
      <input
        class="absolute w-full z-20 bg-transparent [&::-webkit-slider-thumb]:bg-background [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary [&::-moz-range-thumb]:bg-background [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-primary"
        [(value)]="minValue"
        [min]="min()"
        [max]="max()"
        [step]="step()"
        (input)="onMinChange($event)"
        sc-slider
      />

      <!-- Max value slider -->
      <input
        class="absolute w-full z-20 bg-transparent [&::-webkit-slider-thumb]:bg-background [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary [&::-moz-range-thumb]:bg-background [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-primary"
        [(value)]="maxValue"
        [min]="min()"
        [max]="max()"
        [step]="step()"
        (input)="onMaxChange($event)"
        sc-slider
      />
    </div>
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

  protected readonly class = computed(() => cn('relative w-full py-4', this.classInput()));

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

  protected onMinChange(event: Event): void {
    const value = Number((event.target as HTMLInputElement).value);
    if (value <= this.maxValue()) {
      this.minValue.set(value);
    } else {
      // Reset to current value if trying to exceed max
      (event.target as HTMLInputElement).value = this.minValue().toString();
    }
  }

  protected onMaxChange(event: Event): void {
    const value = Number((event.target as HTMLInputElement).value);
    if (value >= this.minValue()) {
      this.maxValue.set(value);
    } else {
      // Reset to current value if trying to go below min
      (event.target as HTMLInputElement).value = this.maxValue().toString();
    }
  }
}
