import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { HorizontalStepperDemoContainer } from './demos/horizontal-stepper-demo-container';
import { VerticalStepperDemoContainer } from './demos/vertical-stepper-demo-container';
import { SimpleStepperDemoContainer } from './demos/simple-stepper-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentStatusBadge } from '../../../components/component-status-badge/component-status-badge';
import { COMPONENTS } from '../../../data/components';

@Component({
  selector: 'app-stepper-page',
  imports: [
    HorizontalStepperDemoContainer,
    VerticalStepperDemoContainer,
    SimpleStepperDemoContainer,
    TocHeading,
    ComponentStatusBadge,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">Stepper</h1>
        <p class="text-muted-foreground">
          A multi-step wizard component for guiding users through a process.
        </p>
        <app-component-status-badge [status]="componentStatus" />
      </div>

      <section class="space-y-8">
        <h2 toc class="text-xl font-semibold tracking-tight">Examples</h2>
        <app-horizontal-stepper-demo-container />
        <app-vertical-stepper-demo-container />
        <app-simple-stepper-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class StepperPage {
  readonly componentStatus = COMPONENTS.find((c) => c.path === 'stepper')!
    .status;
}
