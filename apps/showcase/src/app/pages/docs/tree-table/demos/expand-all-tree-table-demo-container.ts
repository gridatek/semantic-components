import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ExpandAllTreeTableDemo } from './expand-all-tree-table-demo';

@Component({
  selector: 'app-expand-all-tree-table-demo-container',
  imports: [DemoContainer, ExpandAllTreeTableDemo],
  template: `
    <app-demo-container
      title="Expand All"
      demoUrl="/demos/tree-table/expand-all-tree-table-demo"
      [code]="code"
    >
      <app-expand-all-tree-table-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ExpandAllTreeTableDemoContainer {
  private readonly code = `import {
  createColumnHelper,
  createExpandedRowModel,
  injectTable,
  rowExpandingFeature,
  tableFeatures,
} from '@tanstack/angular-table';
import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScDataTableBody,
  ScDataTableCell,
  ScDataTableExpand,
  ScDataTableExpandAll,
  ScDataTableHeader,
  ScDataTableHeaderCell,
  ScDataTableProvider,
  ScDataTableRow,
  ScDataTableTreeCell,
  ScDataTableTreeGrid,
} from '@semantic-components/ui/data-table';
import {
  SiChevronRightIcon,
  SiChevronsUpDownIcon,
  SiFileIcon,
  SiFolderIcon,
} from '@semantic-icons/lucide-icons';

interface FileNode {
  name: string;
  size: string;
  modified: string;
  children?: FileNode[];
}

/** Register the TanStack features the table uses: here, rows that open. */
const features = tableFeatures({
  rowExpandingFeature,
  expandedRowModel: createExpandedRowModel(),
});

const columnHelper = createColumnHelper<typeof features, FileNode>();

const columns = columnHelper.columns([
  columnHelper.accessor('name', { header: 'Name' }),
  columnHelper.accessor('size', { header: 'Size' }),
  columnHelper.accessor('modified', { header: 'Modified' }),
]);

const FILES: FileNode[] = [
  {
    name: 'src',
    size: '—',
    modified: 'Apr 28',
    children: [
      {
        name: 'app',
        size: '—',
        modified: 'Apr 28',
        children: [
          { name: 'app.ts', size: '2 KB', modified: 'Apr 28' },
          { name: 'app-routes.ts', size: '1 KB', modified: 'Mar 3' },
        ],
      },
      { name: 'main.ts', size: '1 KB', modified: 'Jan 12' },
      { name: 'styles.css', size: '4 KB', modified: 'Mar 3' },
    ],
  },
  {
    name: 'public',
    size: '—',
    modified: 'Mar 3',
    children: [
      { name: 'logo.svg', size: '3 KB', modified: 'Jan 12' },
      { name: 'favicon.ico', size: '15 KB', modified: 'Jan 12' },
    ],
  },
  { name: 'package.json', size: '2 KB', modified: 'Apr 28' },
  { name: 'README.md', size: '6 KB', modified: 'Mar 3' },
];

@Component({
  selector: 'app-expand-all-tree-table-demo',
  imports: [
    ScDataTableProvider,
    ScDataTableExpand,
    ScDataTableExpandAll,
    ScDataTableRow,
    ScDataTableTreeCell,
    ScDataTableTreeGrid,
    SiChevronRightIcon,
    SiChevronsUpDownIcon,
    SiFileIcon,
    SiFolderIcon,
    ScDataTableHeader,
    ScDataTableBody,
    ScDataTableHeaderCell,
    ScDataTableCell,
  ],
  template: \`
    <div scDataTableProvider [table]="table" class="flex flex-col gap-4">
      <div class="flex justify-end">
        <button scDataTableExpandAll>
          <svg siChevronsUpDownIcon></svg>
          {{ table.getIsAllRowsExpanded() ? 'Collapse all' : 'Expand all' }}
        </button>
      </div>
      <table scDataTableTreeGrid aria-label="Files">
        <thead scDataTableHeader>
          <tr scDataTableRow>
            <th scDataTableHeaderCell>Name</th>
            <th scDataTableHeaderCell>Size</th>
            <th scDataTableHeaderCell>Modified</th>
          </tr>
        </thead>
        <tbody scDataTableBody>
          @for (row of table.getRowModel().rows; track row.id) {
            <tr scDataTableRow [row]="row">
              <td scDataTableCell>
                <div scDataTableTreeCell [row]="row">
                  <button scDataTableExpand [row]="row">
                    <svg siChevronRightIcon></svg>
                    <span class="sr-only">Open {{ row.original.name }}</span>
                  </button>
                  @if (row.original.children) {
                    <svg siFolderIcon></svg>
                  } @else {
                    <svg siFileIcon></svg>
                  }
                  <span class="truncate">{{ row.original.name }}</span>
                </div>
              </td>
              <td scDataTableCell>{{ row.original.size }}</td>
              <td scDataTableCell>{{ row.original.modified }}</td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  \`,
  host: { class: 'block w-full max-w-2xl' },
  encapsulation: ViewEncapsulation.None,
})
export class ExpandAllTreeTableDemo {
  private readonly table = injectTable(() => ({
    features,
    columns,
    data: FILES,
    // Each row's children: the tree.
    getSubRows: (file) => file.children,
  }));
}`;
}
