import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '@semantic-components/ui';

@Component({
  selector: 'div[scNativeRangeSlider]',
  host: {
    '[class]': 'hostClass()',
  },
  template: `
    <div class="absolute h-1 w-full rounded-full bg-muted"></div>

    <div
      class="absolute h-1 rounded-full bg-primary"
      [style.left.%]="minPercent()"
      [style.right.%]="100 - maxPercent()"
    ></div>

    <input
      type="range"
      [min]="min()"
      [max]="max()"
      [step]="step()"
      [value]="minValue()"
      [disabled]="disabled()"
      [attr.aria-label]="minAriaLabel() ?? 'Minimum value'"
      [class]="thumbClass()"
      (input)="onMinInput($event)"
    />

    <input
      type="range"
      [min]="min()"
      [max]="max()"
      [step]="step()"
      [value]="maxValue()"
      [disabled]="disabled()"
      [attr.aria-label]="maxAriaLabel() ?? 'Maximum value'"
      [class]="thumbClass()"
      (input)="onMaxInput($event)"
    />
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScNativeRangeSlider {
  readonly classInput = input<string>('', { alias: 'class' });

  readonly minValue = model<number>(0);
  readonly maxValue = model<number>(100);

  readonly min = input<number>(0);
  readonly max = input<number>(100);
  readonly step = input<number>(1);
  readonly disabled = input<boolean>(false);
  readonly minAriaLabel = input<string | undefined>(undefined, {
    alias: 'min-aria-label',
  });
  readonly maxAriaLabel = input<string | undefined>(undefined, {
    alias: 'max-aria-label',
  });

  protected readonly hostClass = computed(() =>
    cn('relative flex h-3 w-full items-center', this.classInput()),
  );

  protected readonly minPercent = computed(() => {
    const range = this.max() - this.min();
    return range === 0 ? 0 : ((this.minValue() - this.min()) / range) * 100;
  });

  protected readonly maxPercent = computed(() => {
    const range = this.max() - this.min();
    return range === 0 ? 0 : ((this.maxValue() - this.min()) / range) * 100;
  });

  protected readonly thumbClass = computed(() =>
    cn(
      'pointer-events-none absolute top-0 h-full w-full cursor-pointer appearance-none bg-transparent',
      'disabled:pointer-events-none disabled:opacity-50',
      '[&::-webkit-slider-runnable-track]:h-0 [&::-webkit-slider-runnable-track]:bg-transparent',
      '[&::-moz-range-track]:h-0 [&::-moz-range-track]:bg-transparent',
      '[&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:size-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-0 [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:transition-shadow [&::-webkit-slider-thumb]:-mt-1.5',
      '[&::-webkit-slider-thumb:hover]:shadow-[0_0_0_3px_oklch(from_var(--ring)_l_c_h/0.5)]',
      '[&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:size-3 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:transition-shadow',
      '[&::-moz-range-thumb:hover]:shadow-[0_0_0_3px_oklch(from_var(--ring)_l_c_h/0.5)]',
      'focus-visible:outline-none [&:focus-visible::-webkit-slider-thumb]:shadow-[0_0_0_3px_oklch(from_var(--ring)_l_c_h/0.5)]',
      '[&:focus-visible::-moz-range-thumb]:shadow-[0_0_0_3px_oklch(from_var(--ring)_l_c_h/0.5)]',
    ),
  );

  protected onMinInput(event: Event) {
    const el = event.target as HTMLInputElement;
    const val = +el.value;
    const clamped = Math.min(val, this.maxValue());
    this.minValue.set(clamped);

    if (val !== clamped) {
      el.value = String(clamped);
    }
  }

  protected onMaxInput(event: Event) {
    const el = event.target as HTMLInputElement;
    const val = +el.value;
    const clamped = Math.max(val, this.minValue());
    this.maxValue.set(clamped);

    if (val !== clamped) {
      el.value = String(clamped);
    }
  }
}
