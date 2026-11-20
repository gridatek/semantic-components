import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { TimelineNextUsageDemo } from './timeline-next-usage-demo';

@Component({
  selector: 'app-timeline-next-usage-demo-container',
  imports: [DemoContainer, TimelineNextUsageDemo],
  template: `
    <app-demo-container
      title="Usage"
      [code]="code"
      demoUrl="/demos/timeline-next/timeline-next-usage-demo"
    >
      <app-timeline-next-usage-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class TimelineNextUsageDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScTimelineNext,
  ScTimelineNextConnector,
  ScTimelineNextDescription,
  ScTimelineNextItem,
  ScTimelineNextMarker,
  ScTimelineNextTime,
  ScTimelineNextTitle,
} from '@semantic-components/ui';

/** An activity feed: Tab into it, then ↑ and ↓ between events; Home and End to the first and last. */
@Component({
  selector: 'app-timeline-next-usage-demo',
  imports: [
    ScTimelineNext,
    ScTimelineNextItem,
    ScTimelineNextMarker,
    ScTimelineNextConnector,
    ScTimelineNextTitle,
    ScTimelineNextTime,
    ScTimelineNextDescription,
  ],
  template: \`
    <div scTimelineNext aria-label="Activity" class="w-full max-w-md">
      @for (event of events; track event.title) {
        <div scTimelineNextItem>
          <span scTimelineNextMarker></span>
          <span scTimelineNextConnector></span>
          <h3 scTimelineNextTitle>{{ event.title }}</h3>
          <time scTimelineNextTime [attr.datetime]="event.datetime">
            {{ event.time }}
          </time>
          <p scTimelineNextDescription>{{ event.description }}</p>
        </div>
      }
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class TimelineNextUsageDemo {
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
