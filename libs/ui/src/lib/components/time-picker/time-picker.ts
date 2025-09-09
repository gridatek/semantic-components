import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
  model,
  signal,
} from '@angular/core';

import { cn } from '@semantic-components/utils';

interface TimeValue {
  hours: number;
  minutes: number;
  seconds?: number;
}

@Component({
  selector: 'div[sc-time-picker]',
  imports: [],
  template: `
    <div class="flex items-center space-x-1">
      <!-- Hours -->
      <div class="flex flex-col">
        <button
          class="p-1 text-xs hover:bg-muted rounded disabled:opacity-50 disabled:cursor-not-allowed"
          [disabled]="disabled()"
          (click)="incrementHours()"
          type="button"
        >
          ▲
        </button>
        <input
          class="w-12 px-2 py-1 text-center text-sm border border-input rounded bg-background focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50 disabled:cursor-not-allowed"
          [value]="formattedHours()"
          [min]="is24HourFormat() ? 0 : 1"
          [max]="is24HourFormat() ? 23 : 12"
          [disabled]="disabled()"
          (input)="onHoursInput($event)"
          (blur)="onHoursBlur($event)"
          type="number"
        />
        <button
          class="p-1 text-xs hover:bg-muted rounded disabled:opacity-50 disabled:cursor-not-allowed"
          [disabled]="disabled()"
          (click)="decrementHours()"
          type="button"
        >
          ▼
        </button>
      </div>

      <span class="text-sm font-medium">:</span>

      <!-- Minutes -->
      <div class="flex flex-col">
        <button
          class="p-1 text-xs hover:bg-muted rounded disabled:opacity-50 disabled:cursor-not-allowed"
          [disabled]="disabled()"
          (click)="incrementMinutes()"
          type="button"
        >
          ▲
        </button>
        <input
          class="w-12 px-2 py-1 text-center text-sm border border-input rounded bg-background focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50 disabled:cursor-not-allowed"
          [value]="formattedMinutes()"
          [disabled]="disabled()"
          (input)="onMinutesInput($event)"
          (blur)="onMinutesBlur($event)"
          type="number"
          min="0"
          max="59"
        />
        <button
          class="p-1 text-xs hover:bg-muted rounded disabled:opacity-50 disabled:cursor-not-allowed"
          [disabled]="disabled()"
          (click)="decrementMinutes()"
          type="button"
        >
          ▼
        </button>
      </div>

      @if (showSeconds()) {
        <span class="text-sm font-medium">:</span>

        <!-- Seconds -->
        <div class="flex flex-col">
          <button
            class="p-1 text-xs hover:bg-muted rounded disabled:opacity-50 disabled:cursor-not-allowed"
            [disabled]="disabled()"
            (click)="incrementSeconds()"
            type="button"
          >
            ▲
          </button>
          <input
            class="w-12 px-2 py-1 text-center text-sm border border-input rounded bg-background focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50 disabled:cursor-not-allowed"
            [value]="formattedSeconds()"
            [disabled]="disabled()"
            (input)="onSecondsInput($event)"
            (blur)="onSecondsBlur($event)"
            type="number"
            min="0"
            max="59"
          />
          <button
            class="p-1 text-xs hover:bg-muted rounded disabled:opacity-50 disabled:cursor-not-allowed"
            [disabled]="disabled()"
            (click)="decrementSeconds()"
            type="button"
          >
            ▼
          </button>
        </div>
      }

      @if (!is24HourFormat()) {
        <!-- AM/PM -->
        <div class="flex flex-col">
          <button
            class="px-2 py-1 text-xs border border-input rounded bg-background hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50 disabled:cursor-not-allowed"
            [disabled]="disabled()"
            (click)="toggleAmPm()"
            type="button"
          >
            {{ period() }}
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
export class ScTimePicker {
  readonly classInput = input<string>('', {
    alias: 'class',
  });

  readonly value = model<TimeValue>({ hours: 12, minutes: 0, seconds: 0 });
  readonly is24HourFormat = input<boolean>(true);
  readonly showSeconds = input<boolean>(false);
  readonly disabled = input<boolean>(false);
  readonly step = input<number>(1);

  protected readonly period = signal<'AM' | 'PM'>('AM');

  protected readonly class = computed(() => cn('inline-flex items-center', this.classInput()));

  protected readonly formattedHours = computed(() => {
    const hours = this.value().hours;
    if (this.is24HourFormat()) {
      return hours.toString().padStart(2, '0');
    } else {
      const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
      return displayHours.toString().padStart(2, '0');
    }
  });

  protected readonly formattedMinutes = computed(() => {
    return this.value().minutes.toString().padStart(2, '0');
  });

  protected readonly formattedSeconds = computed(() => {
    return (this.value().seconds || 0).toString().padStart(2, '0');
  });

  constructor() {
    // Initialize period based on initial hours
    const initialHours = this.value().hours;
    this.period.set(initialHours >= 12 ? 'PM' : 'AM');
  }

  protected incrementHours(): void {
    if (this.disabled()) return;

    const current = this.value();
    let newHours = current.hours + 1;

    if (this.is24HourFormat()) {
      if (newHours > 23) newHours = 0;
    } else {
      if (newHours > 12) newHours = 1;
    }

    this.updateTime({ ...current, hours: newHours });
  }

  protected decrementHours(): void {
    if (this.disabled()) return;

    const current = this.value();
    let newHours = current.hours - 1;

    if (this.is24HourFormat()) {
      if (newHours < 0) newHours = 23;
    } else {
      if (newHours < 1) newHours = 12;
    }

    this.updateTime({ ...current, hours: newHours });
  }

  protected incrementMinutes(): void {
    if (this.disabled()) return;

    const current = this.value();
    let newMinutes = current.minutes + this.step();
    let newHours = current.hours;

    if (newMinutes > 59) {
      newMinutes = newMinutes - 60;
      newHours = this.is24HourFormat() ? (newHours + 1) % 24 : newHours === 12 ? 1 : newHours + 1;
    }

    this.updateTime({ ...current, hours: newHours, minutes: newMinutes });
  }

  protected decrementMinutes(): void {
    if (this.disabled()) return;

    const current = this.value();
    let newMinutes = current.minutes - this.step();
    let newHours = current.hours;

    if (newMinutes < 0) {
      newMinutes = newMinutes + 60;
      newHours = this.is24HourFormat()
        ? newHours === 0
          ? 23
          : newHours - 1
        : newHours === 1
          ? 12
          : newHours - 1;
    }

    this.updateTime({ ...current, hours: newHours, minutes: newMinutes });
  }

  protected incrementSeconds(): void {
    if (this.disabled()) return;

    const current = this.value();
    let newSeconds = (current.seconds || 0) + this.step();
    let newMinutes = current.minutes;
    let newHours = current.hours;

    if (newSeconds > 59) {
      newSeconds = newSeconds - 60;
      newMinutes++;
      if (newMinutes > 59) {
        newMinutes = 0;
        newHours = this.is24HourFormat() ? (newHours + 1) % 24 : newHours === 12 ? 1 : newHours + 1;
      }
    }

    this.updateTime({ ...current, hours: newHours, minutes: newMinutes, seconds: newSeconds });
  }

  protected decrementSeconds(): void {
    if (this.disabled()) return;

    const current = this.value();
    let newSeconds = (current.seconds || 0) - this.step();
    let newMinutes = current.minutes;
    let newHours = current.hours;

    if (newSeconds < 0) {
      newSeconds = newSeconds + 60;
      newMinutes--;
      if (newMinutes < 0) {
        newMinutes = 59;
        newHours = this.is24HourFormat()
          ? newHours === 0
            ? 23
            : newHours - 1
          : newHours === 1
            ? 12
            : newHours - 1;
      }
    }

    this.updateTime({ ...current, hours: newHours, minutes: newMinutes, seconds: newSeconds });
  }

  protected toggleAmPm(): void {
    if (this.disabled() || this.is24HourFormat()) return;

    const current = this.value();
    const newPeriod = this.period() === 'AM' ? 'PM' : 'AM';
    let newHours = current.hours;

    if (newPeriod === 'PM' && newHours < 12) {
      newHours += 12;
    } else if (newPeriod === 'AM' && newHours >= 12) {
      newHours -= 12;
    }

    this.period.set(newPeriod);
    this.updateTime({ ...current, hours: newHours });
  }

  protected onHoursInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = parseInt(target.value);
    if (!isNaN(value)) {
      const current = this.value();
      this.updateTime({ ...current, hours: value });
    }
  }

  protected onHoursBlur(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = parseInt(target.value);
    if (isNaN(value)) {
      target.value = this.formattedHours();
      return;
    }

    const current = this.value();
    let validHours = value;

    if (this.is24HourFormat()) {
      validHours = Math.max(0, Math.min(23, value));
    } else {
      validHours = Math.max(1, Math.min(12, value));
    }

    target.value = validHours.toString().padStart(2, '0');
    this.updateTime({ ...current, hours: validHours });
  }

  protected onMinutesInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = parseInt(target.value);
    if (!isNaN(value)) {
      const current = this.value();
      this.updateTime({ ...current, minutes: value });
    }
  }

  protected onMinutesBlur(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = parseInt(target.value);
    if (isNaN(value)) {
      target.value = this.formattedMinutes();
      return;
    }

    const current = this.value();
    const validMinutes = Math.max(0, Math.min(59, value));
    target.value = validMinutes.toString().padStart(2, '0');
    this.updateTime({ ...current, minutes: validMinutes });
  }

  protected onSecondsInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = parseInt(target.value);
    if (!isNaN(value)) {
      const current = this.value();
      this.updateTime({ ...current, seconds: value });
    }
  }

  protected onSecondsBlur(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = parseInt(target.value);
    if (isNaN(value)) {
      target.value = this.formattedSeconds();
      return;
    }

    const current = this.value();
    const validSeconds = Math.max(0, Math.min(59, value));
    target.value = validSeconds.toString().padStart(2, '0');
    this.updateTime({ ...current, seconds: validSeconds });
  }

  private updateTime(newTime: TimeValue): void {
    this.value.set(newTime);

    // Update period for 12-hour format
    if (!this.is24HourFormat()) {
      this.period.set(newTime.hours >= 12 ? 'PM' : 'AM');
    }
  }
}
