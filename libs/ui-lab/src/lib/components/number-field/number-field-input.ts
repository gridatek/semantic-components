import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';
import { SC_NUMBER_FIELD } from './number-field';

@Component({
  selector: 'input[sc-number-field-input]',
  template: ``,
  host: {
    'data-slot': 'number-field-input',
    type: 'text',
    inputmode: 'decimal',
    '[class]': 'class()',
    '[value]': 'displayValue()',
    '[disabled]': 'numberField.disabled()',
    '[attr.aria-valuemin]': 'numberField.min()',
    '[attr.aria-valuemax]': 'numberField.max()',
    '[attr.aria-valuenow]': 'numberField.value()',
    '(input)': 'onInput($event)',
    '(blur)': 'onBlur()',
    '(keydown)': 'onKeydown($event)',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScNumberFieldInput {
  readonly numberField = inject(SC_NUMBER_FIELD);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'h-9 w-full bg-transparent px-3 py-1 text-sm text-center',
      'focus:outline-none',
      'disabled:cursor-not-allowed',
      '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none',
      this.classInput(),
    ),
  );

  protected readonly displayValue = computed(() => {
    const val = this.numberField.value();
    return this.numberField.formatValue(val);
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
      this.numberField.value.set(parsed);
    }
  }

  onBlur(): void {
    // On blur, clamp to min/max and handle empty
    const val = this.numberField.value();
    if (val === null) {
      if (!this.numberField.allowEmpty()) {
        this.numberField.setValue(this.numberField.min() ?? 0);
      }
    } else {
      this.numberField.setValue(val);
    }
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.numberField.increment();
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.numberField.decrement();
    }
  }
}
