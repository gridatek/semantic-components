import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { BasicProgressDemoContainer } from './demos/basic-progress-demo-container';
import { CustomMaxProgressDemoContainer } from './demos/custom-max-progress-demo-container';
import { CustomStylingProgressDemoContainer } from './demos/custom-styling-progress-demo-container';
import { SignalFormsProgressDemoContainer } from './demos/signal-forms-progress-demo-container';
import { ValuesProgressDemoContainer } from './demos/values-progress-demo-container';

@Component({
  selector: 'app-progress-page',
  imports: [
    BasicProgressDemoContainer,
    ValuesProgressDemoContainer,
    CustomMaxProgressDemoContainer,
    CustomStylingProgressDemoContainer,
    SignalFormsProgressDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Progress</h1>
        <p class="text-muted-foreground">
          Displays an indicator showing the completion progress of a task,
          typically displayed as a progress bar.
        </p>
        <app-component-badges path="progress" />
      </div>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
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
export default class ProgressPage {}
