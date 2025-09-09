import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { TimePickerDemoSection } from './time-picker-demo-section';

@Component({
  selector: 'app-time-picker-page',
  imports: [TimePickerDemoSection],
  template: `
    <app-time-picker-demo-section />
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TimePickerPage {}
