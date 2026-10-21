import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScTimelineNext,
  ScTimelineNextContent,
  ScTimelineNextDescription,
  ScTimelineNextItem,
  ScTimelineNextMarker,
  ScTimelineNextTime,
  ScTimelineNextTitle,
} from '@semantic-components/ui-lab';
import {
  SiGitCommitHorizontalIcon,
  SiMessageSquareIcon,
  SiTagIcon,
  SiUserPlusIcon,
} from '@semantic-icons/lucide-icons';

/** A feed: an icon in each marker, and when — written in the app's language from a Temporal value, its datetime set. */
@Component({
  selector: 'app-activity-timeline-next-demo',
  imports: [
    ScTimelineNext,
    ScTimelineNextItem,
    ScTimelineNextMarker,
    ScTimelineNextContent,
    ScTimelineNextTitle,
    ScTimelineNextDescription,
    ScTimelineNextTime,
    SiGitCommitHorizontalIcon,
    SiMessageSquareIcon,
    SiTagIcon,
    SiUserPlusIcon,
  ],
  template: `
    <ol scTimelineNext class="w-full max-w-md">
      @for (event of events; track event.title) {
        <li scTimelineNextItem>
          <div scTimelineNextMarker>
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
          <div scTimelineNextContent>
            <p scTimelineNextTitle>{{ event.title }}</p>
            <p scTimelineNextDescription>{{ event.text }}</p>
            <time scTimelineNextTime [value]="event.at"></time>
          </div>
        </li>
      }
    </ol>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ActivityTimelineNextDemo {
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
