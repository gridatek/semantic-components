import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScTimeline,
  ScTimelineConnector,
  ScTimelineItem,
  ScTimelineMarker,
  ScTimelineTime,
  ScTimelineTitle,
} from '@semantic-components/ui';

/** A roadmap in a row: ← and → between milestones; loop off, so → stops at Launch. */
@Component({
  selector: 'app-horizontal-timeline-demo',
  imports: [
    ScTimeline,
    ScTimelineItem,
    ScTimelineMarker,
    ScTimelineConnector,
    ScTimelineTitle,
    ScTimelineTime,
  ],
  template: `
    <div
      scTimeline
      orientation="horizontal"
      [loop]="false"
      aria-label="Roadmap"
      class="w-full"
    >
      @for (milestone of milestones; track milestone.title) {
        <div scTimelineItem>
          <span scTimelineMarker></span>
          <span scTimelineConnector></span>
          <h3 scTimelineTitle>{{ milestone.title }}</h3>
          <time scTimelineTime [datetime]="milestone.datetime">
            {{ milestone.month }}
          </time>
        </div>
      }
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class HorizontalTimelineDemo {
  private readonly milestones = [
    { title: 'Kickoff', datetime: '2027-01', month: 'January' },
    { title: 'Design review', datetime: '2027-03', month: 'March' },
    { title: 'Beta', datetime: '2027-06', month: 'June' },
    { title: 'Launch', datetime: '2027-09', month: 'September' },
  ];
}
