import { Dir } from '@angular/cdk/bidi';
import { Component, LOCALE_ID, ViewEncapsulation } from '@angular/core';
import {
  ScTimeline,
  ScTimelineConnector,
  ScTimelineItem,
  ScTimelineMarker,
  ScTimelineTime,
  ScTimelineTitle,
} from '@semantic-components/ui';

/** In a right-to-left page: a horizontal timeline runs from the right, and ← moves to the next event. */
@Component({
  selector: 'app-rtl-timeline-demo',
  imports: [
    Dir,
    ScTimeline,
    ScTimelineItem,
    ScTimelineMarker,
    ScTimelineConnector,
    ScTimelineTitle,
    ScTimelineTime,
  ],
  template: `
    <div dir="rtl" lang="ar" class="w-full">
      <div scTimeline orientation="horizontal" aria-label="خارطة الطريق">
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
    </div>
  `,
  providers: [{ provide: LOCALE_ID, useValue: 'ar' }],
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlTimelineDemo {
  private readonly milestones = [
    { title: 'الانطلاق', datetime: '2027-01', month: 'يناير' },
    { title: 'مراجعة التصميم', datetime: '2027-03', month: 'مارس' },
    { title: 'النسخة التجريبية', datetime: '2027-06', month: 'يونيو' },
    { title: 'الإطلاق', datetime: '2027-09', month: 'سبتمبر' },
  ];
}
