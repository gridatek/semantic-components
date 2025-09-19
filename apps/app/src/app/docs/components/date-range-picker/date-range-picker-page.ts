import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { DateRangePickerDemoSection } from './date-range-picker-demo-section';

@Component({
  selector: 'app-date-range-picker-page',
  imports: [DateRangePickerDemoSection],
  template: `
    <app-date-range-picker-demo-section />
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DateRangePickerPage {}
