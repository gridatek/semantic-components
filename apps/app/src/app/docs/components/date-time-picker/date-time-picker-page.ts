import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { DateTimePickerDemoSection } from './date-time-picker-demo-section';

@Component({
  selector: 'app-date-time-picker-page',
  imports: [DateTimePickerDemoSection],
  template: `
    <app-date-time-picker-demo-section />
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DateTimePickerPage {}
