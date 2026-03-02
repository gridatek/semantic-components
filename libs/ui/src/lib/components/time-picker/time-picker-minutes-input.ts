import { Directive, computed, inject } from '@angular/core';
import { ScTimePickerInput } from './time-picker-input';

@Directive({
  selector: 'input[scTimePickerMinutesInput]',
  host: {
    '[value]': 'displayValue()',
    '[attr.aria-label]': '"Minutes"',
    '(input)': 'onInput($event)',
    '(blur)': 'onBlur()',
    '(keydown)': 'onKeydown($event)',
    '(focus)': 'onFocus($event)',
  },
})
export class ScTimePickerMinutesInput {
  private readonly input = inject(ScTimePickerInput);

  private readonly timePicker = this.input.timePicker;

  protected readonly displayValue = computed(() => {
    const val = this.timePicker.value();
    if (!val) return '00';
    return val.minutes.toString().padStart(2, '0');
  });

  protected onInput(event: Event): void {
    const el = event.target as HTMLInputElement;
    const value = el.value.replace(/\D/g, '');
    const num = parseInt(value, 10);

    if (!isNaN(num)) {
      this.timePicker.setMinutes(Math.min(num, 59));
    }
  }

  protected onBlur(): void {
    this.input.focused.set(false);
  }

  protected onFocus(event: FocusEvent): void {
    this.input.focused.set(true);
    (event.target as HTMLInputElement).select();
  }

  protected onKeydown(event: KeyboardEvent): void {
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      const val = this.timePicker.value() || { hours: 0, minutes: 0 };
      this.timePicker.setMinutes(val.minutes >= 59 ? 0 : val.minutes + 1);
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      const val = this.timePicker.value() || { hours: 0, minutes: 0 };
      this.timePicker.setMinutes(val.minutes <= 0 ? 59 : val.minutes - 1);
    }
  }
}
