import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { BasicProgressDemoContainer } from './demos/basic-progress-demo-container';
import { CustomMaxProgressDemoContainer } from './demos/custom-max-progress-demo-container';
import { CustomStylingProgressDemoContainer } from './demos/custom-styling-progress-demo-container';
import { SignalFormsProgressDemoContainer } from './demos/signal-forms-progress-demo-container';
import { ValuesProgressDemoContainer } from './demos/values-progress-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentStatusBadge } from '../../../components/component-status-badge/component-status-badge';
import { COMPONENTS } from '../../../data/components';

@Component({
  selector: 'app-progress-page',
  imports: [
    BasicProgressDemoContainer,
    ValuesProgressDemoContainer,
    CustomMaxProgressDemoContainer,
    CustomStylingProgressDemoContainer,
    SignalFormsProgressDemoContainer,
    TocHeading,
    ComponentStatusBadge,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">Progress</h1>
        <p class="text-muted-foreground">
          Displays an indicator showing the completion progress of a task,
          typically displayed as a progress bar.
        </p>
        <app-component-status-badge [status]="componentStatus" />
      </div>

      <section class="space-y-8">
        <h2 toc class="text-xl font-semibold tracking-tight">Examples</h2>
        <app-basic-progress-demo-container />
        <app-values-progress-demo-container />
        <app-custom-max-progress-demo-container />
        <app-custom-styling-progress-demo-container />
        <app-signal-forms-progress-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProgressPage {
  readonly componentStatus = COMPONENTS.find((c) => c.path === 'progress')!
    .status;
}
