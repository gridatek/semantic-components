import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '../../utils';
import { inputStyles } from '../input';
import { SC_NUMBER } from './number';

@Directive({
  selector: 'input[scNumberInput]',
  host: {
    'data-slot': 'number-input',
    type: 'text',
    inputmode: 'decimal',
    role: 'spinbutton',
    '[class]': 'class()',
    '[value]': 'displayValue()',
    '[disabled]': 'number.disabled()',
    '[attr.aria-valuemin]': 'number.min()',
    '[attr.aria-valuemax]': 'number.max()',
    '[attr.aria-valuenow]': 'number.value()',
    '(input)': 'onInput($event)',
    '(blur)': 'onBlur()',
    '(keydown)': 'onKeydown($event)',
  },
})
export class ScNumberInput {
  readonly number = inject(SC_NUMBER);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      inputStyles,
      'text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none',
      this.classInput(),
    ),
  );

  protected readonly displayValue = computed(() => {
    const val = this.number.value();
    return this.number.formatValue(val);
  });

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value.trim();

    if (value === '' || value === '-') {
      return; // Allow typing negative numbers
    }

    const parsed = parseFloat(value);
    if (!isNaN(parsed)) {
      // Don't clamp while typing, just update
      this.number.value.set(parsed);
    }
  }

  onBlur(): void {
    // On blur, clamp to min/max and handle empty
    const val = this.number.value();
    if (val === null) {
      if (!this.number.allowEmpty()) {
        this.number.setValue(this.number.min() ?? 0);
      }
    } else {
      this.number.setValue(val);
    }
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.number.increment();
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.number.decrement();
    }
  }
}
