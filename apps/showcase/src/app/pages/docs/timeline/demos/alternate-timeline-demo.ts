import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScTimeline,
  ScTimelineContent,
  ScTimelineDescription,
  ScTimelineItem,
  ScTimelineMarker,
  ScTimelineOpposite,
  ScTimelineTime,
  ScTimelineTitle,
} from '@semantic-components/ui-lab';

/** A history down a centred line, the events in turn on each side, their dates facing them. */
@Component({
  selector: 'app-alternate-timeline-demo',
  imports: [
    ScTimeline,
    ScTimelineItem,
    ScTimelineMarker,
    ScTimelineContent,
    ScTimelineTitle,
    ScTimelineDescription,
    ScTimelineOpposite,
    ScTimelineTime,
  ],
  template: `
    <ol scTimeline align="alternate" class="w-full max-w-2xl">
      @for (event of history; track event.title) {
        <li scTimelineItem>
          <div scTimelineOpposite>
            <time
              scTimelineTime
              [value]="event.on"
              [options]="{ year: 'numeric', month: 'long' }"
            ></time>
          </div>
          <div scTimelineMarker></div>
          <div scTimelineContent>
            <p scTimelineTitle>{{ event.title }}</p>
            <p scTimelineDescription>{{ event.text }}</p>
          </div>
        </li>
      }
    </ol>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class AlternateTimelineDemo {
  readonly history = [
    {
      title: 'The idea',
      text: 'Components as parts, written by you.',
      on: Temporal.PlainDate.from('2024-03-01'),
    },
    {
      title: 'First release',
      text: 'Twenty components, all accessible.',
      on: Temporal.PlainDate.from('2024-11-15'),
    },
    {
      title: 'Signal Forms',
      text: 'Every field a form field.',
      on: Temporal.PlainDate.from('2025-08-01'),
    },
    {
      title: 'The lab',
      text: 'Players, pickers, and the rewrites.',
      on: Temporal.PlainDate.from('2026-10-01'),
    },
  ];
}
