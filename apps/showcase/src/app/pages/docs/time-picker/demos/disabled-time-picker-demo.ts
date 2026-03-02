import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
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
      <input scTimePickerInput scTimePickerHoursInput />
      <span scTimePickerSeparator>:</span>
      <input scTimePickerInput scTimePickerMinutesInput />
      <div scTimePickerPeriod>
        <button scTimePickerPeriodAM>AM</button>
        <button scTimePickerPeriodPM>PM</button>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledTimePickerDemo {
  readonly time = signal<ScTimeValue | null>({
    hours: 8,
    minutes: 0,
    period: 'AM',
  });
}
