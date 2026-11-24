import {
  createColumnHelper,
  createExpandedRowModel,
  injectTable,
  rowExpandingFeature,
  tableFeatures,
} from '@tanstack/angular-table';
import { Dir } from '@angular/cdk/bidi';
import { Component, LOCALE_ID, ViewEncapsulation } from '@angular/core';
import {
  ScDataTableBody,
  ScDataTableCell,
  ScDataTableExpand,
  ScDataTableHeader,
  ScDataTableHeaderCell,
  ScDataTableProvider,
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
    modified: '٢٨ أبريل',
    children: [
      {
        name: 'app',
        size: '—',
        modified: '٢٨ أبريل',
        children: [
          { name: 'app.ts', size: '2 KB', modified: '٢٨ أبريل' },
          { name: 'app-routes.ts', size: '1 KB', modified: '٣ مارس' },
        ],
      },
      { name: 'main.ts', size: '1 KB', modified: '١٢ يناير' },
      { name: 'styles.css', size: '4 KB', modified: '٣ مارس' },
    ],
  },
  {
    name: 'public',
    size: '—',
    modified: '٣ مارس',
    children: [
      { name: 'logo.svg', size: '3 KB', modified: '١٢ يناير' },
      { name: 'favicon.ico', size: '15 KB', modified: '١٢ يناير' },
    ],
  },
  { name: 'package.json', size: '2 KB', modified: '٢٨ أبريل' },
  { name: 'README.md', size: '6 KB', modified: '٣ مارس' },
];

@Component({
  selector: 'app-rtl-tree-table-demo',
  imports: [
    ScDataTableProvider,
    Dir,
    ScDataTableExpand,
    ScDataTableRow,
    ScDataTableTreeCell,
    ScDataTableTreeGrid,
    SiChevronRightIcon,
    SiFileIcon,
    SiFolderIcon,
    ScDataTableHeader,
    ScDataTableBody,
    ScDataTableHeaderCell,
    ScDataTableCell,
  ],
  template: `
    <div scDataTableProvider [table]="table" class="flex flex-col gap-4">
      <div dir="rtl" lang="ar">
        <table scDataTableTreeGrid aria-label="الملفات">
          <thead scDataTableHeader>
            <tr scDataTableRow>
              <th scDataTableHeaderCell>الاسم</th>
              <th scDataTableHeaderCell>الحجم</th>
              <th scDataTableHeaderCell>آخر تعديل</th>
            </tr>
          </thead>
          <tbody scDataTableBody>
            @for (row of table.getRowModel().rows; track row.id) {
              <tr scDataTableRow [row]="row">
                <td scDataTableCell>
                  <div scDataTableTreeCell [row]="row">
                    <button scDataTableExpand [row]="row">
                      <svg siChevronRightIcon></svg>
                      <span class="sr-only">فتح {{ row.original.name }}</span>
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
    </div>
  `,
  providers: [{ provide: LOCALE_ID, useValue: 'ar' }],
  host: { class: 'block w-full max-w-2xl' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlTreeTableDemo {
  private readonly table = injectTable(() => ({
    features,
    columns,
    data: FILES,
    // Each row's children: the tree.
    getSubRows: (file) => file.children,
  }));
}
