import { Component, ViewEncapsulation } from '@angular/core';
import { ScKbd, ScLink, ScTypeset } from '@semantic-components/ui';
import { Anatomy } from '../../../components/anatomy/anatomy';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { EntryInstall } from '../../../components/entry-install/entry-install';
import { PartsTable } from '../../../components/parts-table/parts-table';
import { TocHeading } from '../../../components/toc/toc-heading';
import { DataTableUsageDemoContainer } from './demos/data-table-usage-demo-container';
import { FeaturedDataTableDemoContainer } from './demos/featured-data-table-demo-container';
import { PaymentsDataTableDemoContainer } from './demos/payments-data-table-demo-container';
import { PinnedDataTableDemoContainer } from './demos/pinned-data-table-demo-container';
import { RtlDataTableDemoContainer } from './demos/rtl-data-table-demo-container';

@Component({
  selector: 'app-data-table-page',
  imports: [
    PartsTable,
    Anatomy,
    DataTableUsageDemoContainer,
    EntryInstall,
    FeaturedDataTableDemoContainer,
    PaymentsDataTableDemoContainer,
    PinnedDataTableDemoContainer,
    RtlDataTableDemoContainer,
    ScKbd,
    ScLink,
    TocHeading,
    ComponentBadges,
    ScTypeset,
  ],
  template: `
    <div class="space-y-12">
      <div class="space-y-2">
        <h1 scTypeset>Data Table</h1>
        <p class="text-muted-foreground">
          Styled, accessible parts for data tables powered by TanStack Table:
          sorting, filtering, column visibility, row selection, pinning and
          pagination.
        </p>
        <app-component-badges path="data-table" />
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Installation</h2>
        <app-entry-install
          entry="data-table"
          library="@tanstack/angular-table"
          href="https://tanstack.com/table"
          names="ScDataTableProvider, ScDataTable, ScDataTableRow, ScDataTableCell"
        />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Usage</h2>
        <app-data-table-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Anatomy</h2>
        <p>
          TanStack Table builds the table (its columns, rows and state); the
          data table&apos;s parts render it, one attribute per element: each
          brings the look of the part it stands for (the Table&apos;s, the
          Input&apos;s, the Pagination&apos;s). The checkboxes are the
          exception: they go on an <code scTypeset>scCheckbox</code>. The
          provider holds the table once, for the parts that need it: the filter,
          "select all", the pagination, a tree grid. Add the parts for what you
          need: sorting, filtering, selection, paging, column visibility, a
          tree.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>TanStack Table</h2>
        <p>
          <a scLink href="https://tanstack.com/table">TanStack Table</a>
          keeps the state — sorting, filters, selection, the page, the columns
          shown and pinned — and these parts render it and send your clicks
          back. Register the features of the parts you use with
          <code scTypeset>tableFeatures()</code>: TanStack only gives a table
          the methods of its features. The parts are typed structurally, so they
          don&apos;t pin a TanStack version.
        </p>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            Sorting: <code scTypeset>rowSortingFeature</code> and a sorted row
            model, the sort button in the header cell.
          </li>
          <li>
            Filtering: <code scTypeset>globalFilteringFeature</code> or
            <code scTypeset>columnFilteringFeature</code>, a filtered row model
            and the filter functions you name (<code scTypeset
              >filterFns: &#123; includesString &#125;</code
            >, a column&apos;s
            <code scTypeset>filterFn: 'includesString'</code>).
          </li>
          <li>
            Selection: <code scTypeset>rowSelectionFeature</code>; select all
            covers the page (<code scTypeset>scope="all"</code>: every row).
          </li>
          <li>
            Pages: <code scTypeset>rowPaginationFeature</code> and a paginated
            row model; the Pagination&apos;s parts inside
            <code scTypeset>scDataTablePagination</code>.
          </li>
          <li>
            Columns shown: <code scTypeset>columnVisibilityFeature</code> — a
            Menu&apos;s checkbox items, or
            <code scTypeset>scDataTableColumnVisibility</code> checkboxes in a
            Popover.
          </li>
          <li>
            Pinned columns: <code scTypeset>columnPinningFeature</code>; with
            several on one side, column sizing gives their offsets.
          </li>
        </ul>
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Accessibility</h2>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            A sortable column&apos;s header says how it is sorted (<code
              scTypeset
              >aria-sort</code
            >); its button sorts it, <kbd scKbd>Shift</kbd> + click adds it to
            the sort.
          </li>
          <li>
            Name every checkbox ("Select all", "Select row" or the row&apos;s
            name), every filter, and the buttons of a row (a span with sr-only).
          </li>
          <li>The pagination is a navigation landmark: name it.</li>
          <li>
            A table wider than its box scrolls: make the box a named region that
            takes focus (<code scTypeset>tabindex="0"</code>,
            <code scTypeset>role="region"</code>,
            <code scTypeset>aria-label</code>), so the keyboard scrolls it too —
            the Pinned Columns example.
          </li>
          <li>
            A change the page doesn&apos;t show — a copied id — said in a live
            region.
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scTypeset appToc>Examples</h2>
        <app-payments-data-table-demo-container />
        <app-featured-data-table-demo-container />
        <app-pinned-data-table-demo-container />
        <app-rtl-data-table-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>API reference</h2>
        <p>
          Each part takes class, merged over its look (cn: a later class wins).
          The parts are typed structurally: pass TanStack&apos;s own table,
          column and row objects.
        </p>
        <app-parts-table label="Data Table parts" [parts]="parts" />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class DataTablePage {
  private readonly anatomy = {
    imports: [
      'import {',
      '  ScDataTableProvider, ScDataTableContainer, ScDataTable, ScDataTableHeader,',
      '  ScDataTableBody, ScDataTableRow, ScDataTableHeaderCell, ScDataTableCell, ScDataTableSortButton,',
      '  ScDataTableSelectAll, ScDataTableSelectRow, ScDataTableGlobalFilter,',
      '  ScDataTableColumnFilter, ScDataTableColumnVisibility, ScDataTablePagination,',
      "} from '@semantic-components/ui/data-table';",
    ].join('\n'),
    markup: [
      '<div scDataTableProvider [table]="table">',
      '  <input scDataTableGlobalFilter aria-label="…" />',
      '  <div scDataTableContainer>',
      '    <table scDataTable>',
      '      <thead scDataTableHeader>',
      '        <tr scDataTableRow>',
      '          <th scDataTableHeaderCell [column]="…">',
      '            <input type="checkbox" scCheckbox scDataTableSelectAll aria-label="…" />',
      '            <button scDataTableSortButton [column]="…">…</button>',
      '          </th>',
      '        </tr>',
      '      </thead>',
      '      <tbody scDataTableBody>',
      '        <tr scDataTableRow [row]="row">',
      '          <td scDataTableCell [column]="…">',
      '            <input type="checkbox" scCheckbox scDataTableSelectRow [row]="row" />',
      '          </td>',
      '        </tr>',
      '      </tbody>',
      '    </table>',
      '  </div>',
      '  <nav scDataTablePagination aria-label="…">…</nav>',
      '</div>',
    ].join('\n'),
  };

  private readonly parts = [
    {
      name: 'ScDataTableProvider',
      selector: 'div[scDataTableProvider]',
      description:
        "[table]: TanStack's table, held for the parts around it and in it — the filter, select all, the pagination, a tree grid. Wraps them.",
    },
    {
      name: 'ScDataTableContainer, ScDataTable, ScDataTableHeader, ScDataTableBody, ScDataTableFooter, ScDataTableCaption',
      selector:
        'div[scDataTableContainer], table[scDataTable], thead[scDataTableHeader], tbody[scDataTableBody], tfoot[scDataTableFooter], caption[scDataTableCaption]',
      description:
        "The table's box (it scrolls sideways), the table and its sections, in the Table's look.",
    },
    {
      name: 'ScDataTableHeaderCell',
      selector: 'th[scDataTableHeaderCell]',
      description:
        "A header cell, in the Table's look; bound to its column ([column]): aria-sort while sortable, sticky when pinned.",
    },
    {
      name: 'ScDataTableCell',
      selector: 'td[scDataTableCell]',
      description:
        "A cell, in the Table's look; bound to its column ([column]): sticky when pinned.",
    },
    {
      name: 'ScDataTableRow',
      selector: 'tr[scDataTableRow]',
      description:
        'A row, in the Table\'s look; bound to its row ([row], in the body): data-state="selected" while selected; in a tree grid, its level, place and open state.',
    },
    {
      name: 'ScDataTableSortButton',
      selector: 'button[scDataTableSortButton]',
      description:
        "[column]: sorts it on click (Shift+click adds to a multi-sort). The style's button (variant ghost, size sm by default). Your icons, from direction() (exportAs scDataTableSortButton).",
    },
    {
      name: 'ScDataTableSelectAll',
      selector: 'input[type="checkbox"][scDataTableSelectAll]',
      description:
        "Checked when every row is selected, indeterminate when some are. scope ('page', default, or 'all'). On an scCheckbox; name it.",
    },
    {
      name: 'ScDataTableSelectRow',
      selector: 'input[type="checkbox"][scDataTableSelectRow]',
      description:
        "[row]: the row's selection; disabled when it can't be selected, half-ticked when only some sub-rows are. On an scCheckbox; name it.",
    },
    {
      name: 'ScDataTableGlobalFilter, ScDataTableColumnFilter',
      selector:
        'input[scDataTableGlobalFilter], input[scDataTableColumnFilter]',
      description:
        "Filter the whole table or one column ([column]) as you type; empty clears it. In the Input's look; name them.",
    },
    {
      name: 'ScDataTableColumnVisibility',
      selector: 'input[type="checkbox"][scDataTableColumnVisibility]',
      description:
        '[column]: shows or hides it. On an scCheckbox — in a popover, say.',
    },
    {
      name: 'ScDataTablePagination',
      selector: 'nav[scDataTablePagination], div[scDataTablePagination]',
      description:
        "The Pagination, its page, page size and row count from the table, its page changes back to it (exportAs scPagination). Compose the Pagination's parts inside as usual.",
    },
    {
      name: 'ScDataTableTreeGrid, ScDataTableTreeCell, ScDataTableExpand, ScDataTableExpandAll',
      selector:
        'table[scDataTableTreeGrid], div[scDataTableTreeCell], button[scDataTableExpand], button[scDataTableExpandAll]',
      description:
        'A tree table (WAI-ARIA treegrid): one tab stop, ↑ ↓ between rows, → / ← open, close or move in and out (mirrored right to left); the first cell indented by depth with its expand button; open or close all. The tree grid is the table itself, in the Table look.',
    },
  ];
}
