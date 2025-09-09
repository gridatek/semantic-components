import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewEncapsulation,
  computed,
  effect,
  inject,
  input,
  model,
  signal,
} from '@angular/core';

import { cn } from '@semantic-components/utils';

import { scInputStyles } from '../input/input';

@Component({
  selector: 'div[sc-input-number]',
  imports: [],
  template: `
    <div class="relative">
      <input
        class="w-full pr-8"
        #inputElement
        [class]="inputClass()"
        [value]="formattedValue()"
        [placeholder]="placeholder()"
        [disabled]="disabled()"
        [min]="min()"
        [max]="max()"
        [step]="step()"
        (input)="handleInput($event)"
        (blur)="handleBlur($event)"
        (keydown)="handleKeyDown($event)"
        (focus)="handleFocus()"
        type="number"
      />

      @if (showControls()) {
        <div class="absolute right-0 top-0 h-full flex flex-col border-l border-input">
          <button
            class="flex-1 px-2 hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed text-xs flex items-center justify-center border-b border-input"
            [disabled]="disabled() || isAtMax()"
            (click)="increment()"
            type="button"
          >
            ▲
          </button>
          <button
            class="flex-1 px-2 hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed text-xs flex items-center justify-center"
            [disabled]="disabled() || isAtMin()"
            (click)="decrement()"
            type="button"
          >
            ▼
          </button>
        </div>
      }
    </div>
  `,
  host: {
    '[class]': 'class()',
  },
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScInputNumber {
  private readonly hostRef = inject(ElementRef);

  readonly classInput = input<string>('', {
    alias: 'class',
  });

  readonly value = model<number>(0);
  readonly min = input<number>();
  readonly max = input<number>();
  readonly step = input<number>(1);
  readonly precision = input<number>();
  readonly placeholder = input<string>('');
  readonly disabled = input<boolean>(false);
  readonly showControls = input<boolean>(false);
  readonly allowNegative = input<boolean>(true);
  readonly formatOnBlur = input<boolean>(true);

  private readonly isFocused = signal(false);
  private readonly hasError = signal(false);

  protected readonly class = computed(() => cn('relative inline-block', this.classInput()));

  protected readonly inputClass = computed(() => {
    const baseStyles = scInputStyles();
    const errorStyles = this.hasError() ? 'border-destructive focus:ring-destructive' : '';
    const controlStyles = this.showControls() ? 'pr-8' : '';
    return cn(baseStyles, errorStyles, controlStyles);
  });

  protected readonly formattedValue = computed(() => {
    const currentValue = this.value();

    if (this.isFocused()) {
      // Show raw value when focused for easier editing
      return currentValue.toString();
    }

    if (this.precision() !== undefined) {
      return currentValue.toFixed(this.precision());
    }

    return currentValue.toString();
  });

  protected readonly isAtMin = computed(() => {
    const minValue = this.min();
    return minValue !== undefined && this.value() <= minValue;
  });

  protected readonly isAtMax = computed(() => {
    const maxValue = this.max();
    return maxValue !== undefined && this.value() >= maxValue;
  });

  constructor() {
    // Validate value when inputs change
    effect(() => {
      this.validateAndClampValue();
    });
  }

  protected handleInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const stringValue = target.value;

    if (stringValue === '' || stringValue === '-') {
      // Allow empty or just minus sign for better UX
      return;
    }

    const numericValue = parseFloat(stringValue);

    if (!isNaN(numericValue)) {
      // Check if negative values are allowed
      if (!this.allowNegative() && numericValue < 0) {
        target.value = Math.abs(numericValue).toString();
        this.value.set(Math.abs(numericValue));
        return;
      }

      this.value.set(numericValue);
      this.hasError.set(false);
    } else {
      this.hasError.set(true);
    }
  }

  protected handleBlur(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.isFocused.set(false);

    if (target.value === '' || target.value === '-') {
      this.value.set(0);
      target.value = '0';
    }

    const numericValue = parseFloat(target.value);

    if (isNaN(numericValue)) {
      // Reset to current model value if invalid
      target.value = this.value().toString();
      this.hasError.set(false);
      return;
    }

    // Clamp to min/max and update
    const clampedValue = this.clampValue(numericValue);
    this.value.set(clampedValue);

    if (this.formatOnBlur()) {
      target.value = this.formattedValue();
    }

    this.hasError.set(false);
  }

  protected handleFocus(): void {
    this.isFocused.set(true);
  }

  protected handleKeyDown(event: KeyboardEvent): void {
    if (this.disabled()) return;

    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault();
        this.increment();
        break;
      case 'ArrowDown':
        event.preventDefault();
        this.decrement();
        break;
      case 'PageUp':
        event.preventDefault();
        this.increment(10);
        break;
      case 'PageDown':
        event.preventDefault();
        this.decrement(10);
        break;
    }
  }

  protected increment(multiplier = 1): void {
    if (this.disabled() || this.isAtMax()) return;

    const currentValue = this.value();
    const stepValue = this.step() * multiplier;
    const newValue = this.clampValue(currentValue + stepValue);

    this.value.set(newValue);
    this.updateInputValue();
  }

  protected decrement(multiplier = 1): void {
    if (this.disabled() || this.isAtMin()) return;

    const currentValue = this.value();
    const stepValue = this.step() * multiplier;
    const newValue = this.clampValue(currentValue - stepValue);

    this.value.set(newValue);
    this.updateInputValue();
  }

  private clampValue(value: number): number {
    let clampedValue = value;

    const minValue = this.min();
    const maxValue = this.max();

    if (minValue !== undefined) {
      clampedValue = Math.max(minValue, clampedValue);
    }

    if (maxValue !== undefined) {
      clampedValue = Math.min(maxValue, clampedValue);
    }

    // Apply precision rounding if specified
    const precision = this.precision();
    if (precision !== undefined) {
      clampedValue = Math.round(clampedValue * Math.pow(10, precision)) / Math.pow(10, precision);
    }

    return clampedValue;
  }

  private validateAndClampValue(): void {
    const currentValue = this.value();
    const clampedValue = this.clampValue(currentValue);

    if (currentValue !== clampedValue) {
      this.value.set(clampedValue);
    }
  }

  private updateInputValue(): void {
    const inputElement = this.hostRef.nativeElement.querySelector('input') as HTMLInputElement;
    if (inputElement && !this.isFocused()) {
      inputElement.value = this.formattedValue();
    }
  }
}
