import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { FeedTimelineDemo } from './feed-timeline-demo';

@Component({
  selector: 'app-feed-timeline-demo-container',
  imports: [DemoContainer, FeedTimelineDemo],
  template: `
    <app-demo-container
      title="Feed"
      [code]="code"
      demoUrl="/demos/timeline/feed-timeline-demo"
    >
      <app-feed-timeline-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class FeedTimelineDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, computed, signal } from '@angular/core';
import {
  ScButton,
  ScTimeline,
  ScTimelineConnector,
  ScTimelineItem,
  ScTimelineMarker,
  ScTimelineTime,
  ScTimelineTitle,
} from '@semantic-components/ui';

/** Team updates as a feed: articles that load more, busy while they do. Page Up and Page Down move between articles from anywhere in one. */
@Component({
  selector: 'app-feed-timeline-demo',
  imports: [
    ScButton,
    ScTimeline,
    ScTimelineItem,
    ScTimelineMarker,
    ScTimelineConnector,
    ScTimelineTitle,
    ScTimelineTime,
  ],
  template: \`
    <div class="flex w-full max-w-md flex-col gap-4">
      <div scTimeline feed [busy]="busy()" aria-label="Team updates">
        @for (update of shown(); track update.title) {
          <article scTimelineItem>
            <span scTimelineMarker></span>
            <span scTimelineConnector></span>
            <h3 scTimelineTitle>{{ update.title }}</h3>
            <time scTimelineTime [datetime]="update.datetime">
              {{ update.date }} · {{ update.author }}
            </time>
          </article>
        }
      </div>
      <button
        scButton
        variant="outline"
        class="self-start"
        [disabled]="busy() || count() >= updates.length"
        (click)="more()"
      >
        {{ busy() ? 'Loading…' : 'Load more' }}
      </button>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class FeedTimelineDemo {
  private readonly updates = [
    ['Shipped the new onboarding', 'Ada', '2026-11-10', 'Nov 10'],
    ['Fixed the flaky upload test', 'Grace', '2026-11-10', 'Nov 10'],
    ['Wrote the release notes', 'Linus', '2026-11-09', 'Nov 9'],
    ['Reviewed the search cache', 'Margaret', '2026-11-08', 'Nov 8'],
    ['Paired on the billing bug', 'Ada', '2026-11-07', 'Nov 7'],
    ['Updated the design tokens', 'Grace', '2026-11-07', 'Nov 7'],
    ['Cut the 2.4 branch', 'Linus', '2026-11-06', 'Nov 6'],
    ['Planned the next sprint', 'Margaret', '2026-11-05', 'Nov 5'],
    ['Welcomed two new teammates', 'Ada', '2026-11-04', 'Nov 4'],
  ].map(([title, author, datetime, date]) => ({
    title,
    author,
    datetime,
    date,
  }));

  private readonly count = signal(3);
  private readonly busy = signal(false);
  private readonly shown = computed(() => this.updates.slice(0, this.count()));

  /** Three more, after a moment — as from a server. */
  private more(): void {
    this.busy.set(true);
    setTimeout(() => {
      this.count.update((count) => count + 3);
      this.busy.set(false);
    }, 600);
  }
}`;
}
