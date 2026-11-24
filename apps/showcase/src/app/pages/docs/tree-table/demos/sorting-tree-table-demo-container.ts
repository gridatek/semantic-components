import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SortingTreeTableDemo } from './sorting-tree-table-demo';

@Component({
  selector: 'app-sorting-tree-table-demo-container',
  imports: [DemoContainer, SortingTreeTableDemo],
  template: `
    <app-demo-container
      title="Sorting"
      demoUrl="/demos/tree-table/sorting-tree-table-demo"
      [code]="code"
    >
      <app-sorting-tree-table-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class SortingTreeTableDemoContainer {
  private readonly code = `import {
  type ExpandedState,
  createColumnHelper,
  createExpandedRowModel,
  createSortedRowModel,
  injectTable,
  rowExpandingFeature,
  rowSortingFeature,
  sortFn_alphanumeric,
  sortFn_basic,
  tableFeatures,
} from '@tanstack/angular-table';
import { Component, ViewEncapsulation } from '@angular/core';
import { ScFrame } from '@semantic-components/ui';
import {
  ScDataTableBody,
  ScDataTableCell,
  ScDataTableContainer,
  ScDataTableExpand,
  ScDataTableHeader,
  ScDataTableHeaderCell,
  ScDataTableProvider,
  ScDataTableRow,
  ScDataTableSortButton,
  ScDataTableTreeCell,
  ScDataTableTreeGrid,
} from '@semantic-components/ui/data-table';
import {
  SiArrowDownIcon,
  SiArrowUpIcon,
  SiChevronRightIcon,
  SiChevronsUpDownIcon,
  SiFileIcon,
  SiFolderIcon,
} from '@semantic-icons/lucide-icons';

interface FileNode {
  name: string;
  /** In bytes; a folder's, its files'. */
  size: number;
  children?: FileNode[];
}

/** Rows that open, and sorting: TanStack sorts each folder's own rows. */
const features = tableFeatures({
  rowExpandingFeature,
  rowSortingFeature,
  expandedRowModel: createExpandedRowModel(),
  sortedRowModel: createSortedRowModel(),
  sortFns: { alphanumeric: sortFn_alphanumeric, basic: sortFn_basic },
});

const columnHelper = createColumnHelper<typeof features, FileNode>();

const columns = columnHelper.columns([
  columnHelper.accessor('name', { header: 'Name' }),
  columnHelper.accessor('size', { header: 'Size' }),
]);

const folder = (name: string, children: FileNode[]): FileNode => ({
  name,
  size: children.reduce((sum, child) => sum + child.size, 0),
  children,
});

/** Every folder open from the start. */
const ALL_OPEN: ExpandedState = true;

const FILES: FileNode[] = [
  folder('src', [
    folder('app', [
      { name: 'app.ts', size: 2_150 },
      { name: 'app-routes.ts', size: 840 },
      { name: 'app-config.ts', size: 1_320 },
    ]),
    { name: 'main.ts', size: 610 },
    { name: 'styles.css', size: 4_480 },
  ]),
  folder('public', [
    { name: 'logo.svg', size: 3_020 },
    { name: 'favicon.ico', size: 15_086 },
  ]),
  { name: 'package.json', size: 1_904 },
  { name: 'README.md', size: 6_212 },
];

/** Sorted by name or size, each folder's rows among themselves: the tree keeps its shape. */
@Component({
  selector: 'app-sorting-tree-table-demo',
  imports: [
    ScFrame,
    ScDataTableBody,
    ScDataTableCell,
    ScDataTableContainer,
    ScDataTableExpand,
    ScDataTableHeader,
    ScDataTableHeaderCell,
    ScDataTableProvider,
    ScDataTableRow,
    ScDataTableSortButton,
    ScDataTableTreeCell,
    ScDataTableTreeGrid,
    SiArrowDownIcon,
    SiArrowUpIcon,
    SiChevronRightIcon,
    SiChevronsUpDownIcon,
    SiFileIcon,
    SiFolderIcon,
  ],
  template: \`
    <div scDataTableProvider [table]="table">
      <div scDataTableContainer scFrame>
        <table scDataTableTreeGrid aria-label="Files">
          <thead scDataTableHeader>
            @for (group of table.getHeaderGroups(); track group.id) {
              <tr scDataTableRow>
                @for (header of group.headers; track header.id) {
                  <th
                    scDataTableHeaderCell
                    [column]="header.column"
                    [class.text-end]="header.column.id === 'size'"
                  >
                    <button
                      scDataTableSortButton
                      #sort="scDataTableSortButton"
                      [column]="header.column"
                    >
                      {{ header.column.columnDef.header }}
                      @switch (sort.direction()) {
                        @case ('asc') {
                          <svg siArrowUpIcon></svg>
                        }
                        @case ('desc') {
                          <svg siArrowDownIcon></svg>
                        }
                        @default {
                          <svg siChevronsUpDownIcon></svg>
                        }
                      }
                    </button>
                  </th>
                }
              </tr>
            }
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
                <td scDataTableCell class="text-end tabular-nums">
                  {{ size.format(row.original.size / 1000) }}
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  \`,
  host: { class: 'block w-full max-w-2xl' },
  encapsulation: ViewEncapsulation.None,
})
export class SortingTreeTableDemo {
  private readonly size = new Intl.NumberFormat('en-US', {
    style: 'unit',
    unit: 'kilobyte',
    maximumFractionDigits: 1,
  });

  private readonly table = injectTable(() => ({
    features,
    columns,
    data: FILES,
    getSubRows: (file) => file.children,
    initialState: { expanded: ALL_OPEN },
  }));
}`;
}
