import { Component, ViewEncapsulation } from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { BasicProgressDemoContainer } from './demos/basic-progress-demo-container';
import { CircleProgressDemoContainer } from './demos/circle-progress-demo-container';
import { DownloadProgressDemoContainer } from './demos/download-progress-demo-container';
import { IndeterminateProgressDemoContainer } from './demos/indeterminate-progress-demo-container';
import { RtlProgressDemoContainer } from './demos/rtl-progress-demo-container';
import { StepsProgressDemoContainer } from './demos/steps-progress-demo-container';

@Component({
  selector: 'app-progress-page',
  imports: [
    BasicProgressDemoContainer,
    CircleProgressDemoContainer,
    IndeterminateProgressDemoContainer,
    DownloadProgressDemoContainer,
    StepsProgressDemoContainer,
    RtlProgressDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Progress</h1>
        <p class="text-muted-foreground">
          A task's progress as a bar or a circle: a value between a minimum and
          a maximum, or not known yet. Your label names it, your value text is
          what screen readers hear; it fills from the start of the line, and
          stays still when motion is reduced.
        </p>
        <app-component-badges path="progress" />
      </div>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-basic-progress-demo-container />
        <app-circle-progress-demo-container />
        <app-indeterminate-progress-demo-container />
        <app-download-progress-demo-container />
        <app-steps-progress-demo-container />
        <app-rtl-progress-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class ProgressPage {}
