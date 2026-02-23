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
  ScTimePickerSeparator,
  ScTimePickerPeriod,
  ScTimePickerPeriodAM,
  ScTimePickerPeriodPM,
  ScTimeValue,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-format-12h-time-picker-demo',
  imports: [
    ScTimePicker,
    ScTimePickerInput,
    ScTimePickerHoursInput,
    ScTimePickerMinutesInput,
    ScTimePickerSeparator,
    ScTimePickerPeriod,
    ScTimePickerPeriodAM,
    ScTimePickerPeriodPM,
  ],
  template: `
    <div class="flex flex-col gap-4">
      <div scTimePicker format="12h" [(value)]="time">
        <input scTimePickerInput scTimePickerHoursInput />
        <span scTimePickerSeparator>:</span>
        <input scTimePickerInput scTimePickerMinutesInput />
        <div scTimePickerPeriod>
          <button scTimePickerPeriodAM>AM</button>
          <button scTimePickerPeriodPM>PM</button>
        </div>
      </div>
      <p class="text-sm text-muted-foreground">
        Selected: {{ formatTime(time()) }}
      </p>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Format12hTimePickerDemo {
  readonly time = signal<ScTimeValue | null>({
    hours: 9,
    minutes: 30,
    period: 'AM',
  });

  formatTime(val: ScTimeValue | null): string {
    if (!val) return 'No time selected';
    const hours = val.hours % 12 || 12;
    const period = val.period || (val.hours >= 12 ? 'PM' : 'AM');
    return `${hours.toString().padStart(2, '0')}:${val.minutes.toString().padStart(2, '0')} ${period}`;
  }
}
