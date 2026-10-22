import { Component, ViewEncapsulation } from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { BasicVirtualListDemoContainer } from './demos/basic-virtual-list-demo-container';
import { GridVirtualListDemoContainer } from './demos/grid-virtual-list-demo-container';
import { HorizontalVirtualListDemoContainer } from './demos/horizontal-virtual-list-demo-container';
import { InfiniteVirtualListDemoContainer } from './demos/infinite-virtual-list-demo-container';
import { PageVirtualListDemoContainer } from './demos/page-virtual-list-demo-container';
import { ScrollVirtualListDemoContainer } from './demos/scroll-virtual-list-demo-container';
import { VariableVirtualListDemoContainer } from './demos/variable-virtual-list-demo-container';

@Component({
  selector: 'app-virtual-list-page',
  imports: [
    BasicVirtualListDemoContainer,
    VariableVirtualListDemoContainer,
    HorizontalVirtualListDemoContainer,
    GridVirtualListDemoContainer,
    PageVirtualListDemoContainer,
    ScrollVirtualListDemoContainer,
    InfiniteVirtualListDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Virtual List</h1>
        <p class="text-muted-foreground">
          A long list rendered only where it is seen — rows measured as they
          render, in a scrolling box or the page, down, along or in lanes.
        </p>
        <app-component-badges path="virtual-list" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Basic</h2>
        <p class="text-muted-foreground">
          10,000 rows, a few dozen rendered: those in view, and five more each
          way. Each row is measured as it renders; its place in the whole list
          is aria-posinset of aria-setsize.
        </p>
        <app-basic-virtual-list-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Variable heights</h2>
        <p class="text-muted-foreground">
          Rows of any height — messages, long and short: estimated first, then
          measured; the list and its scrollbar follow, and the reader keeps
          their place as rows above settle.
        </p>
        <app-variable-virtual-list-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Horizontal</h2>
        <p class="text-muted-foreground">
          Along a row: days of a year, as a strip. Right to left, it starts at
          the right.
        </p>
        <app-horizontal-virtual-list-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Grid</h2>
        <p class="text-muted-foreground">
          In lanes: photos in three columns, each placed in the lane that ends
          first.
        </p>
        <app-grid-virtual-list-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Page scroll</h2>
        <p class="text-muted-foreground">
          Without a size of its own, it takes its full height, and the page — or
          the box around it — scrolls.
        </p>
        <app-page-virtual-list-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Scroll to</h2>
        <p class="text-muted-foreground">
          scrollToIndex(index, with an alignment): row 5,000 at the start, the
          centre, the end — or, auto, only as far as needed.
        </p>
        <app-scroll-virtual-list-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>With the infinite scroll</h2>
        <p class="text-muted-foreground">
          Long, and longer: the infinite scroll asks for 100 more near the end;
          the virtual list renders only what is seen.
        </p>
        <app-infinite-virtual-list-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class VirtualListPage {}
