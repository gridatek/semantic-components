import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';
import { SC_TIME_PICKER } from './time-picker';

// ============================================================================
// TimePickerInput
// ============================================================================
@Component({
  selector: 'input[sc-time-picker-input]',
  template: ``,
  host: {
    'data-slot': 'time-picker-input',
    type: 'text',
    inputmode: 'numeric',
    '[class]': 'class()',
    '[value]': 'displayValue()',
    '[disabled]': 'timePicker.disabled()',
    '[attr.min]': 'min()',
    '[attr.max]': 'max()',
    '[attr.aria-label]': 'ariaLabel()',
    '(input)': 'onInput($event)',
    '(blur)': 'onBlur()',
    '(keydown)': 'onKeydown($event)',
    '(focus)': 'onFocus($event)',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScTimePickerInput {
  readonly timePicker = inject(SC_TIME_PICKER);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly type = input.required<'hours' | 'minutes' | 'seconds'>();
  readonly ariaLabel = input<string>('', { alias: 'aria-label' });

  readonly focused = signal(false);

  protected readonly class = computed(() =>
    cn(
      'w-10 rounded-md border border-input bg-background px-2 py-1.5 text-center text-sm tabular-nums',
      'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
      'disabled:cursor-not-allowed disabled:opacity-50',
      this.classInput(),
    ),
  );

  protected readonly min = computed(() => {
    return 0;
  });

  protected readonly max = computed(() => {
    const type = this.type();
    if (type === 'hours') {
      return this.timePicker.format() === '12h' ? 12 : 23;
    }
    return 59;
  });

  protected readonly displayValue = computed(() => {
    const val = this.timePicker.value();
    if (!val) return '00';

    const type = this.type();
    let num: number;

    if (type === 'hours') {
      num =
        this.timePicker.format() === '12h' ? val.hours % 12 || 12 : val.hours;
    } else if (type === 'minutes') {
      num = val.minutes;
    } else {
      num = val.seconds ?? 0;
    }

    return num.toString().padStart(2, '0');
  });

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value.replace(/\D/g, '');
    const num = parseInt(value, 10);

    if (!isNaN(num)) {
      this.updateValue(Math.min(num, this.max()));
    }
  }

  onBlur(): void {
    this.focused.set(false);
    // Ensure value is within bounds
    const val = this.timePicker.value();
    if (val) {
      const type = this.type();
      if (type === 'hours') {
        const max = this.timePicker.format() === '12h' ? 12 : 23;
        const min = this.timePicker.format() === '12h' ? 1 : 0;
        const clamped = Math.max(min, Math.min(val.hours, max));
        if (clamped !== val.hours) {
          this.timePicker.setHours(clamped);
        }
      }
    }
  }

  onFocus(event: FocusEvent): void {
    this.focused.set(true);
    (event.target as HTMLInputElement).select();
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.increment();
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.decrement();
    }
  }

  private increment(): void {
    const val = this.timePicker.value() || { hours: 0, minutes: 0 };
    const type = this.type();
    const max = this.max();

    if (type === 'hours') {
      const min = this.timePicker.format() === '12h' ? 1 : 0;
      const newVal = val.hours >= max ? min : val.hours + 1;
      this.timePicker.setHours(newVal);
    } else if (type === 'minutes') {
      const newVal = val.minutes >= max ? 0 : val.minutes + 1;
      this.timePicker.setMinutes(newVal);
    } else {
      const newVal = (val.seconds ?? 0) >= max ? 0 : (val.seconds ?? 0) + 1;
      this.timePicker.setSeconds(newVal);
    }
  }

  private decrement(): void {
    const val = this.timePicker.value() || { hours: 0, minutes: 0 };
    const type = this.type();
    const max = this.max();

    if (type === 'hours') {
      const min = this.timePicker.format() === '12h' ? 1 : 0;
      const newVal = val.hours <= min ? max : val.hours - 1;
      this.timePicker.setHours(newVal);
    } else if (type === 'minutes') {
      const newVal = val.minutes <= 0 ? max : val.minutes - 1;
      this.timePicker.setMinutes(newVal);
    } else {
      const newVal = (val.seconds ?? 0) <= 0 ? max : (val.seconds ?? 0) - 1;
      this.timePicker.setSeconds(newVal);
    }
  }

  private updateValue(num: number): void {
    const type = this.type();
    if (type === 'hours') {
      this.timePicker.setHours(num);
    } else if (type === 'minutes') {
      this.timePicker.setMinutes(num);
    } else {
      this.timePicker.setSeconds(num);
    }
  }
}
