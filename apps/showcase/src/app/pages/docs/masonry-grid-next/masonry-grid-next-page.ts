import { Component, ViewEncapsulation } from '@angular/core';
import { ScTypeset } from '@semantic-components/ui';
import { Anatomy } from '../../../components/anatomy/anatomy';
import {
  type ApiInput,
  ApiTable,
} from '../../../components/api-table/api-table';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { PartsTable } from '../../../components/parts-table/parts-table';
import { TocHeading } from '../../../components/toc/toc-heading';
import { CardsMasonryGridNextDemoContainer } from './demos/cards-masonry-grid-next-demo-container';
import { ColumnsMasonryGridNextDemoContainer } from './demos/columns-masonry-grid-next-demo-container';
import { MasonryGridNextUsageDemoContainer } from './demos/masonry-grid-next-usage-demo-container';
import { MoreMasonryGridNextDemoContainer } from './demos/more-masonry-grid-next-demo-container';
import { OrderMasonryGridNextDemoContainer } from './demos/order-masonry-grid-next-demo-container';
import { RtlMasonryGridNextDemoContainer } from './demos/rtl-masonry-grid-next-demo-container';

@Component({
  selector: 'app-masonry-grid-next-page',
  imports: [
    ScTypeset,
    Anatomy,
    ApiTable,
    PartsTable,
    TocHeading,
    ComponentBadges,
    MasonryGridNextUsageDemoContainer,
    CardsMasonryGridNextDemoContainer,
    OrderMasonryGridNextDemoContainer,
    MoreMasonryGridNextDemoContainer,
    ColumnsMasonryGridNextDemoContainer,
    RtlMasonryGridNextDemoContainer,
  ],
  template: `
    <div class="space-y-12">
      <div class="space-y-2">
        <h1 scTypeset>Masonry Grid Next</h1>
        <p class="text-muted-foreground">
          Items of any height packed into columns by width, the source order
          kept for reading and Tab — laid out again whenever anything changes
          size, the moves animated; native where the browser can.
        </p>
        <app-component-badges path="masonry-grid-next" />
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Usage</h2>
        <app-masonry-grid-next-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Anatomy</h2>
        <p>
          Two parts on your elements: the grid (a <code scTypeset>ul</code>
          when the items are a list) and each item. The gaps are your classes.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Layout</h2>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            Columns: as many of at least
            <code scTypeset>columnWidth</code> as fit the grid&apos;s width (at
            most <code scTypeset>maxColumns</code>) — no breakpoints. The gaps:
            your classes (<code scTypeset>gap-4</code>,
            <code scTypeset>gap-x-6 gap-y-2</code>), read from the page.
          </li>
          <li>
            Each item, in the source&apos;s order, goes into the shortest column
            — the first of the columns within 1em of it, as CSS
            <code scTypeset>grid-lanes</code> does, so the rows read evenly —
            or, <code scTypeset>sequential</code>, into the next in turn.
            <code scTypeset>span</code> makes it several columns wide.
          </li>
          <li>
            Before it is measured — on the server, at the first paint — it is a
            plain grid of the same columns and gaps: rows, never a pile. Then
            laid out whenever the grid or an item changes size (an image
            loading, text wrapping) or items come and go; the items move into
            place (not under reduced motion).
          </li>
          <li>
            Right to left, the first column is on the right. Where the browser
            has <code scTypeset>display: grid-lanes</code>, it lays out the
            shortest-column grid itself (<code scTypeset>data-native</code> on
            the grid).
          </li>
        </ul>
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Accessibility</h2>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            When the items are a list, use <code scTypeset>ul</code> and
            <code scTypeset>li</code>: the grid adds no roles.
          </li>
          <li>
            The order on screen follows the source, row by row — the order of
            reading and of Tab: keep the source in the order it should be read.
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scTypeset appToc>Examples</h2>
        <app-cards-masonry-grid-next-demo-container />
        <app-order-masonry-grid-next-demo-container />
        <app-more-masonry-grid-next-demo-container />
        <app-columns-masonry-grid-next-demo-container />
        <app-rtl-masonry-grid-next-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>API reference</h2>
        <p>
          Each part takes <code scTypeset>class</code>, merged over its own (cn:
          a later class wins).
        </p>
        <app-parts-table label="Masonry Grid Next parts" [parts]="parts" />
        <app-api-table label="ScMasonryGridNext inputs" [inputs]="inputs" />
        <app-api-table
          label="ScMasonryGridNextItem inputs"
          [inputs]="itemInputs"
        />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class MasonryGridNextPage {
  private readonly anatomy = {
    imports:
      "import { ScMasonryGridNext, ScMasonryGridNextItem } from '@semantic-components/ui';",
    markup: [
      '<ul scMasonryGridNext [columnWidth]="200" class="gap-4">',
      '  <li scMasonryGridNextItem>…</li>',
      '  <li scMasonryGridNextItem [span]="2">…</li>',
      '</ul>',
    ].join('\n'),
  };

  private readonly parts = [
    {
      name: 'ScMasonryGridNext',
      selector: '[scMasonryGridNext]',
      description:
        'The grid: columns by width, the items placed. exportAs: columns(), native().',
    },
    {
      name: 'ScMasonryGridNextItem',
      selector: '[scMasonryGridNextItem]',
      description: 'An item, any height; span columns wide.',
    },
  ];

  private readonly inputs: ApiInput[] = [
    {
      name: 'columnWidth',
      type: 'number',
      default: '240',
      description: 'The least width of a column, in pixels: as many as fit.',
    },
    {
      name: 'maxColumns',
      type: 'number | null',
      default: 'null',
      description: 'At most this many columns.',
    },
    {
      name: 'sequential',
      type: 'boolean',
      default: 'false',
      description: 'Each item into the next column in turn, not the shortest.',
    },
  ];

  private readonly itemInputs: ApiInput[] = [
    {
      name: 'span',
      type: 'number',
      default: '1',
      description: 'How many columns wide.',
    },
  ];
}
