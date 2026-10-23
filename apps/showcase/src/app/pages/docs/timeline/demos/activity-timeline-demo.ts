import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScTimeline,
  ScTimelineContent,
  ScTimelineDescription,
  ScTimelineItem,
  ScTimelineMarker,
  ScTimelineTime,
  ScTimelineTitle,
} from '@semantic-components/ui';
import {
  SiGitCommitHorizontalIcon,
  SiMessageSquareIcon,
  SiTagIcon,
  SiUserPlusIcon,
} from '@semantic-icons/lucide-icons';

/** A feed: an icon in each marker, and when — written in the app's language from a Temporal value, its datetime set. */
@Component({
  selector: 'app-activity-timeline-demo',
  imports: [
    ScTimeline,
    ScTimelineItem,
    ScTimelineMarker,
    ScTimelineContent,
    ScTimelineTitle,
    ScTimelineDescription,
    ScTimelineTime,
    SiGitCommitHorizontalIcon,
    SiMessageSquareIcon,
    SiTagIcon,
    SiUserPlusIcon,
  ],
  template: `
    <ol scTimeline class="w-full max-w-md">
      @for (event of events; track event.title) {
        <li scTimelineItem>
          <div scTimelineMarker>
            @switch (event.kind) {
              @case ('commit') {
                <svg siGitCommitHorizontalIcon></svg>
              }
              @case ('comment') {
                <svg siMessageSquareIcon></svg>
              }
              @case ('release') {
                <svg siTagIcon></svg>
              }
              @case ('member') {
                <svg siUserPlusIcon></svg>
              }
            }
          </div>
          <div scTimelineContent>
            <p scTimelineTitle>{{ event.title }}</p>
            <p scTimelineDescription>{{ event.text }}</p>
            <time scTimelineTime [value]="event.at"></time>
          </div>
        </li>
      }
    </ol>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ActivityTimelineDemo {
  readonly events = [
    {
      kind: 'release',
      title: 'Version 2.4 released',
      text: 'With the new timeline.',
      at: Temporal.PlainDateTime.from('2026-10-21T16:30'),
    },
    {
      kind: 'comment',
      title: 'Ada commented',
      text: '“Looks good to me.”',
      at: Temporal.PlainDateTime.from('2026-10-21T11:05'),
    },
    {
      kind: 'commit',
      title: 'Grace pushed 3 commits',
      text: 'Fix the line in right-to-left.',
      at: Temporal.PlainDateTime.from('2026-10-20T18:42'),
    },
    {
      kind: 'member',
      title: 'Alan joined the team',
      text: 'Welcome!',
      at: Temporal.PlainDateTime.from('2026-10-19T09:00'),
    },
  ];
}
