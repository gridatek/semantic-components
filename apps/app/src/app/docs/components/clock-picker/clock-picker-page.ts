import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { ClockPickerDemoSection } from './clock-picker-demo-section';

@Component({
  selector: 'app-clock-picker-page',
  imports: [ClockPickerDemoSection],
  template: `
    <app-clock-picker-demo-section />

    <h2 class="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight my-10">Examples</h2>

    <app-clock-picker-demo-section title="Interactive Clock Picker" level="3" />
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ClockPickerPage {}
