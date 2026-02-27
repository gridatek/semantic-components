import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScTimePicker,
  ScTimePickerInput,
  ScTimePickerHoursInput,
  ScTimePickerMinutesInput,
  ScTimePickerSecondsInput,
  ScTimePickerSeparator,
  ScTimeValue,
} from '@semantic-components/ui';

@Component({
  selector: 'app-seconds-time-picker-demo',
  imports: [
    ScTimePicker,
    ScTimePickerInput,
    ScTimePickerHoursInput,
    ScTimePickerMinutesInput,
    ScTimePickerSecondsInput,
    ScTimePickerSeparator,
  ],
  template: `
    <div class="flex flex-col gap-4">
      <div scTimePicker format="24h" [showSeconds]="true" [(value)]="time">
        <input scTimePickerInput scTimePickerHoursInput />
        <span scTimePickerSeparator>:</span>
        <input scTimePickerInput scTimePickerMinutesInput />
        <span scTimePickerSeparator>:</span>
        <input scTimePickerInput scTimePickerSecondsInput />
      </div>
      <p class="text-muted-foreground text-sm">
        Selected: {{ formatTime(time()) }}
      </p>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SecondsTimePickerDemo {
  readonly time = signal<ScTimeValue | null>({
    hours: 10,
    minutes: 30,
    seconds: 15,
  });

  formatTime(val: ScTimeValue | null): string {
    if (!val) return 'No time selected';
    return `${val.hours.toString().padStart(2, '0')}:${val.minutes.toString().padStart(2, '0')}:${(val.seconds ?? 0).toString().padStart(2, '0')}`;
  }
}
