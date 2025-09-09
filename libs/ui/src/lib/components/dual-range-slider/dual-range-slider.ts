import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewEncapsulation,
  computed,
  effect,
  input,
  model,
  viewChildren,
} from '@angular/core';

import { cn } from '@semantic-components/utils';

@Component({
  selector: 'div[sc-dual-range-slider]',
  imports: [],
  template: `
    <div class="relative">
      <!-- Track background -->
      <div class="absolute w-full h-2 bg-input rounded-full"></div>

      <!-- Selected range track -->
      <div
        class="absolute h-2 bg-primary rounded-full z-10"
        [style.left]="minPercentage() + '%'"
        [style.right]="100 - maxPercentage() + '%'"
      ></div>

      <!-- Min value slider -->
      <input
        class="absolute w-full h-2 z-20 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-transparent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:size-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-background [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:-mt-1.5 [&::-moz-range-track]:h-2 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-transparent [&::-moz-range-track]:border-none [&::-moz-range-thumb]:size-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-background [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-primary [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:border-none"
        #minSlider
        [value]="minValue()"
        [min]="min()"
        [max]="max()"
        [step]="step()"
        (input)="onMinChange($event)"
        type="range"
      />

      <!-- Max value slider -->
      <input
        class="absolute w-full h-2 z-30 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-transparent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:size-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-background [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:-mt-1.5 [&::-moz-range-track]:h-2 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-transparent [&::-moz-range-track]:border-none [&::-moz-range-thumb]:size-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-background [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-primary [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:border-none"
        #maxSlider
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

  readonly minSlider = viewChildren<ElementRef<HTMLInputElement>>('minSlider');
  readonly maxSlider = viewChildren<ElementRef<HTMLInputElement>>('maxSlider');

  constructor() {
    // Sync input values when model changes
    effect(() => {
      const minEl = this.minSlider()[0]?.nativeElement;
      if (minEl && Number(minEl.value) !== this.minValue()) {
        minEl.value = this.minValue().toString();
      }
    });

    effect(() => {
      const maxEl = this.maxSlider()[0]?.nativeElement;
      if (maxEl && Number(maxEl.value) !== this.maxValue()) {
        maxEl.value = this.maxValue().toString();
      }
    });
  }

  protected readonly minPercentage = computed(() => {
    const range = this.max() - this.min();
    return range > 0 ? ((this.minValue() - this.min()) * 100) / range : 0;
  });

  protected readonly maxPercentage = computed(() => {
    const range = this.max() - this.min();
    return range > 0 ? ((this.maxValue() - this.min()) * 100) / range : 100;
  });

  protected onMinChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = Number(target.value);
    const currentMax = this.maxValue();

    if (value > currentMax) {
      // If min tries to go past max, set both to the attempted value
      this.minValue.set(currentMax);
      this.maxValue.set(value);
    } else {
      this.minValue.set(value);
    }
  }

  protected onMaxChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = Number(target.value);
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
