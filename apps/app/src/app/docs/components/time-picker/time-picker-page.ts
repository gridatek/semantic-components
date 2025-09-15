import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { TimePicker12HourDemoSection } from './time-picker-12-hour-demo-section';
import { TimePicker24HourDemoSection } from './time-picker-24-hour-demo-section';
import { TimePickerDisabledDemoSection } from './time-picker-disabled-demo-section';
import { TimePickerInteractiveDemoSection } from './time-picker-interactive-demo-section';
import { TimePickerMultipleDemoSection } from './time-picker-multiple-demo-section';
import { TimePickerStepDemoSection } from './time-picker-step-demo-section';
import { TimePickerWithSecondsDemoSection } from './time-picker-with-seconds-demo-section';

@Component({
  selector: 'app-time-picker-page',
  imports: [
    TimePicker24HourDemoSection,
    TimePicker12HourDemoSection,
    TimePickerWithSecondsDemoSection,
    TimePickerStepDemoSection,
    TimePickerDisabledDemoSection,
    TimePickerInteractiveDemoSection,
    TimePickerMultipleDemoSection,
  ],
  template: `
    <div class="space-y-8">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Time Picker</h1>
        <p class="text-lg text-muted-foreground mt-2">
          A time picker component for selecting time values with support for 12/24-hour formats.
        </p>
      </div>

      <app-time-picker-24-hour-demo-section title="24-hour format" level="2" />
      <app-time-picker-12-hour-demo-section title="12-hour format" level="2" />
      <app-time-picker-with-seconds-demo-section title="With seconds" level="2" />
      <app-time-picker-step-demo-section title="Custom step" level="2" />
      <app-time-picker-disabled-demo-section title="Disabled state" level="2" />
      <app-time-picker-interactive-demo-section title="Interactive example" level="2" />
      <app-time-picker-multiple-demo-section title="Multiple time pickers" level="2" />
    </div>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TimePickerPage {}
