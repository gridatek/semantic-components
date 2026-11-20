import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScTimelineNext,
  ScTimelineNextConnector,
  ScTimelineNextDescription,
  ScTimelineNextItem,
  ScTimelineNextMarker,
  ScTimelineNextTime,
  ScTimelineNextTitle,
} from '@semantic-components/ui';

/** A roadmap in a row: ← and → between milestones; loop off, so → stops at Launch. */
@Component({
  selector: 'app-horizontal-timeline-next-demo',
  imports: [
    ScTimelineNext,
    ScTimelineNextItem,
    ScTimelineNextMarker,
    ScTimelineNextConnector,
    ScTimelineNextTitle,
    ScTimelineNextTime,
    ScTimelineNextDescription,
  ],
  template: `
    <div
      scTimelineNext
      orientation="horizontal"
      [loop]="false"
      aria-label="Roadmap"
      class="w-full"
    >
      @for (milestone of milestones; track milestone.title) {
        <div scTimelineNextItem>
          <span scTimelineNextMarker></span>
          <span scTimelineNextConnector></span>
          <h3 scTimelineNextTitle>{{ milestone.title }}</h3>
          <time scTimelineNextTime [attr.datetime]="milestone.datetime">
            {{ milestone.month }}
          </time>
        </div>
      }
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class HorizontalTimelineNextDemo {
  private readonly milestones = [
    { title: 'Kickoff', datetime: '2027-01', month: 'January' },
    { title: 'Design review', datetime: '2027-03', month: 'March' },
    { title: 'Beta', datetime: '2027-06', month: 'June' },
    { title: 'Launch', datetime: '2027-09', month: 'September' },
  ];
}
