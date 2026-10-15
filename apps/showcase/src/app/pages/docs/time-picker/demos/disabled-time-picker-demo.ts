import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScTimePicker,
  ScTimePickerHoursInput,
  ScTimePickerInput,
  ScTimePickerMinutesInput,
  ScTimePickerPeriod,
  ScTimePickerPeriodAM,
  ScTimePickerPeriodPM,
  ScTimePickerSeparator,
  ScTimeValue,
} from '@semantic-components/ui';

@Component({
  selector: 'app-disabled-time-picker-demo',
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
    <div scTimePicker format="12h" [disabled]="true" [(value)]="time">
      <input scTimePickerInput scTimePickerHoursInput aria-label="Hours" />
      <span scTimePickerSeparator>:</span>
      <input scTimePickerInput scTimePickerMinutesInput aria-label="Minutes" />
      <div scTimePickerPeriod>
        <button scTimePickerPeriodAM>AM</button>
        <button scTimePickerPeriodPM>PM</button>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledTimePickerDemo {
  readonly time = signal<ScTimeValue | null>({
    hours: 8,
    minutes: 0,
    period: 'AM',
  });
}
