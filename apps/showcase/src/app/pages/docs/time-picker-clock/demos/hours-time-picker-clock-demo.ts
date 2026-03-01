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
} from '@semantic-components/ui';
import { ScTimePickerClock } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-hours-time-picker-clock-demo',
  imports: [
    ScTimePicker,
    ScTimePickerClock,
    ScTimePickerInput,
    ScTimePickerHoursInput,
    ScTimePickerMinutesInput,
    ScTimePickerSeparator,
    ScTimePickerPeriod,
    ScTimePickerPeriodAM,
    ScTimePickerPeriodPM,
  ],
  template: `
    <div
      scTimePicker
      format="12h"
      [(value)]="time"
      class="flex flex-col items-center gap-4"
    >
      <div class="flex items-center gap-2">
        <input
          scTimePickerInput
          scTimePickerHoursInput
          (focus)="clockMode.set('hours')"
        />
        <span scTimePickerSeparator>:</span>
        <input
          scTimePickerInput
          scTimePickerMinutesInput
          (focus)="clockMode.set('minutes')"
        />
        <div scTimePickerPeriod>
          <button scTimePickerPeriodAM>AM</button>
          <button scTimePickerPeriodPM>PM</button>
        </div>
      </div>
      <div scTimePickerClock [mode]="clockMode()"></div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HoursTimePickerClockDemo {
  readonly time = signal<ScTimeValue | null>({ hours: 10, minutes: 0 });
  readonly clockMode = signal<'hours' | 'minutes'>('hours');
}
