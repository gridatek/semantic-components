import { Component, ViewEncapsulation } from '@angular/core';
import { ScKbd, ScTypeset } from '@semantic-components/ui';
import { Anatomy } from '../../../components/anatomy/anatomy';
import {
  type ApiInput,
  ApiTable,
} from '../../../components/api-table/api-table';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { PartsTable } from '../../../components/parts-table/parts-table';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ButtonInfiniteScrollNextDemoContainer } from './demos/button-infinite-scroll-next-demo-container';
import { ChatInfiniteScrollNextDemoContainer } from './demos/chat-infinite-scroll-next-demo-container';
import { ErrorInfiniteScrollNextDemoContainer } from './demos/error-infinite-scroll-next-demo-container';
import { FeedInfiniteScrollNextDemoContainer } from './demos/feed-infinite-scroll-next-demo-container';
import { GridInfiniteScrollNextDemoContainer } from './demos/grid-infinite-scroll-next-demo-container';
import { RtlInfiniteScrollNextDemoContainer } from './demos/rtl-infinite-scroll-next-demo-container';

@Component({
  selector: 'app-infinite-scroll-next-page',
  imports: [
    ScKbd,
    ScTypeset,
    Anatomy,
    ApiTable,
    ComponentBadges,
    PartsTable,
    TocHeading,
    FeedInfiniteScrollNextDemoContainer,
    ButtonInfiniteScrollNextDemoContainer,
    ErrorInfiniteScrollNextDemoContainer,
    ChatInfiniteScrollNextDemoContainer,
    GridInfiniteScrollNextDemoContainer,
    RtlInfiniteScrollNextDemoContainer,
  ],
  template: `
    <div class="space-y-12">
      <div class="space-y-2">
        <h1 scTypeset>Infinite Scroll Next</h1>
        <p class="text-muted-foreground">
          More as the reader nears the end — or the start, for a chat — with
          whatever scrolls. It keeps asking until the content fills the box,
          keeps the reading place, and gives a feed its keys.
        </p>
        <app-component-badges path="infinite-scroll-next" />
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Usage</h2>
        <app-feed-infinite-scroll-next-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Anatomy</h2>
        <p>
          One part, around your items. The Load more button and the status are
          your markup: a button calling <code scTypeset>loadMore()</code>, a
          <code scTypeset>role="status"</code> with your words.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>How it asks</h2>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            <code scTypeset>(more)</code> when a marker after your items is
            within <code scTypeset>distance</code> (200px) of the edge of what
            scrolls — itself, the box around it, or the page — and it is not
            <code scTypeset>loading</code>, not <code scTypeset>done</code>.
          </li>
          <li>
            After each load it looks again: a first page shorter than the box
            asks again, until the box is full or there is no more.
          </li>
          <li>
            <code scTypeset>auto</code> off: only
            <code scTypeset>loadMore()</code> asks — after an error, so a
            failing server isn&apos;t asked again and again.
          </li>
          <li>
            <code scTypeset>direction="start"</code>, a chat: it opens at the
            end, and older items come in above while the one being read stays
            put — no <code scTypeset>column-reverse</code> needed.
          </li>
        </ul>
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Keyboard</h2>
        <p>
          On a <code scTypeset>role="feed"</code> with
          <code scTypeset>role="article"</code> items (WAI-ARIA&apos;s feed):
        </p>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            <kbd scKbd>Page Down</kbd> / <kbd scKbd>Page Up</kbd>: the next or
            the previous article — on the last, more is asked for, so a keyboard
            reader loads as a scrolling one does.
          </li>
          <li>
            <kbd scKbd>Ctrl + End</kbd> / <kbd scKbd>Ctrl + Home</kbd>: out of
            the feed, to what comes after it or before it.
          </li>
        </ul>
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Accessibility</h2>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            <code scTypeset>aria-busy</code> is on it while loading. For
            articles, a <code scTypeset>role="feed"</code>, each article with
            <code scTypeset>aria-posinset</code> and
            <code scTypeset>aria-setsize</code> (-1 until done).
          </li>
          <li>
            Say what happens in a <code scTypeset>role="status"</code> kept in
            the page: &quot;Loading…&quot;, &quot;That&apos;s all&quot;, an
            error.
          </li>
          <li>
            Offer a Load more button where the content after the list (a footer)
            must stay within reach.
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scTypeset appToc>Examples</h2>
        <app-button-infinite-scroll-next-demo-container />
        <app-error-infinite-scroll-next-demo-container />
        <app-chat-infinite-scroll-next-demo-container />
        <app-grid-infinite-scroll-next-demo-container />
        <app-rtl-infinite-scroll-next-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>API reference</h2>
        <app-parts-table label="Infinite Scroll Next parts" [parts]="parts" />
        <app-api-table label="ScInfiniteScrollNext inputs" [inputs]="inputs" />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class InfiniteScrollNextPage {
  private readonly anatomy = {
    imports: "import { ScInfiniteScrollNext } from '@semantic-components/ui';",
    markup: [
      '<div scInfiniteScrollNext #feed="scInfiniteScrollNext" role="feed" aria-label="News" [loading]="loading()" [done]="done()" (more)="load()">',
      '  @for (item of items(); track item.id) { <article tabindex="0">…</article> }',
      '</div>',
      '<p role="status">@if (loading()) { Loading… } @else if (done()) { That’s all. }</p>',
      '<button (click)="feed.loadMore()">Load more</button>',
    ].join('\n'),
  };

  private readonly parts = [
    {
      name: 'ScInfiniteScrollNext',
      selector: '[scInfiniteScrollNext]',
      description:
        'Around your items: (more) near the end or the start; aria-busy; a feed’s keys. exportAs: loadMore().',
    },
  ];

  private readonly inputs: ApiInput[] = [
    {
      name: 'loading',
      type: 'boolean',
      default: 'false',
      description: 'Your load is under way: nothing more is asked for.',
    },
    {
      name: 'done',
      type: 'boolean',
      default: 'false',
      description: 'There is no more.',
    },
    {
      name: 'distance',
      type: 'number',
      default: '200',
      description: 'How near the end (px) asks for more.',
    },
    {
      name: 'direction',
      type: "'end' | 'start'",
      default: "'end'",
      description: '`start`: a chat — older items come in above.',
    },
    {
      name: 'auto',
      type: 'boolean',
      default: 'true',
      description: 'Off: only loadMore() asks.',
    },
  ];
}
