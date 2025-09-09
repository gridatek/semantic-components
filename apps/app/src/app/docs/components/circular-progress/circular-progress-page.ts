import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { CircularProgressDemoSection } from './circular-progress-demo-section';

@Component({
  selector: 'app-circular-progress-page',
  imports: [CircularProgressDemoSection],
  template: `
    <app-circular-progress-demo-section />
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CircularProgressPage {}
