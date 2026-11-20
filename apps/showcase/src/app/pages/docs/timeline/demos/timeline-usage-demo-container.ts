import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { TimelineUsageDemo } from './timeline-usage-demo';

@Component({
  selector: 'app-timeline-usage-demo-container',
  imports: [DemoContainer, TimelineUsageDemo],
  template: `
    <app-demo-container
      title="Usage"
      [code]="code"
      demoUrl="/demos/timeline/timeline-usage-demo"
    >
      <app-timeline-usage-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class TimelineUsageDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScTimeline,
  ScTimelineConnector,
  ScTimelineDescription,
  ScTimelineItem,
  ScTimelineMarker,
  ScTimelineTime,
  ScTimelineTitle,
} from '@semantic-components/ui';

/** An activity feed: Tab into it, then ↑ and ↓ between events; Home and End to the first and last. */
@Component({
  selector: 'app-timeline-usage-demo',
  imports: [
    ScTimeline,
    ScTimelineItem,
    ScTimelineMarker,
    ScTimelineConnector,
    ScTimelineTitle,
    ScTimelineTime,
    ScTimelineDescription,
  ],
  template: \`
    <div scTimeline aria-label="Activity" class="w-full max-w-md">
      @for (event of events; track event.title) {
        <div scTimelineItem>
          <span scTimelineMarker></span>
          <span scTimelineConnector></span>
          <h3 scTimelineTitle>{{ event.title }}</h3>
          <time scTimelineTime [datetime]="event.datetime">
            {{ event.time }}
          </time>
          <p scTimelineDescription>{{ event.description }}</p>
        </div>
      }
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class TimelineUsageDemo {
  private readonly events = [
    {
      title: 'Deployed to production',
      datetime: '2026-11-20T14:32',
      time: 'Today, 2:32 PM',
      description: 'Version 2.4.1 is live in every region.',
    },
    {
      title: 'Checks passed',
      datetime: '2026-11-20T14:20',
      time: 'Today, 2:20 PM',
      description: '312 tests and the bundle size budget.',
    },
    {
      title: 'Pull request merged',
      datetime: '2026-11-20T13:58',
      time: 'Today, 1:58 PM',
      description: 'Ada merged Cache search results into main.',
    },
    {
      title: 'Review requested',
      datetime: '2026-11-19T17:05',
      time: 'Yesterday, 5:05 PM',
      description: 'Grace and Linus were asked to review.',
    },
  ];
}`;
}
