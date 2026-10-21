import { Component, ViewEncapsulation } from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ActivityTimelineNextDemoContainer } from './demos/activity-timeline-next-demo-container';
import { AlternateTimelineNextDemoContainer } from './demos/alternate-timeline-next-demo-container';
import { HorizontalTimelineNextDemoContainer } from './demos/horizontal-timeline-next-demo-container';
import { PendingTimelineNextDemoContainer } from './demos/pending-timeline-next-demo-container';
import { TrackingTimelineNextDemoContainer } from './demos/tracking-timeline-next-demo-container';

@Component({
  selector: 'app-timeline-next-page',
  imports: [
    ActivityTimelineNextDemoContainer,
    TrackingTimelineNextDemoContainer,
    AlternateTimelineNextDemoContainer,
    HorizontalTimelineNextDemoContainer,
    PendingTimelineNextDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Timeline Next</h1>
        <p class="text-muted-foreground">
          The timeline, rebuilt: an ordered list of events, the line drawn
          between their markers; progress by status; times written from Temporal
          values; down one side, both, or across.
        </p>
        <app-component-badges path="timeline-next" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Activity</h2>
        <p class="text-muted-foreground">
          A feed: an icon in each marker, and when — written in the app's
          language from a Temporal value, its datetime set.
        </p>
        <app-activity-timeline-next-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Tracking</h2>
        <p class="text-muted-foreground">
          Progress: done (filled, solid line), current (a ring —
          aria-current="step"), to come (outlined, dashed). The status is said
          in words too.
        </p>
        <app-tracking-timeline-next-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Alternate</h2>
        <p class="text-muted-foreground">
          A history down a centred line, the events in turn on each side, their
          dates facing them.
        </p>
        <app-alternate-timeline-next-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Horizontal</h2>
        <p class="text-muted-foreground">
          Across, for a roadmap: the date above each marker, the content below;
          it scrolls sideways when narrow.
        </p>
        <app-horizontal-timeline-next-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Pending</h2>
        <p class="text-muted-foreground">
          The last step still under way: a spinner in its marker, and a failure
          in the destructive colour.
        </p>
        <app-pending-timeline-next-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class TimelineNextPage {}
