import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { StepperDemoSection } from './stepper-demo-section';

@Component({
  selector: 'app-stepper-page',
  imports: [StepperDemoSection],
  template: `
    <app-stepper-demo-section />
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class StepperPage {}
