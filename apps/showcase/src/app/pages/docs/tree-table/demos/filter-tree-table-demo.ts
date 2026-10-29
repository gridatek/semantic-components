import {
  columnFilteringFeature,
  createColumnHelper,
  createExpandedRowModel,
  createFilteredRowModel,
  globalFilteringFeature,
  injectTable,
  rowExpandingFeature,
  tableFeatures,
} from '@tanstack/angular-table';
import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScInput,
  ScTable,
  ScTableBody,
  ScTableCell,
  ScTableHeader,
  ScTableHeaderCell,
  ScTableRow,
} from '@semantic-components/ui';
import {
  ScDataTableExpand,
  ScDataTableGlobalFilter,
  ScDataTableRow,
  ScDataTableTreeCell,
  ScDataTableTreeGrid,
} from '@semantic-components/ui/data-table';
import {
  SiChevronRightIcon,
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
  columnFilteringFeature,
  globalFilteringFeature,
  filteredRowModel: createFilteredRowModel(),
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
          { name: 'app.routes.ts', size: '1 KB', modified: 'Mar 3' },
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
  selector: 'app-filter-tree-table-demo',
  imports: [
    ScInput,
    ScTable,
    ScTableBody,
    ScTableCell,
    ScTableHeader,
    ScTableHeaderCell,
    ScTableRow,
    ScDataTableExpand,
    ScDataTableGlobalFilter,
    ScDataTableRow,
    ScDataTableTreeCell,
    ScDataTableTreeGrid,
    SiChevronRightIcon,
    SiFileIcon,
    SiFolderIcon,
  ],
  template: `
    <input
      scInput
      scDataTableGlobalFilter
      [table]="table"
      placeholder="Filter files…"
      aria-label="Filter files"
      class="max-w-xs"
      (input)="table.toggleAllRowsExpanded(true)"
    />
    <table scTable scDataTableTreeGrid [table]="table" aria-label="Files">
      <thead scTableHeader>
        <tr scTableRow>
          <th scTableHeaderCell>Name</th>
          <th scTableHeaderCell>Size</th>
          <th scTableHeaderCell>Modified</th>
        </tr>
      </thead>
      <tbody scTableBody>
        @for (row of table.getRowModel().rows; track row.id) {
          <tr scTableRow scDataTableRow [row]="row">
            <td scTableCell>
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
            <td scTableCell>{{ row.original.size }}</td>
            <td scTableCell>{{ row.original.modified }}</td>
          </tr>
        } @empty {
          <tr scTableRow>
            <td
              scTableCell
              colspan="3"
              class="text-muted-foreground h-24 text-center"
            >
              No files match.
            </td>
          </tr>
        }
      </tbody>
    </table>
  `,
  host: { class: 'flex w-full max-w-2xl flex-col gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class FilterTreeTableDemo {
  readonly table = injectTable(() => ({
    features,
    columns,
    data: FILES,
    // Each row's children: the tree.
    getSubRows: (file) => file.children,
    // A match inside a folder keeps its folders.
    filterFromLeafRows: true,
  }));
}
