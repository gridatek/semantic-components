import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ActivityTimelineDemoContainer } from './demos/activity-timeline-demo-container';
import { BasicTimelineDemoContainer } from './demos/basic-timeline-demo-container';
import { SizesTimelineDemoContainer } from './demos/sizes-timeline-demo-container';
import { StatusTimelineDemoContainer } from './demos/status-timeline-demo-container';
import { TrackingTimelineDemoContainer } from './demos/tracking-timeline-demo-container';

@Component({
  selector: 'app-timeline-page',
  imports: [
    BasicTimelineDemoContainer,
    StatusTimelineDemoContainer,
    SizesTimelineDemoContainer,
    ActivityTimelineDemoContainer,
    TrackingTimelineDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Timeline</h1>
        <p class="text-muted-foreground">
          Display a sequence of events or activities in chronological order.
        </p>
        <app-component-badges path="timeline" />
      </div>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-basic-timeline-demo-container />
        <app-status-timeline-demo-container />
        <app-sizes-timeline-demo-container />
        <app-activity-timeline-demo-container />
        <app-tracking-timeline-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TimelinePage {}
