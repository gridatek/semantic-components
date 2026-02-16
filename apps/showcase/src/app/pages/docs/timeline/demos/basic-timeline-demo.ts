import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScTimeline,
  ScTimelineItem,
  ScTimelineConnector,
  ScTimelineDot,
  ScTimelineContent,
  ScTimelineTitle,
  ScTimelineDescription,
  ScTimelineTime,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-basic-timeline-demo',
  imports: [
    ScTimeline,
    ScTimelineItem,
    ScTimelineConnector,
    ScTimelineDot,
    ScTimelineContent,
    ScTimelineTitle,
    ScTimelineDescription,
    ScTimelineTime,
  ],
  template: `
    <div scTimeline class="ml-4">
      <div scTimelineItem>
        <div scTimelineConnector></div>
        <div scTimelineDot></div>
        <div scTimelineContent>
          <h4 scTimelineTitle>Project Started</h4>
          <p scTimelineDescription>
            Initial setup and planning phase completed.
          </p>
          <span scTimelineTime>January 2024</span>
        </div>
      </div>

      <div scTimelineItem>
        <div scTimelineConnector></div>
        <div scTimelineDot></div>
        <div scTimelineContent>
          <h4 scTimelineTitle>Development Phase</h4>
          <p scTimelineDescription>Core features implementation began.</p>
          <span scTimelineTime>February 2024</span>
        </div>
      </div>

      <div scTimelineItem>
        <div scTimelineDot></div>
        <div scTimelineContent>
          <h4 scTimelineTitle>Launch</h4>
          <p scTimelineDescription>Product launched to production.</p>
          <span scTimelineTime>March 2024</span>
        </div>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicTimelineDemo {}
