import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { ToggleSwitchDemoSection } from './toggle-switch-demo-section';

@Component({
  selector: 'app-toggle-switch-page',
  imports: [ToggleSwitchDemoSection],
  template: `
    <app-toggle-switch-demo-section />
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ToggleSwitchPage {}
