import { Component, ViewEncapsulation } from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { EntryInstall } from '../../../components/entry-install/entry-install';
import { TocHeading } from '../../../components/toc/toc-heading';
import { FeaturedDataTableDemoContainer } from './demos/featured-data-table-demo-container';

@Component({
  selector: 'app-data-table-page',
  imports: [
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
          names="ScDataTable, ScDataTableRow, ScDataTableCell"
        />
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
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class DataTablePage {}
