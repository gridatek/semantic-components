import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { StepperDemoSection } from './stepper-demo-section';

@Component({
  selector: 'app-stepper-page',
  imports: [StepperDemoSection],
  template: `
    <app-stepper-demo-section />

    <h2 class="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight my-10">Examples</h2>

    <app-stepper-demo-section title="Basic Usage" level="3" />
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class StepperPage {}
