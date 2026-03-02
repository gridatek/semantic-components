import { Directive, computed, inject } from '@angular/core';
import { ScTimePickerInput } from './time-picker-input';

@Directive({
  selector: 'input[scTimePickerHoursInput]',
  host: {
    '[value]': 'displayValue()',
    '[attr.aria-label]': '"Hours"',
    '(input)': 'onInput($event)',
    '(blur)': 'onBlur()',
    '(keydown)': 'onKeydown($event)',
    '(focus)': 'onFocus($event)',
  },
})
export class ScTimePickerHoursInput {
  private readonly input = inject(ScTimePickerInput);

  private readonly timePicker = this.input.timePicker;

  private readonly max = computed(() =>
    this.timePicker.format() === '12h' ? 12 : 23,
  );

  private readonly min = computed(() =>
    this.timePicker.format() === '12h' ? 1 : 0,
  );

  protected readonly displayValue = computed(() => {
    const val = this.timePicker.value();
    if (!val) return '00';

    const num =
      this.timePicker.format() === '12h' ? val.hours % 12 || 12 : val.hours;
    return num.toString().padStart(2, '0');
  });

  protected onInput(event: Event): void {
    const el = event.target as HTMLInputElement;
    const value = el.value.replace(/\D/g, '');
    const num = parseInt(value, 10);

    if (!isNaN(num)) {
      this.timePicker.setHours(Math.min(num, this.max()));
    }
  }

  protected onBlur(): void {
    this.input.focused.set(false);
    const val = this.timePicker.value();
    if (val) {
      const clamped = Math.max(this.min(), Math.min(val.hours, this.max()));
      if (clamped !== val.hours) {
        this.timePicker.setHours(clamped);
      }
    }
  }

  protected onFocus(event: FocusEvent): void {
    this.input.focused.set(true);
    (event.target as HTMLInputElement).select();
  }

  protected onKeydown(event: KeyboardEvent): void {
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      const val = this.timePicker.value() || { hours: 0, minutes: 0 };
      this.timePicker.setHours(
        val.hours >= this.max() ? this.min() : val.hours + 1,
      );
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      const val = this.timePicker.value() || { hours: 0, minutes: 0 };
      this.timePicker.setHours(
        val.hours <= this.min() ? this.max() : val.hours - 1,
      );
    }
  }
}
