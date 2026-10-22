import { Component, ViewEncapsulation } from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ButtonInfiniteScrollDemoContainer } from './demos/button-infinite-scroll-demo-container';
import { ChatInfiniteScrollDemoContainer } from './demos/chat-infinite-scroll-demo-container';
import { ErrorInfiniteScrollDemoContainer } from './demos/error-infinite-scroll-demo-container';
import { FeedInfiniteScrollDemoContainer } from './demos/feed-infinite-scroll-demo-container';
import { GridInfiniteScrollDemoContainer } from './demos/grid-infinite-scroll-demo-container';

@Component({
  selector: 'app-infinite-scroll-page',
  imports: [
    FeedInfiniteScrollDemoContainer,
    GridInfiniteScrollDemoContainer,
    ButtonInfiniteScrollDemoContainer,
    ErrorInfiniteScrollDemoContainer,
    ChatInfiniteScrollDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Infinite Scroll</h1>
        <p class="text-muted-foreground">
          More as the reader nears the end — or the start, for a chat — with
          whatever scrolls; it asks again until the content fills the box, and a
          Load more button and a status make it usable by all.
        </p>
        <app-component-badges path="infinite-scroll" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Feed</h2>
        <p class="text-muted-foreground">
          Articles in a feed (role="feed"), more as the reader nears the end of
          the box: aria-busy while loading, and your words in the status — then
          “That’s all”.
        </p>
        <app-feed-infinite-scroll-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Grid</h2>
        <p class="text-muted-foreground">
          Any layout: here a grid of products. The first page does not fill the
          box — it asks again, until the box is full or there is no more.
        </p>
        <app-grid-infinite-scroll-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Load more</h2>
        <p class="text-muted-foreground">
          auto off: only the button asks — the footer stays within reach, and
          the reader decides.
        </p>
        <app-button-infinite-scroll-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Error and retry</h2>
        <p class="text-muted-foreground">
          A load fails: auto off, so it does not ask again by itself; the status
          says so and the button tries again.
        </p>
        <app-error-infinite-scroll-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Chat</h2>
        <p class="text-muted-foreground">
          direction="start": it opens at the end, and older messages come in
          above as the reader scrolls up — the one they were reading stays where
          it was.
        </p>
        <app-chat-infinite-scroll-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class InfiniteScrollPage {}
