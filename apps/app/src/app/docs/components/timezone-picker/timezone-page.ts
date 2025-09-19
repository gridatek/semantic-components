import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { TimezoneDemoSection } from './timezone-demo-section';

@Component({
  selector: 'app-timezone-page',
  imports: [TimezoneDemoSection],
  template: `
    <app-timezone-demo-section />
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TimezonePage {}
