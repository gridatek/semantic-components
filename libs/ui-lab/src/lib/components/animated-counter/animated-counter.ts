import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  input,
  output,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';
import type { AnimatedCounterEasing } from './animated-counter-types';
import { DEFAULT_COUNTER_OPTIONS } from './animated-counter-types';

@Component({
  selector: 'sc-animated-counter',
  template: `
    <span [class]="containerClass()" [attr.aria-label]="ariaLabel()">
      <span aria-hidden="true">{{ displayValue() }}</span>
    </span>
  `,
  styles: `
    :host {
      display: inline-block;
    }
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScAnimatedCounter {
  private readonly destroyRef = inject(DestroyRef);

  readonly value = input.required<number>();
  readonly duration = input(DEFAULT_COUNTER_OPTIONS.duration);
  readonly easing = input<AnimatedCounterEasing>(
    DEFAULT_COUNTER_OPTIONS.easing,
  );
  readonly decimalPlaces = input(DEFAULT_COUNTER_OPTIONS.decimalPlaces);
  readonly separator = input(DEFAULT_COUNTER_OPTIONS.separator);
  readonly prefix = input(DEFAULT_COUNTER_OPTIONS.prefix);
  readonly suffix = input(DEFAULT_COUNTER_OPTIONS.suffix);
  readonly class = input<string>('');

  readonly animationComplete = output<number>();

  private readonly currentValue = signal(0);
  private animationId: number | null = null;
  private previousValue = 0;

  protected readonly displayValue = computed(() => {
    const val = this.currentValue();
    const formatted = this.formatNumber(val);
    return `${this.prefix()}${formatted}${this.suffix()}`;
  });

  protected readonly ariaLabel = computed(() => {
    return `${this.prefix()}${this.value()}${this.suffix()}`;
  });

  protected readonly containerClass = computed(() =>
    cn('tabular-nums font-medium', this.class()),
  );

  constructor() {
    effect(() => {
      const targetValue = this.value();
      this.animateToValue(targetValue);
    });

    this.destroyRef.onDestroy(() => {
      this.cancelAnimation();
    });
  }

  private animateToValue(target: number): void {
    this.cancelAnimation();

    const start = this.previousValue;
    const startTime = performance.now();
    const duration = this.duration();
    const easingFn = this.getEasingFunction(this.easing());

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easingFn(progress);

      const current = start + (target - start) * easedProgress;
      this.currentValue.set(current);

      if (progress < 1) {
        this.animationId = requestAnimationFrame(animate);
      } else {
        this.previousValue = target;
        this.animationComplete.emit(target);
      }
    };

    this.animationId = requestAnimationFrame(animate);
  }

  private cancelAnimation(): void {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  private getEasingFunction(
    easing: AnimatedCounterEasing,
  ): (t: number) => number {
    switch (easing) {
      case 'linear':
        return (t) => t;
      case 'easeIn':
        return (t) => t * t;
      case 'easeOut':
        return (t) => t * (2 - t);
      case 'easeInOut':
        return (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);
    }
  }

  private formatNumber(value: number): string {
    const fixed = value.toFixed(this.decimalPlaces());
    const [intPart, decPart] = fixed.split('.');

    const withSeparator = intPart.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      this.separator(),
    );

    return decPart ? `${withSeparator}.${decPart}` : withSeparator;
  }

  reset(): void {
    this.cancelAnimation();
    this.previousValue = 0;
    this.currentValue.set(0);
  }
}
