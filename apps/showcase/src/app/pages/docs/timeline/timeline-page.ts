import { Component, ViewEncapsulation } from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ActivityTimelineDemoContainer } from './demos/activity-timeline-demo-container';
import { AlternateTimelineDemoContainer } from './demos/alternate-timeline-demo-container';
import { HorizontalTimelineDemoContainer } from './demos/horizontal-timeline-demo-container';
import { PendingTimelineDemoContainer } from './demos/pending-timeline-demo-container';
import { TrackingTimelineDemoContainer } from './demos/tracking-timeline-demo-container';

@Component({
  selector: 'app-timeline-page',
  imports: [
    ActivityTimelineDemoContainer,
    TrackingTimelineDemoContainer,
    AlternateTimelineDemoContainer,
    HorizontalTimelineDemoContainer,
    PendingTimelineDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Timeline</h1>
        <p class="text-muted-foreground">
          An ordered list of events, the line drawn between their markers;
          progress by status; times written from Temporal values; down one side,
          both, or across.
        </p>
        <app-component-badges path="timeline" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Activity</h2>
        <p class="text-muted-foreground">
          A feed: an icon in each marker, and when — written in the app's
          language from a Temporal value, its datetime set.
        </p>
        <app-activity-timeline-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Tracking</h2>
        <p class="text-muted-foreground">
          Progress: done (filled, solid line), current (a ring —
          aria-current="step"), to come (outlined, dashed). The status is said
          in words too.
        </p>
        <app-tracking-timeline-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Alternate</h2>
        <p class="text-muted-foreground">
          A history down a centred line, the events in turn on each side, their
          dates facing them.
        </p>
        <app-alternate-timeline-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Horizontal</h2>
        <p class="text-muted-foreground">
          Across, for a roadmap: the date above each marker, the content below;
          it scrolls sideways when narrow.
        </p>
        <app-horizontal-timeline-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Pending</h2>
        <p class="text-muted-foreground">
          The last step still under way: a spinner in its marker, and a failure
          in the destructive colour.
        </p>
        <app-pending-timeline-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class TimelinePage {}
