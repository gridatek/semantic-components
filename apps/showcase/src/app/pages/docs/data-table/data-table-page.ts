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
import { EntryInstall } from '../../../components/entry-install/entry-install';
import { TocHeading } from '../../../components/toc/toc-heading';
import { DataTableUsageDemoContainer } from './demos/data-table-usage-demo-container';
import { FeaturedDataTableDemoContainer } from './demos/featured-data-table-demo-container';

@Component({
  selector: 'app-data-table-page',
  imports: [
    Anatomy,
    ScTable,
    ScTableBody,
    ScTableCell,
    ScTableContainer,
    ScTableHeader,
    ScTableHeaderCell,
    ScTableRow,
    DataTableUsageDemoContainer,
    EntryInstall,
    FeaturedDataTableDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Data Table</h1>
        <p class="text-muted-foreground">
          Styled, accessible parts for data tables powered by TanStack Table:
          sorting, filtering, column visibility, row selection, pinning and
          pagination.
        </p>
        <app-component-badges path="data-table" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Installation</h2>
        <app-entry-install
          entry="data-table"
          library="@tanstack/angular-table"
          href="https://tanstack.com/table"
          names="ScDataTableHeaderCell, ScDataTableCell, ScDataTableRow"
        />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-data-table-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Anatomy</h2>
        <p class="text-muted-foreground">
          TanStack Table builds the table (its columns, rows and state); the
          table parts render it, and a data table part on a header cell, a cell
          or a row binds it to its column or row. Add the parts for what you
          need: sorting, filtering, selection, paging, column visibility, a
          tree.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-3">
        <h2 scHeading appToc>How it works</h2>
        <p class="text-sm">
          <a
            href="https://tanstack.com/table"
            class="font-medium underline underline-offset-4"
          >
            TanStack Table
          </a>
          owns the logic and state; these parts render and wire it. Build the
          table with TanStack, render it with the table primitives, and add a
          part where you need behavior. Icons stay in your template.
        </p>
        <ul class="text-muted-foreground list-inside list-disc text-sm">
          <li>
            Sort state and pinning with
            <code>scDataTableHeaderCell</code>
            and
            <code>scDataTableCell</code>
          </li>
          <li>
            Sorting with
            <code>scDataTableSortButton</code>
          </li>
          <li>
            Selection with
            <code>scDataTableSelectAll</code>
            and
            <code>scDataTableSelectRow</code>
          </li>
          <li>
            Filtering with
            <code>scDataTableGlobalFilter</code>
            and
            <code>scDataTableColumnFilter</code>
          </li>
          <li>
            Paging with
            <code>scDataTablePagination</code>
            on an
            <code>scPagination</code>
          </li>
          <li>
            Column visibility with
            <code>scDataTableColumnVisibility</code>
            checkboxes, e.g. in a
            <code>scPopover</code>
          </li>
        </ul>
        <p class="text-muted-foreground text-sm">
          The parts are typed structurally, so they don't pin a TanStack
          version. Install the npm package
          <code>&#64;tanstack/angular-table</code>
          alongside the library.
        </p>
      </section>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-featured-data-table-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>API reference</h2>
        <p class="text-muted-foreground">
          Each part takes class, merged over its own (cn: a later class wins).
          The parts are typed structurally: pass TanStack&apos;s own table,
          column and row objects.
        </p>
        <div
          scTableContainer
          tabindex="0"
          role="region"
          aria-label="Data Table parts"
        >
          <table scTable>
            <thead scTableHeader>
              <tr scTableRow>
                <th scTableHeaderCell>Part</th>
                <th scTableHeaderCell>Selector</th>
                <th scTableHeaderCell>Description</th>
              </tr>
            </thead>
            <tbody scTableBody>
              @for (part of parts; track part.name) {
                <tr scTableRow>
                  <td scTableCell>
                    <code class="font-mono text-sm">{{ part.name }}</code>
                  </td>
                  <td scTableCell>
                    <code class="font-mono text-sm">{{ part.selector }}</code>
                  </td>
                  <td
                    scTableCell
                    class="text-muted-foreground whitespace-normal"
                  >
                    {{ part.description }}
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class DataTablePage {
  protected readonly anatomy = {
    imports: [
      'import {',
      '  ScDataTableHeaderCell, ScDataTableCell, ScDataTableRow, ScDataTableSortButton,',
      '  ScDataTableSelectAll, ScDataTableSelectRow, ScDataTableGlobalFilter,',
      '  ScDataTableColumnFilter, ScDataTableColumnVisibility, ScDataTablePagination,',
      "} from '@semantic-components/ui/data-table';",
    ].join('\n'),
    markup: [
      '<input scInput scDataTableGlobalFilter [table]="table" aria-label="…" />',
      '<div scTableContainer>',
      '  <table scTable>',
      '    <thead scTableHeader>',
      '      <tr scTableRow>',
      '        <th scTableHeaderCell scDataTableHeaderCell [column]="…">',
      '          <input type="checkbox" scCheckbox scDataTableSelectAll [table]="table" />',
      '          <button scDataTableSortButton [column]="…">…</button>',
      '        </th>',
      '      </tr>',
      '    </thead>',
      '    <tbody scTableBody>',
      '      <tr scTableRow scDataTableRow [row]="row">',
      '        <td scTableCell scDataTableCell [column]="…">',
      '          <input type="checkbox" scCheckbox scDataTableSelectRow [row]="row" />',
      '        </td>',
      '      </tr>',
      '    </tbody>',
      '  </table>',
      '</div>',
      '<nav scPagination scDataTablePagination [table]="table">…</nav>',
    ].join('\n'),
  };

  protected readonly parts = [
    {
      name: 'ScDataTableHeaderCell',
      selector: 'th[scDataTableHeaderCell]',
      description:
        'A header cell bound to its column ([column]): aria-sort while sortable, sticky when pinned. With scTableHeaderCell.',
    },
    {
      name: 'ScDataTableCell',
      selector: 'td[scDataTableCell]',
      description:
        'A body cell bound to its column ([column]): sticky when pinned. With scTableCell.',
    },
    {
      name: 'ScDataTableRow',
      selector: 'tr[scDataTableRow]',
      description:
        'A body row bound to its row ([row]): data-state="selected" while selected; in a tree grid, its level, place and open state. With scTableRow.',
    },
    {
      name: 'ScDataTableSortButton',
      selector: 'button[scDataTableSortButton]',
      description:
        '[column]: sorts it on click (Shift+click adds to a multi-sort). Your icons, from direction() (exportAs scDataTableSortButton).',
    },
    {
      name: 'ScDataTableSelectAll',
      selector: 'input[type="checkbox"][scDataTableSelectAll]',
      description:
        "[table]: checked when every row is selected, indeterminate when some are. scope ('page', default, or 'all'). Alone or with scCheckbox; name it.",
    },
    {
      name: 'ScDataTableSelectRow',
      selector: 'input[type="checkbox"][scDataTableSelectRow]',
      description:
        "[row]: the row's selection; disabled when it can't be selected, half-ticked when only some sub-rows are. Name it.",
    },
    {
      name: 'ScDataTableGlobalFilter, ScDataTableColumnFilter',
      selector:
        'input[scDataTableGlobalFilter], input[scDataTableColumnFilter]',
      description:
        'Filter the whole table ([table]) or one column ([column]) as you type; empty clears it. With scInput; name them.',
    },
    {
      name: 'ScDataTableColumnVisibility',
      selector: 'input[type="checkbox"][scDataTableColumnVisibility]',
      description:
        '[column]: shows or hides it. Alone or with scCheckbox — in a popover, say.',
    },
    {
      name: 'ScDataTablePagination',
      selector: '[scPagination][scDataTablePagination]',
      description:
        "[table]: the pagination's page, page size and row count from the table, page changes back to it. Compose the pagination's parts as usual.",
    },
    {
      name: 'ScDataTableTreeGrid, ScDataTableTreeCell, ScDataTableExpand, ScDataTableExpandAll',
      selector:
        'table[scDataTableTreeGrid], div[scDataTableTreeCell], button[scDataTableExpand], button[scDataTableExpandAll]',
      description:
        'A tree table (WAI-ARIA treegrid): one tab stop, ↑ ↓ between rows, → / ← open, close or move in and out (mirrored right to left); the first cell indented by depth with its expand button; open or close all.',
    },
  ];
}
