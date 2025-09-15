import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  effect,
  input,
  model,
  signal,
} from '@angular/core';

import { cn } from '@semantic-components/utils';

import { ScInputNumber } from '../input-number/input-number';

interface TimeValue {
  hours: number;
  minutes: number;
  seconds?: number;
}

@Component({
  selector: 'div[sc-time-picker]',
  imports: [ScInputNumber],
  template: `
    <div class="flex items-center space-x-1">
      <!-- Hours -->
      <div
        class="w-16"
        [(value)]="hoursValue"
        [min]="is24HourFormat() ? 0 : 1"
        [max]="is24HourFormat() ? 23 : 12"
        [disabled]="disabled()"
        [showControls]="true"
        [step]="1"
        sc-input-number
      ></div>

      <span class="text-sm font-medium">:</span>

      <!-- Minutes -->
      <div
        class="w-16"
        [(value)]="minutesValue"
        [min]="0"
        [max]="59"
        [disabled]="disabled()"
        [showControls]="true"
        [step]="step()"
        sc-input-number
      ></div>

      @if (showSeconds()) {
        <span class="text-sm font-medium">:</span>

        <!-- Seconds -->
        <div
          class="w-16"
          [(value)]="secondsValue"
          [min]="0"
          [max]="59"
          [disabled]="disabled()"
          [showControls]="true"
          [step]="step()"
          sc-input-number
        ></div>
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

  protected readonly hoursValue = signal(0);
  protected readonly minutesValue = signal(0);
  protected readonly secondsValue = signal(0);

  constructor() {
    // Initialize period based on initial hours
    const initialHours = this.value().hours;
    this.period.set(initialHours >= 12 ? 'PM' : 'AM');

    // Initialize signal values
    this.updateSignalValues();

    // Sync main value to individual signals
    effect(() => {
      this.updateSignalValues();
    });

    // Sync individual signals back to main value
    effect(() => {
      const hours = this.hoursValue();
      const current = this.value();
      let actualHours = hours;

      if (!this.is24HourFormat()) {
        const isPM = this.period() === 'PM';
        if (hours === 12) {
          actualHours = isPM ? 12 : 0;
        } else {
          actualHours = isPM ? hours + 12 : hours;
        }
      }

      if (actualHours !== current.hours) {
        this.updateTime({ ...current, hours: actualHours });
      }
    });

    effect(() => {
      const minutes = this.minutesValue();
      const current = this.value();
      if (minutes !== current.minutes) {
        this.updateTime({ ...current, minutes });
      }
    });

    effect(() => {
      const seconds = this.secondsValue();
      const current = this.value();
      if (seconds !== (current.seconds || 0)) {
        this.updateTime({ ...current, seconds });
      }
    });
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

  private updateTime(newTime: TimeValue): void {
    this.value.set(newTime);

    // Update period for 12-hour format
    if (!this.is24HourFormat()) {
      this.period.set(newTime.hours >= 12 ? 'PM' : 'AM');
    }
  }

  private updateSignalValues(): void {
    const current = this.value();

    // Update hours for display
    if (this.is24HourFormat()) {
      this.hoursValue.set(current.hours);
    } else {
      const displayHours =
        current.hours === 0 ? 12 : current.hours > 12 ? current.hours - 12 : current.hours;
      this.hoursValue.set(displayHours);
    }

    this.minutesValue.set(current.minutes);
    this.secondsValue.set(current.seconds || 0);
  }
}
