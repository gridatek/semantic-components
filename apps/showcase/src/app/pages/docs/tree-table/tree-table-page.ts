import { Component, ViewEncapsulation } from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { EntryInstall } from '../../../components/entry-install/entry-install';
import { TocHeading } from '../../../components/toc/toc-heading';
import { BasicTreeTableDemoContainer } from './demos/basic-tree-table-demo-container';
import { ExpandAllTreeTableDemoContainer } from './demos/expand-all-tree-table-demo-container';
import { FilterTreeTableDemoContainer } from './demos/filter-tree-table-demo-container';
import { RtlTreeTableDemoContainer } from './demos/rtl-tree-table-demo-container';
import { SelectionTreeTableDemoContainer } from './demos/selection-tree-table-demo-container';

@Component({
  selector: 'app-tree-table-page',
  imports: [
    BasicTreeTableDemoContainer,
    ExpandAllTreeTableDemoContainer,
    SelectionTreeTableDemoContainer,
    FilterTreeTableDemoContainer,
    RtlTreeTableDemoContainer,
    TocHeading,
    ComponentBadges,
    EntryInstall,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Tree Table</h1>
        <p class="text-muted-foreground">
          A Data Table whose rows open on their children: folders and files,
          tasks and subtasks. TanStack's expanding feature builds the tree;
          these parts indent it, open it, and make it a tree grid — one tab
          stop, the arrows to move, open and close, Space to select.
        </p>
        <app-component-badges path="tree-table" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Installation</h2>
        <app-entry-install
          entry="data-table"
          library="@tanstack/angular-table"
          href="https://tanstack.com/table"
          names="ScDataTableTreeGrid, ScDataTableRow, ScDataTableTreeCell, ScDataTableExpand"
        />
      </section>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-basic-tree-table-demo-container />
        <app-expand-all-tree-table-demo-container />
        <app-selection-tree-table-demo-container />
        <app-filter-tree-table-demo-container />
        <app-rtl-tree-table-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class TreeTablePage {}
