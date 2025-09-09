import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { ClockPicker12hDemoSection } from './clock-picker-12h-demo-section';
import { ClockPicker24hDemoSection } from './clock-picker-24h-demo-section';
import { ClockPickerDisabledDemoSection } from './clock-picker-disabled-demo-section';

@Component({
  selector: 'app-clock-picker-page',
  imports: [ClockPicker12hDemoSection, ClockPicker24hDemoSection, ClockPickerDisabledDemoSection],
  template: `
    <app-clock-picker-12h-demo-section />
    <app-clock-picker-24h-demo-section />
    <app-clock-picker-disabled-demo-section />
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ClockPickerPage {}
