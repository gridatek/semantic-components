import {
  computed,
  Directive,
  InjectionToken,
  input,
  model,
} from '@angular/core';
import { cn } from '../../utils';

export type TimeFormat = '12h' | '24h';
export type TimePeriod = 'AM' | 'PM';

export interface TimeValue {
  hours: number;
  minutes: number;
  seconds?: number;
  period?: TimePeriod;
}

// Token for time picker context
export const SC_TIME_PICKER = new InjectionToken<ScTimePicker>(
  'SC_TIME_PICKER',
);

// ============================================================================
// TimePicker
// ============================================================================
@Directive({
  selector: '[sc-time-picker]',
  providers: [{ provide: SC_TIME_PICKER, useExisting: ScTimePicker }],
  host: {
    'data-slot': 'time-picker',
    '[class]': 'class()',
  },
})
export class ScTimePicker {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly format = input<TimeFormat>('12h');
  readonly showSeconds = input<boolean>(false);
  readonly disabled = input<boolean>(false);
  readonly value = model<TimeValue | null>(null);

  protected readonly class = computed(() =>
    cn('inline-flex items-center gap-1', this.classInput()),
  );

  setHours(hours: number): void {
    const current = this.value() || { hours: 0, minutes: 0 };
    this.value.set({ ...current, hours });
  }

  setMinutes(minutes: number): void {
    const current = this.value() || { hours: 0, minutes: 0 };
    this.value.set({ ...current, minutes });
  }

  setSeconds(seconds: number): void {
    const current = this.value() || { hours: 0, minutes: 0 };
    this.value.set({ ...current, seconds });
  }

  setPeriod(period: TimePeriod): void {
    const current = this.value() || { hours: 0, minutes: 0 };
    this.value.set({ ...current, period });
  }

  getFormattedTime(): string {
    const val = this.value();
    if (!val) return '';

    const hours = this.format() === '12h' ? val.hours % 12 || 12 : val.hours;
    const hoursStr = hours.toString().padStart(2, '0');
    const minutesStr = val.minutes.toString().padStart(2, '0');

    let time = `${hoursStr}:${minutesStr}`;

    if (this.showSeconds() && val.seconds !== undefined) {
      time += `:${val.seconds.toString().padStart(2, '0')}`;
    }

    if (this.format() === '12h' && val.period) {
      time += ` ${val.period}`;
    }

    return time;
  }
}
