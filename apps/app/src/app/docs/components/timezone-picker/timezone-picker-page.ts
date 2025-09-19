import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { TimezonePickerDemoSection } from './timezone-picker-demo-section';

@Component({
  selector: 'app-timezone-picker-page',
  imports: [TimezonePickerDemoSection],
  template: `
    <app-timezone-picker-demo-section />
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TimezonePickerPage {}
