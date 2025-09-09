import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
  model,
} from '@angular/core';

import { cn } from '@semantic-components/utils';

@Component({
  selector: 'div[sc-dual-range-slider]',
  imports: [],
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
        class="absolute w-full h-2 z-20 appearance-none bg-transparent cursor-pointer [&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-transparent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:size-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-background [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:-mt-1.5 [&::-moz-range-track]:h-2 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-transparent [&::-moz-range-track]:border-none [&::-moz-range-thumb]:size-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-background [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-primary [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-none"
        [value]="minValue()"
        [min]="min()"
        [max]="max()"
        [step]="step()"
        (input)="onMinChange($event)"
        type="range"
      />

      <!-- Max value slider -->
      <input
        class="absolute w-full h-2 z-20 appearance-none bg-transparent cursor-pointer [&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-transparent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:size-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-background [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:-mt-1.5 [&::-moz-range-track]:h-2 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-transparent [&::-moz-range-track]:border-none [&::-moz-range-thumb]:size-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-background [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-primary [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-none"
        [value]="maxValue()"
        [min]="min()"
        [max]="max()"
        [step]="step()"
        (input)="onMaxChange($event)"
        type="range"
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
