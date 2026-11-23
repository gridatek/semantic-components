import { Component, ViewEncapsulation } from '@angular/core';
import { ScTypeset } from '@semantic-components/ui';
import { Anatomy } from '../../../components/anatomy/anatomy';
import {
  type ApiInput,
  ApiTable,
} from '../../../components/api-table/api-table';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { EntryInstall } from '../../../components/entry-install/entry-install';
import { PartsTable } from '../../../components/parts-table/parts-table';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ChatVirtualListDemoContainer } from './demos/chat-virtual-list-demo-container';
import { GridVirtualListDemoContainer } from './demos/grid-virtual-list-demo-container';
import { HorizontalVirtualListDemoContainer } from './demos/horizontal-virtual-list-demo-container';
import { InfiniteVirtualListDemoContainer } from './demos/infinite-virtual-list-demo-container';
import { PageVirtualListDemoContainer } from './demos/page-virtual-list-demo-container';
import { RtlVirtualListDemoContainer } from './demos/rtl-virtual-list-demo-container';
import { ScrollToVirtualListDemoContainer } from './demos/scroll-to-virtual-list-demo-container';
import { VariableVirtualListDemoContainer } from './demos/variable-virtual-list-demo-container';
import { VirtualListUsageDemoContainer } from './demos/virtual-list-usage-demo-container';

@Component({
  selector: 'app-virtual-list-page',
  imports: [
    ScTypeset,
    Anatomy,
    ApiTable,
    ComponentBadges,
    EntryInstall,
    PartsTable,
    TocHeading,
    VirtualListUsageDemoContainer,
    VariableVirtualListDemoContainer,
    PageVirtualListDemoContainer,
    HorizontalVirtualListDemoContainer,
    InfiniteVirtualListDemoContainer,
    GridVirtualListDemoContainer,
    ChatVirtualListDemoContainer,
    ScrollToVirtualListDemoContainer,
    RtlVirtualListDemoContainer,
  ],
  template: `
    <div class="space-y-12">
      <div class="space-y-2">
        <h1 scTypeset>Virtual List</h1>
        <p class="text-muted-foreground">
          A long list rendered only where it is seen — rows measured as they
          render, in a box or the page, down, along or in lanes; a chat that
          opens at its end. On TanStack Virtual&apos;s engine.
        </p>
        <app-component-badges path="virtual-list" />
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Installation</h2>
        <app-entry-install
          entry="virtual-list"
          library="@tanstack/virtual-core"
          href="https://tanstack.com/virtual"
          names="ScVirtualList, ScVirtualListRow"
        />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Usage</h2>
        <app-virtual-list-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Anatomy</h2>
        <p>
          The list on your <code scTypeset>ul</code> (or any element), and your
          rows from its <code scTypeset>rows()</code> — read your data by
          <code scTypeset>row.index</code>, track by
          <code scTypeset>row.key</code>.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Sizes and scrolling</h2>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            <code scTypeset>estimate</code>: a row&apos;s size before it is
            measured — the largest likely one. Each row is measured as it
            renders and again when it changes (an image loading, text wrapping);
            a row above the view settling keeps your place.
          </li>
          <li>
            Give it a size and an overflow (<code scTypeset
              >h-96 overflow-y-auto</code
            >) and it scrolls itself; without, it takes its full size and the
            box around it — or the page — scrolls it.
          </li>
          <li>
            <code scTypeset>key</code>: your items&apos; ids, when rows can move
            or come in above — sizes and the place you read are kept by key.
          </li>
          <li>
            <code scTypeset>anchor="end"</code>: a chat — it opens at the end,
            older rows come in above without moving what you read, and new ones
            are followed while you are at the end (<code scTypeset>follow</code
            >); scrolling yourself stops a scroll on its way.
          </li>
          <li>
            Before it can measure — on the server, at the first paint — it
            renders its first <code scTypeset>initialCount</code> rows (10):
            content, not an empty list.
          </li>
        </ul>
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>With the infinite scroll</h2>
        <p>
          Long, and longer: an
          <code scTypeset>scInfiniteScroll</code> around the list asks for 100
          more near the end; the list renders only what is seen.
        </p>
        <app-infinite-virtual-list-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Accessibility</h2>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            Each row says where it is in the whole list:
            <code scTypeset>aria-posinset</code> of
            <code scTypeset>aria-setsize</code>.
          </li>
          <li>
            The row with focus stays rendered as you scroll away: focus is never
            lost.
          </li>
          <li>
            Name the list; give it <code scTypeset>tabindex="0"</code> when its
            rows can&apos;t take focus, so it can be scrolled with the keys.
          </li>
          <li>
            Rows out of view aren&apos;t in the page: the browser&apos;s find
            doesn&apos;t see them.
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scTypeset appToc>Examples</h2>
        <app-variable-virtual-list-demo-container />
        <app-page-virtual-list-demo-container />
        <app-horizontal-virtual-list-demo-container />
        <app-grid-virtual-list-demo-container />
        <app-chat-virtual-list-demo-container />
        <app-scroll-to-virtual-list-demo-container />
        <app-rtl-virtual-list-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>API reference</h2>
        <p>
          From <code scTypeset>@semantic-components/ui/virtual-list</code>. Each
          part takes <code scTypeset>class</code>, merged over its own.
        </p>
        <app-parts-table label="Virtual List parts" [parts]="parts" />
        <app-api-table label="ScVirtualList inputs" [inputs]="inputs" />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class VirtualListPage {
  private readonly anatomy = {
    imports:
      "import { ScVirtualList, ScVirtualListRow } from '@semantic-components/ui/virtual-list';",
    markup: [
      '<ul scVirtualList #list="scVirtualList" [count]="items.length" [estimate]="56" aria-label="Contacts" class="h-96 overflow-y-auto">',
      '  @for (row of list.rows(); track row.key) {',
      '    <li [scVirtualListRow]="row">{{ items[row.index].name }}</li>',
      '  }',
      '</ul>',
    ].join('\n'),
  };

  private readonly parts = [
    {
      name: 'ScVirtualList',
      selector: '[scVirtualList]',
      description:
        'The list: what to render. exportAs: rows(), range(), size(), scrollToIndex(), scrollToEnd(), isAtEnd(), cancelScroll().',
    },
    {
      name: 'ScVirtualListRow',
      selector: '[scVirtualListRow]',
      description: 'A row: placed, measured; aria-posinset / aria-setsize.',
    },
  ];

  private readonly inputs: ApiInput[] = [
    {
      name: 'count',
      type: 'number',
      default: '—',
      description: 'How many rows.',
    },
    {
      name: 'estimate',
      type: 'number',
      default: '40',
      description: 'A row’s size before it is measured (px).',
    },
    {
      name: 'key',
      type: '(index) => number | string',
      default: 'the index',
      description: 'Each row’s key: your ids.',
    },
    {
      name: 'overscan',
      type: 'number',
      default: '5',
      description: 'Rows rendered beyond each end of the view.',
    },
    {
      name: 'orientation',
      type: "'vertical' | 'horizontal'",
      default: "'vertical'",
      description: 'Down, or along (from the right, right to left).',
    },
    {
      name: 'lanes, gap',
      type: 'number',
      default: '1, 0',
      description: 'Rows side by side; room between them (px).',
    },
    {
      name: 'anchor',
      type: "'start' | 'end'",
      default: "'start'",
      description: '`end`: a chat.',
    },
    {
      name: 'follow',
      type: 'boolean',
      default: 'anchor = end',
      description: 'At the end, follow rows added after it.',
    },
    {
      name: 'initialCount',
      type: 'number',
      default: '10',
      description: 'Rows rendered before it can measure (the server).',
    },
  ];
}
