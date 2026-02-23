import {
  computed,
  Directive,
  InjectionToken,
  input,
  model,
} from '@angular/core';
import { cn } from '../../utils';

export type ScTimeFormat = '12h' | '24h';
export type ScTimePeriod = 'AM' | 'PM';

export interface ScTimeValue {
  hours: number;
  minutes: number;
  seconds?: number;
  period?: ScTimePeriod;
}

export const SC_TIME_PICKER = new InjectionToken<ScTimePicker>(
  'SC_TIME_PICKER',
);

@Directive({
  selector: '[scTimePicker]',
  providers: [{ provide: SC_TIME_PICKER, useExisting: ScTimePicker }],
  host: {
    'data-slot': 'time-picker',
    '[class]': 'class()',
  },
})
export class ScTimePicker {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly format = input<ScTimeFormat>('12h');
  readonly showSeconds = input<boolean>(false);
  readonly disabled = input<boolean>(false);
  readonly value = model<ScTimeValue | null>(null);

  protected readonly class = computed(() =>
    cn('inline-flex items-center gap-1', this.classInput()),
  );

  readonly formattedTime = computed(() => {
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
  });

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

  setPeriod(period: ScTimePeriod): void {
    const current = this.value() || { hours: 0, minutes: 0 };
    this.value.set({ ...current, period });
  }
}
