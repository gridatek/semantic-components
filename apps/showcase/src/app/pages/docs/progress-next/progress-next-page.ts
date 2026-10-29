import { Component, ViewEncapsulation } from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { BasicProgressNextDemoContainer } from './demos/basic-progress-next-demo-container';
import { CircleProgressNextDemoContainer } from './demos/circle-progress-next-demo-container';
import { DownloadProgressNextDemoContainer } from './demos/download-progress-next-demo-container';
import { IndeterminateProgressNextDemoContainer } from './demos/indeterminate-progress-next-demo-container';
import { RtlProgressNextDemoContainer } from './demos/rtl-progress-next-demo-container';
import { StepsProgressNextDemoContainer } from './demos/steps-progress-next-demo-container';

@Component({
  selector: 'app-progress-next-page',
  imports: [
    BasicProgressNextDemoContainer,
    CircleProgressNextDemoContainer,
    IndeterminateProgressNextDemoContainer,
    DownloadProgressNextDemoContainer,
    StepsProgressNextDemoContainer,
    RtlProgressNextDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Progress Next</h1>
        <p class="text-muted-foreground">
          A task's progress as a bar or a circle: a value between a minimum and
          a maximum, or not known yet. Your label names it, your value text is
          what screen readers hear; it fills from the start of the line, and
          stays still when motion is reduced.
        </p>
        <app-component-badges path="progress-next" />
      </div>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-basic-progress-next-demo-container />
        <app-circle-progress-next-demo-container />
        <app-indeterminate-progress-next-demo-container />
        <app-download-progress-next-demo-container />
        <app-steps-progress-next-demo-container />
        <app-rtl-progress-next-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class ProgressNextPage {}
