import { computed, Directive, inject } from '@angular/core';
import { ScTimePickerInput } from './time-picker-input';

@Directive({
  selector: 'input[scTimePickerSecondsInput]',
  host: {
    '[value]': 'displayValue()',
    '[attr.aria-label]': '"Seconds"',
    '(input)': 'onInput($event)',
    '(blur)': 'onBlur()',
    '(keydown)': 'onKeydown($event)',
    '(focus)': 'onFocus($event)',
  },
})
export class ScTimePickerSecondsInput {
  private readonly input = inject(ScTimePickerInput);

  private readonly timePicker = this.input.timePicker;

  protected readonly displayValue = computed(() => {
    const val = this.timePicker.value();
    if (!val) return '00';
    return (val.seconds ?? 0).toString().padStart(2, '0');
  });

  protected onInput(event: Event): void {
    const el = event.target as HTMLInputElement;
    const value = el.value.replace(/\D/g, '');
    const num = parseInt(value, 10);

    if (!isNaN(num)) {
      this.timePicker.setSeconds(Math.min(num, 59));
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
      this.timePicker.setSeconds(
        (val.seconds ?? 0) >= 59 ? 0 : (val.seconds ?? 0) + 1,
      );
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      const val = this.timePicker.value() || { hours: 0, minutes: 0 };
      this.timePicker.setSeconds(
        (val.seconds ?? 0) <= 0 ? 59 : (val.seconds ?? 0) - 1,
      );
    }
  }
}
