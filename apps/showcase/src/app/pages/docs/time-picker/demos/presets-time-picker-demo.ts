import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScTimePicker,
  ScTimePickerInput,
  ScTimePickerSeparator,
  ScTimePickerPeriod,
  TimeValue,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-presets-time-picker-demo',
  imports: [
    ScTimePicker,
    ScTimePickerInput,
    ScTimePickerSeparator,
    ScTimePickerPeriod,
  ],
  template: `
    <div class="space-y-4">
      <div class="flex flex-wrap gap-2">
        <button
          type="button"
          class="rounded-md border px-3 py-1.5 text-sm hover:bg-accent"
          (click)="setPreset(9, 0, 'AM')"
        >
          9:00 AM
        </button>
        <button
          type="button"
          class="rounded-md border px-3 py-1.5 text-sm hover:bg-accent"
          (click)="setPreset(12, 0, 'PM')"
        >
          12:00 PM
        </button>
        <button
          type="button"
          class="rounded-md border px-3 py-1.5 text-sm hover:bg-accent"
          (click)="setPreset(3, 30, 'PM')"
        >
          3:30 PM
        </button>
        <button
          type="button"
          class="rounded-md border px-3 py-1.5 text-sm hover:bg-accent"
          (click)="setPreset(6, 0, 'PM')"
        >
          6:00 PM
        </button>
      </div>
      <div sc-time-picker format="12h" [(value)]="time">
        <input sc-time-picker-input type="hours" aria-label="Hours" />
        <span sc-time-picker-separator>:</span>
        <input sc-time-picker-input type="minutes" aria-label="Minutes" />
        <div sc-time-picker-period></div>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PresetsTimePickerDemo {
  readonly time = signal<TimeValue | null>(null);

  setPreset(hours: number, minutes: number, period: 'AM' | 'PM'): void {
    const adjustedHours =
      period === 'PM' && hours !== 12
        ? hours + 12
        : period === 'AM' && hours === 12
          ? 0
          : hours;
    this.time.set({ hours: adjustedHours, minutes, period });
  }
}
