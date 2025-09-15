import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { TimePicker12HourDemo } from './time-picker-12-hour-demo';
import { TimePicker24HourDemo } from './time-picker-24-hour-demo';
import { TimePickerDisabledDemo } from './time-picker-disabled-demo';
import { TimePickerInteractiveDemo } from './time-picker-interactive-demo';
import { TimePickerMultipleDemo } from './time-picker-multiple-demo';
import { TimePickerStepDemo } from './time-picker-step-demo';
import { TimePickerWithSecondsDemo } from './time-picker-with-seconds-demo';

@Component({
  selector: 'app-time-picker-demo',
  imports: [
    TimePicker24HourDemo,
    TimePicker12HourDemo,
    TimePickerWithSecondsDemo,
    TimePickerStepDemo,
    TimePickerDisabledDemo,
    TimePickerInteractiveDemo,
    TimePickerMultipleDemo,
  ],
  template: `
    <div class="space-y-8">
      <app-time-picker-24-hour-demo />
      <app-time-picker-12-hour-demo />
      <app-time-picker-with-seconds-demo />
      <app-time-picker-step-demo />
      <app-time-picker-disabled-demo />
      <app-time-picker-interactive-demo />
      <app-time-picker-multiple-demo />
    </div>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimePickerDemo {}
