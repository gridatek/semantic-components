import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScKbd, ScLink, ScTypeset } from '@semantic-components/ui';
import { Anatomy } from '../../../components/anatomy/anatomy';
import { TocHeading } from '../../../components/toc/toc-heading';
import { BasicTreeTableDemoContainer } from './demos/basic-tree-table-demo-container';
import { ExpandAllTreeTableDemoContainer } from './demos/expand-all-tree-table-demo-container';
import { FilterTreeTableDemoContainer } from './demos/filter-tree-table-demo-container';
import { RtlTreeTableDemoContainer } from './demos/rtl-tree-table-demo-container';
import { SelectionTreeTableDemoContainer } from './demos/selection-tree-table-demo-container';
import { SortingTreeTableDemoContainer } from './demos/sorting-tree-table-demo-container';

@Component({
  selector: 'app-tree-table-page',
  imports: [
    Anatomy,
    RouterLink,
    ScKbd,
    ScLink,
    ScTypeset,
    TocHeading,
    BasicTreeTableDemoContainer,
    ExpandAllTreeTableDemoContainer,
    FilterTreeTableDemoContainer,
    RtlTreeTableDemoContainer,
    SelectionTreeTableDemoContainer,
    SortingTreeTableDemoContainer,
  ],
  template: `
    <div class="space-y-12">
      <div class="space-y-2">
        <h1 scTypeset>Tree Table</h1>
        <p class="text-muted-foreground">
          A recipe: a
          <a scLink routerLink="/docs/components/data-table">Data Table</a>
          whose rows open on their children — folders and files, tasks and
          subtasks — as a tree grid. No component of its own.
        </p>
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Usage</h2>
        <app-basic-tree-table-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>How it is made</h2>
        <p>
          TanStack&apos;s expanding feature builds the tree: register
          <code scTypeset>rowExpandingFeature</code> and an expanded row model,
          and give each row its children (<code scTypeset>getSubRows</code>).
          The Data Table&apos;s parts show it.
        </p>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            <code scTypeset>scDataTableTreeGrid</code> is the table, in a
            <code scTypeset>scDataTableProvider</code> that holds
            TanStack&apos;s table: the rows below it are one tree.
          </li>
          <li>
            In each row&apos;s first cell,
            <code scTypeset>scDataTableTreeCell</code> indents its content by
            the row&apos;s depth, and <code scTypeset>scDataTableExpand</code>
            opens it — your chevron, pointing to the end, turned down when open;
            unseen on a row without children, so the names line up.
          </li>
          <li>
            <code scTypeset>scDataTableExpandAll</code> opens every row, or
            closes them all.
          </li>
          <li>
            Selection, sorting and filtering are the Data Table&apos;s, on the
            tree: selecting a row selects its children, sorting sorts each
            folder&apos;s rows among themselves, a filter keeps the folders of
            what it finds (<code scTypeset>filterFromLeafRows</code>).
          </li>
        </ul>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
        <p>
          The parts&apos; inputs: the Data Table&apos;s
          <a
            scLink
            routerLink="/docs/components/data-table"
            fragment="api-reference"
            >API reference</a
          >.
        </p>
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Keyboard</h2>
        <p>
          The rows are one tab stop; the row is the control, not its buttons.
        </p>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            <kbd scKbd>↓</kbd> and <kbd scKbd>↑</kbd>: the next and the previous
            row; <kbd scKbd>Home</kbd> and <kbd scKbd>End</kbd>: the first and
            the last.
          </li>
          <li>
            <kbd scKbd>→</kbd> opens a row, or goes into it once open;
            <kbd scKbd>←</kbd> closes it, or goes up to its parent — both
            mirrored right to left.
          </li>
          <li><kbd scKbd>Enter</kbd> opens or closes a row.</li>
          <li>
            <kbd scKbd>Space</kbd> selects it, with the selection feature.
          </li>
        </ul>
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Accessibility</h2>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            A tree grid (WAI-ARIA): name it (<code scTypeset>aria-label</code>).
            Each row says its level, its place among its siblings and whether it
            is open — and, when rows can be selected, whether it is.
          </li>
          <li>
            The expand buttons and the row checkboxes are out of the tab order,
            the buttons hidden from screen readers: the keys on the row do what
            they do. Still name them (a span with sr-only) for the pointer.
          </li>
          <li>
            A row&apos;s checkbox is half-ticked while only some of its children
            are selected.
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scTypeset appToc>Examples</h2>
        <app-expand-all-tree-table-demo-container />
        <app-selection-tree-table-demo-container />
        <app-sorting-tree-table-demo-container />
        <app-filter-tree-table-demo-container />
        <app-rtl-tree-table-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class TreeTablePage {
  private readonly anatomy = {
    imports: [
      'import {',
      '  ScDataTableProvider, ScDataTableContainer, ScDataTableTreeGrid, ScDataTableHeader,',
      '  ScDataTableBody, ScDataTableRow, ScDataTableHeaderCell, ScDataTableCell,',
      '  ScDataTableTreeCell, ScDataTableExpand, ScDataTableExpandAll,',
      "} from '@semantic-components/ui/data-table';",
    ].join('\n'),
    markup: [
      '<div scDataTableProvider [table]="table">',
      '  <button scDataTableExpandAll>…</button>',
      '  <div scDataTableContainer>',
      '    <table scDataTableTreeGrid aria-label="…">',
      '      <thead scDataTableHeader>',
      '        <tr scDataTableRow><th scDataTableHeaderCell>…</th></tr>',
      '      </thead>',
      '      <tbody scDataTableBody>',
      '        <tr scDataTableRow [row]="row">',
      '          <td scDataTableCell>',
      '            <div scDataTableTreeCell [row]="row">',
      '              <button scDataTableExpand [row]="row">…</button>',
      '              …',
      '            </div>',
      '          </td>',
      '        </tr>',
      '      </tbody>',
      '    </table>',
      '  </div>',
      '</div>',
    ].join('\n'),
  };
}
