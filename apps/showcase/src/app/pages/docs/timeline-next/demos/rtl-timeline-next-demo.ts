import { Dir } from '@angular/cdk/bidi';
import { Component, LOCALE_ID, ViewEncapsulation } from '@angular/core';
import {
  ScTimelineNext,
  ScTimelineNextConnector,
  ScTimelineNextItem,
  ScTimelineNextMarker,
  ScTimelineNextTime,
  ScTimelineNextTitle,
} from '@semantic-components/ui';

/** In a right-to-left page: a horizontal timeline runs from the right, and ← moves to the next event. */
@Component({
  selector: 'app-rtl-timeline-next-demo',
  imports: [
    Dir,
    ScTimelineNext,
    ScTimelineNextItem,
    ScTimelineNextMarker,
    ScTimelineNextConnector,
    ScTimelineNextTitle,
    ScTimelineNextTime,
  ],
  template: `
    <div dir="rtl" lang="ar" class="w-full">
      <div scTimelineNext orientation="horizontal" aria-label="خارطة الطريق">
        @for (milestone of milestones; track milestone.title) {
          <div scTimelineNextItem>
            <span scTimelineNextMarker></span>
            <span scTimelineNextConnector></span>
            <h3 scTimelineNextTitle>{{ milestone.title }}</h3>
            <time scTimelineNextTime [datetime]="milestone.datetime">
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
export class RtlTimelineNextDemo {
  private readonly milestones = [
    { title: 'الانطلاق', datetime: '2027-01', month: 'يناير' },
    { title: 'مراجعة التصميم', datetime: '2027-03', month: 'مارس' },
    { title: 'النسخة التجريبية', datetime: '2027-06', month: 'يونيو' },
    { title: 'الإطلاق', datetime: '2027-09', month: 'سبتمبر' },
  ];
}
