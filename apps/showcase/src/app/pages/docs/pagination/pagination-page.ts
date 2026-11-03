import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScHeading,
  ScTable,
  ScTableBody,
  ScTableCell,
  ScTableContainer,
  ScTableHeader,
  ScTableHeaderCell,
  ScTableRow,
} from '@semantic-components/ui';
import { Anatomy } from '../../../components/anatomy/anatomy';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { DisabledPaginationDemoContainer } from './demos/disabled-pagination-demo-container';
import { EllipsisPaginationDemoContainer } from './demos/ellipsis-pagination-demo-container';
import { FirstLastPaginationDemoContainer } from './demos/first-last-pagination-demo-container';
import { IconsOnlyPaginationDemoContainer } from './demos/icons-only-pagination-demo-container';
import { LinksPaginationDemoContainer } from './demos/links-pagination-demo-container';
import { PaginationUsageDemoContainer } from './demos/pagination-usage-demo-container';
import { RtlPaginationDemoContainer } from './demos/rtl-pagination-demo-container';
import { SiblingsPaginationDemoContainer } from './demos/siblings-pagination-demo-container';
import { SimplePaginationDemoContainer } from './demos/simple-pagination-demo-container';

interface ScApiRow {
  name: string;
  type: string;
  default: string;
  description: string;
}

@Component({
  selector: 'app-pagination-page',
  imports: [
    Anatomy,
    PaginationUsageDemoContainer,
    SimplePaginationDemoContainer,
    IconsOnlyPaginationDemoContainer,
    EllipsisPaginationDemoContainer,
    SiblingsPaginationDemoContainer,
    FirstLastPaginationDemoContainer,
    LinksPaginationDemoContainer,
    DisabledPaginationDemoContainer,
    RtlPaginationDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
    ScTable,
    ScTableBody,
    ScTableCell,
    ScTableContainer,
    ScTableHeader,
    ScTableHeaderCell,
    ScTableRow,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Pagination</h1>
        <p class="text-muted-foreground">
          Moves through pages of results: the pages, previous and next, in the
          look of the app&apos;s preset. It counts the pages from the number of
          items and the page size, and works out which to show.
        </p>
        <app-component-badges path="pagination" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-pagination-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Anatomy</h2>
        <p class="text-muted-foreground">
          A navigation round a list; every part is a directive on your element,
          the icons and the text are yours. Name the navigation with
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">aria-label</code>
          and an icon-only button with an
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">sr-only</code>
          span. The pages come from
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">pages()</code>
          (the first and the last, the current one with a page either side,
          ellipses between; as many items wherever the current page is); the
          current one is marked
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >aria-current="page"</code
          >.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Notes</h2>
        <p class="text-muted-foreground">
          Use buttons when the page changes in place, links when each page has
          its own URL: the href is yours (?page=2, a routerLink) and the link
          follows it; read the page from the URL into
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">currentPage</code
          >. A disabled link goes nowhere on a click, but keeps its href: leave
          it off for a link that should not open in a new tab either. Previous
          and First turn disabled on the first page, Next and Last on the last:
          they leave the tab order and say
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >aria-disabled</code
          >. For rows per page, put a Select beside it and call
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >changePageSize()</code
          >; to say which page is shown, a Status.
        </p>
      </section>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-simple-pagination-demo-container />
        <app-icons-only-pagination-demo-container />
        <app-ellipsis-pagination-demo-container />
        <app-siblings-pagination-demo-container />
        <app-first-last-pagination-demo-container />
        <app-links-pagination-demo-container />
        <app-disabled-pagination-demo-container />
        <app-rtl-pagination-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>API reference</h2>
        @for (part of parts; track part.name) {
          <h3 class="font-heading text-base font-medium">
            {{ part.name }} —
            <code class="bg-muted rounded px-1.5 py-0.5 text-sm">{{
              part.selector
            }}</code>
          </h3>
          <p class="text-muted-foreground">{{ part.description }}</p>
          @if (part.inputs.length) {
            <div
              scTableContainer
              tabindex="0"
              role="region"
              [attr.aria-label]="part.name + ' inputs'"
            >
              <table scTable>
                <thead scTableHeader>
                  <tr scTableRow>
                    <th scTableHeaderCell>Input</th>
                    <th scTableHeaderCell>Type</th>
                    <th scTableHeaderCell>Default</th>
                    <th scTableHeaderCell>Description</th>
                  </tr>
                </thead>
                <tbody scTableBody>
                  @for (input of part.inputs; track input.name) {
                    <tr scTableRow>
                      <td scTableCell>
                        <code class="font-mono text-sm">{{ input.name }}</code>
                      </td>
                      <td scTableCell class="whitespace-normal">
                        <code class="font-mono text-sm">{{ input.type }}</code>
                      </td>
                      <td scTableCell>
                        <code class="font-mono text-sm">{{
                          input.default
                        }}</code>
                      </td>
                      <td
                        scTableCell
                        class="text-muted-foreground whitespace-normal"
                      >
                        {{ input.description }}
                      </td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          }
        }
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class PaginationPage {
  protected readonly anatomy = {
    imports: [
      'import {',
      '  ScPagination, ScPaginationList, ScPaginationItem,',
      '  ScPaginationFirst, ScPaginationPrevious, ScPaginationLink,',
      '  ScPaginationEllipsis, ScPaginationNext, ScPaginationLast,',
      '  ScPaginationStatus,',
      "} from '@semantic-components/ui';",
    ].join('\n'),
    markup: [
      '<nav scPagination aria-label="…" #pagination="scPagination"',
      '     [totalItems]="…" [pageSize]="…">',
      '  <ul scPaginationList>',
      '    <li scPaginationItem><button scPaginationFirst>…</button></li>',
      '    <li scPaginationItem><button scPaginationPrevious>…</button></li>',
      '    @for (item of pagination.pages(); track item.value) {',
      '      <li scPaginationItem>',
      "        @if (item.type === 'ellipsis') {",
      '          <span scPaginationEllipsis><svg></svg></span>',
      '        } @else {',
      '          <button scPaginationLink [page]="item.value">…</button>',
      '        }',
      '      </li>',
      '    }',
      '    <li scPaginationItem><button scPaginationNext>…</button></li>',
      '    <li scPaginationItem><button scPaginationLast>…</button></li>',
      '  </ul>',
      '  <p scPaginationStatus>…</p>',
      '</nav>',
    ].join('\n'),
  };

  private readonly classRow: ScApiRow = {
    name: 'class',
    type: 'string',
    default: "''",
    description: 'Classes merged over the preset (cn: a later class wins).',
  };

  private readonly disabledRow: ScApiRow = {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description:
      'Disabled whatever the page (it is disabled by itself at the end it leads to).',
  };

  private readonly variantRow: ScApiRow = {
    name: 'variant',
    type: 'ScButtonVariants["variant"]',
    default: "'ghost'",
    description: 'The button look.',
  };

  private readonly sizeRow: ScApiRow = {
    name: 'size',
    type: 'ScButtonVariants["size"]',
    default: "'default'",
    description: "The button size; 'icon' for an icon-only button.",
  };

  private readonly typeRow: ScApiRow = {
    name: 'type',
    type: "'button' | 'submit' | 'reset'",
    default: "'button'",
    description:
      'On a button: its type, so by default it never submits a form round it. Not set on a link.',
  };

  protected readonly parts = [
    {
      name: 'ScPagination',
      selector: 'nav[scPagination], div[scPagination]',
      description:
        'The navigation; exported as scPagination. It reads currentPage() (kept between 1 and the last page, even as items go), pageSize(), totalPages() (at least 1), previousPage() and nextPage() (null at the ends), range() (the items shown: { start, end }) and pages(). Methods: goToPage(page), changePageSize(size), which goes back to page 1. Output change ({ page, pageSize }): the user changed one, to load that page.',
      inputs: [
        {
          name: 'totalItems',
          type: 'number',
          default: '0',
          description:
            'How many items there are; the pages are counted from it.',
        },
        {
          name: 'pageSize',
          type: 'number',
          default: '10',
          description: 'Items per page; [(pageSize)] two-way.',
        },
        {
          name: 'currentPage',
          type: 'number',
          default: '1',
          description: 'The page; [(currentPage)] two-way.',
        },
        {
          name: 'siblings',
          type: 'number',
          default: '1',
          description: 'Pages shown on each side of the current one.',
        },
        {
          name: 'boundaries',
          type: 'number',
          default: '1',
          description: 'Pages always shown at the start and at the end.',
        },
        this.classRow,
      ],
    },
    {
      name: 'ScPaginationList, ScPaginationItem',
      selector: 'ul[scPaginationList], li[scPaginationItem]',
      description: 'The list of buttons, in a row; a place in it.',
      inputs: [this.classRow],
    },
    {
      name: 'ScPaginationLink',
      selector: 'a[scPaginationLink], button[scPaginationLink]',
      description:
        'A page. Outlined and aria-current="page" while it is the current one.',
      inputs: [
        {
          name: 'page',
          type: 'number',
          default: '—',
          description: 'The page it goes to.',
        },
        {
          name: 'size',
          type: 'ScButtonVariants["size"]',
          default: "'icon'",
          description: 'The button size.',
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: 'Not followed; aria-disabled and out of the tab order.',
        },
        this.typeRow,
        this.classRow,
      ],
    },
    {
      name: 'ScPaginationPrevious, ScPaginationNext',
      selector:
        'a[scPaginationPrevious], button[scPaginationPrevious], a[scPaginationNext], button[scPaginationNext]',
      description: 'One page back or on. Their chevrons flip right to left.',
      inputs: [
        this.variantRow,
        this.sizeRow,
        this.disabledRow,
        this.typeRow,
        this.classRow,
      ],
    },
    {
      name: 'ScPaginationFirst, ScPaginationLast',
      selector:
        'a[scPaginationFirst], button[scPaginationFirst], a[scPaginationLast], button[scPaginationLast]',
      description: 'The first or the last page.',
      inputs: [
        this.variantRow,
        this.sizeRow,
        this.disabledRow,
        this.typeRow,
        this.classRow,
      ],
    },
    {
      name: 'ScPaginationEllipsis',
      selector: 'span[scPaginationEllipsis]',
      description: 'Pages left out; hidden from screen readers.',
      inputs: [this.classRow],
    },
    {
      name: 'ScPaginationStatus',
      selector: '[scPaginationStatus]',
      description:
        'Says which page is shown, and announces it when it changes (a polite live region). Its text is yours: Page {{ pagination.currentPage() }} of {{ pagination.totalPages() }}, visible or sr-only.',
      inputs: [this.classRow],
    },
  ];
}
