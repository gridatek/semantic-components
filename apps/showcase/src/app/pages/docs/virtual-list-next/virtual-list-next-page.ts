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
import { ChatVirtualListNextDemoContainer } from './demos/chat-virtual-list-next-demo-container';
import { GridVirtualListNextDemoContainer } from './demos/grid-virtual-list-next-demo-container';
import { HorizontalVirtualListNextDemoContainer } from './demos/horizontal-virtual-list-next-demo-container';
import { PageVirtualListNextDemoContainer } from './demos/page-virtual-list-next-demo-container';
import { RtlVirtualListNextDemoContainer } from './demos/rtl-virtual-list-next-demo-container';
import { ScrollToVirtualListNextDemoContainer } from './demos/scroll-to-virtual-list-next-demo-container';
import { VariableVirtualListNextDemoContainer } from './demos/variable-virtual-list-next-demo-container';
import { VirtualListNextUsageDemoContainer } from './demos/virtual-list-next-usage-demo-container';

@Component({
  selector: 'app-virtual-list-next-page',
  imports: [
    ScTypeset,
    Anatomy,
    ApiTable,
    ComponentBadges,
    EntryInstall,
    PartsTable,
    TocHeading,
    VirtualListNextUsageDemoContainer,
    VariableVirtualListNextDemoContainer,
    PageVirtualListNextDemoContainer,
    HorizontalVirtualListNextDemoContainer,
    GridVirtualListNextDemoContainer,
    ChatVirtualListNextDemoContainer,
    ScrollToVirtualListNextDemoContainer,
    RtlVirtualListNextDemoContainer,
  ],
  template: `
    <div class="space-y-12">
      <div class="space-y-2">
        <h1 scTypeset>Virtual List Next</h1>
        <p class="text-muted-foreground">
          A long list rendered only where it is seen — rows measured as they
          render, in a box or the page, down, along or in lanes; a chat that
          opens at its end. On TanStack Virtual&apos;s engine.
        </p>
        <app-component-badges path="virtual-list-next" />
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Installation</h2>
        <app-entry-install
          entry="virtual-list"
          library="@tanstack/virtual-core"
          href="https://tanstack.com/virtual"
          names="ScVirtualListNext, ScVirtualListNextRow"
        />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Usage</h2>
        <app-virtual-list-next-usage-demo-container />
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
        <app-variable-virtual-list-next-demo-container />
        <app-page-virtual-list-next-demo-container />
        <app-horizontal-virtual-list-next-demo-container />
        <app-grid-virtual-list-next-demo-container />
        <app-chat-virtual-list-next-demo-container />
        <app-scroll-to-virtual-list-next-demo-container />
        <app-rtl-virtual-list-next-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>API reference</h2>
        <p>
          From <code scTypeset>@semantic-components/ui/virtual-list</code>. Each
          part takes <code scTypeset>class</code>, merged over its own.
        </p>
        <app-parts-table label="Virtual List Next parts" [parts]="parts" />
        <app-api-table label="ScVirtualListNext inputs" [inputs]="inputs" />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class VirtualListNextPage {
  private readonly anatomy = {
    imports:
      "import { ScVirtualListNext, ScVirtualListNextRow } from '@semantic-components/ui/virtual-list';",
    markup: [
      '<ul scVirtualListNext #list="scVirtualListNext" [count]="items.length" [estimate]="56" aria-label="Contacts" class="h-96 overflow-y-auto">',
      '  @for (row of list.rows(); track row.key) {',
      '    <li [scVirtualListNextRow]="row">{{ items[row.index].name }}</li>',
      '  }',
      '</ul>',
    ].join('\n'),
  };

  private readonly parts = [
    {
      name: 'ScVirtualListNext',
      selector: '[scVirtualListNext]',
      description:
        'The list: what to render. exportAs: rows(), range(), size(), scrollToIndex(), scrollToEnd(), isAtEnd(), cancelScroll().',
    },
    {
      name: 'ScVirtualListNextRow',
      selector: '[scVirtualListNextRow]',
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
