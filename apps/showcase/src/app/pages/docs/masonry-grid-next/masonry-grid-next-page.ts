import { Component, ViewEncapsulation } from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { CardsMasonryGridNextDemoContainer } from './demos/cards-masonry-grid-next-demo-container';
import { MoreMasonryGridNextDemoContainer } from './demos/more-masonry-grid-next-demo-container';
import { OrderMasonryGridNextDemoContainer } from './demos/order-masonry-grid-next-demo-container';
import { PhotosMasonryGridNextDemoContainer } from './demos/photos-masonry-grid-next-demo-container';

@Component({
  selector: 'app-masonry-grid-next-page',
  imports: [
    PhotosMasonryGridNextDemoContainer,
    CardsMasonryGridNextDemoContainer,
    MoreMasonryGridNextDemoContainer,
    OrderMasonryGridNextDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Masonry Grid Next</h1>
        <p class="text-muted-foreground">
          The masonry grid, rebuilt: items of any height packed into columns by
          width, the source order kept for reading and Tab; laid out again
          whenever anything changes size, the moves animated; native where the
          browser can.
        </p>
        <app-component-badges path="masonry-grid-next" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Photos</h2>
        <p class="text-muted-foreground">
          Photos of different heights, each into the shortest column — as many
          columns of at least 200 px as fit. In a list: the order is the
          source's, row by row.
        </p>
        <app-photos-masonry-grid-next-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Cards</h2>
        <p class="text-muted-foreground">
          Text of any length — measured, never guessed; resize the window and it
          lays out again. The first card spans two columns.
        </p>
        <app-cards-masonry-grid-next-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Load more</h2>
        <p class="text-muted-foreground">
          Items added, or removed: the grid lays out again, and the others move
          into place (not under reduced motion).
        </p>
        <app-more-masonry-grid-next-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Order</h2>
        <p class="text-muted-foreground">
          Into the shortest column (balanced) — or in turn, column after column
          (predictable): the same tiles, both ways.
        </p>
        <app-order-masonry-grid-next-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class MasonryGridNextPage {}
