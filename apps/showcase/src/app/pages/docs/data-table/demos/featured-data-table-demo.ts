import {
  columnFilteringFeature,
  columnVisibilityFeature,
  createColumnHelper,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  globalFilteringFeature,
  injectTable,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  sortFn_alphanumeric,
  sortFn_datetime,
  sortFn_text,
  tableFeatures,
} from '@tanstack/angular-table';
import { Component, ViewEncapsulation, computed } from '@angular/core';
import {
  ScBadge,
  ScButton,
  ScCheckbox,
  ScCheckboxField,
  ScInput,
  ScPagination,
  ScPaginationFirst,
  ScPaginationItem,
  ScPaginationLast,
  ScPaginationList,
  ScPaginationNext,
  ScPaginationPageSizeSelect,
  ScPaginationPrevious,
  ScTable,
  ScTableBody,
  ScTableCell,
  ScTableHeader,
  ScTableHeaderCell,
  ScTableRow,
} from '@semantic-components/ui';
import {
  ScDataTableCell,
  ScDataTableColumnToggle,
  ScDataTableColumnToggleContent,
  ScDataTableColumnToggleTrigger,
  ScDataTableColumnVisibility,
  ScDataTableGlobalFilter,
  ScDataTableHead,
  ScDataTablePagination,
  ScDataTableRow,
  ScDataTableSelectAll,
  ScDataTableSelectRow,
  ScDataTableSortButton,
} from '@semantic-components/ui-lab';
import {
  SiArrowDownIcon,
  SiArrowUpIcon,
  SiChevronLeftIcon,
  SiChevronRightIcon,
  SiChevronsLeftIcon,
  SiChevronsRightIcon,
  SiChevronsUpDownIcon,
  SiColumns3Icon,
  SiEllipsisIcon,
} from '@semantic-icons/lucide-icons';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  createdAt: Date;
}

/** TanStack v9: register the features the table uses. */
const features = tableFeatures({
  columnFilteringFeature,
  globalFilteringFeature,
  rowSortingFeature,
  rowPaginationFeature,
  rowSelectionFeature,
  columnVisibilityFeature,
  filteredRowModel: createFilteredRowModel(),
  sortedRowModel: createSortedRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
  sortFns: {
    alphanumeric: sortFn_alphanumeric,
    text: sortFn_text,
    datetime: sortFn_datetime,
  },
});

const columnHelper = createColumnHelper<typeof features, User>();

const columns = columnHelper.columns([
  columnHelper.display({
    id: 'select',
    enableSorting: false,
    enableHiding: false,
  }),
  columnHelper.accessor('name', { header: 'Name' }),
  columnHelper.accessor('email', { header: 'Email' }),
  columnHelper.accessor('role', { header: 'Role' }),
  columnHelper.accessor('status', { header: 'Status' }),
  columnHelper.accessor('createdAt', { header: 'Created' }),
  columnHelper.display({
    id: 'actions',
    enableSorting: false,
    enableHiding: false,
  }),
]);

const SAMPLE_DATA: User[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin',
    status: 'active',
    createdAt: new Date('2024-01-15'),
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'Editor',
    status: 'active',
    createdAt: new Date('2024-02-20'),
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob@example.com',
    role: 'Viewer',
    status: 'inactive',
    createdAt: new Date('2024-01-10'),
  },
  {
    id: 4,
    name: 'Alice Brown',
    email: 'alice@example.com',
    role: 'Editor',
    status: 'pending',
    createdAt: new Date('2024-03-05'),
  },
  {
    id: 5,
    name: 'Charlie Wilson',
    email: 'charlie@example.com',
    role: 'Admin',
    status: 'active',
    createdAt: new Date('2024-02-28'),
  },
  {
    id: 6,
    name: 'Diana Miller',
    email: 'diana@example.com',
    role: 'Viewer',
    status: 'active',
    createdAt: new Date('2024-01-22'),
  },
  {
    id: 7,
    name: 'Edward Davis',
    email: 'edward@example.com',
    role: 'Editor',
    status: 'inactive',
    createdAt: new Date('2024-03-12'),
  },
  {
    id: 8,
    name: 'Fiona Garcia',
    email: 'fiona@example.com',
    role: 'Viewer',
    status: 'pending',
    createdAt: new Date('2024-02-14'),
  },
  {
    id: 9,
    name: 'George Martinez',
    email: 'george@example.com',
    role: 'Admin',
    status: 'active',
    createdAt: new Date('2024-01-30'),
  },
  {
    id: 10,
    name: 'Hannah Lee',
    email: 'hannah@example.com',
    role: 'Editor',
    status: 'active',
    createdAt: new Date('2024-03-01'),
  },
  {
    id: 11,
    name: 'Ivan Taylor',
    email: 'ivan@example.com',
    role: 'Viewer',
    status: 'inactive',
    createdAt: new Date('2024-02-08'),
  },
  {
    id: 12,
    name: 'Julia Anderson',
    email: 'julia@example.com',
    role: 'Editor',
    status: 'active',
    createdAt: new Date('2024-03-18'),
  },
];

@Component({
  selector: 'app-featured-data-table-demo',
  imports: [
    ScBadge,
    ScButton,
    ScCheckbox,
    ScCheckboxField,
    ScInput,
    ScPagination,
    ScPaginationFirst,
    ScPaginationItem,
    ScPaginationLast,
    ScPaginationList,
    ScPaginationNext,
    ScPaginationPageSizeSelect,
    ScPaginationPrevious,
    ScTable,
    ScTableBody,
    ScTableCell,
    ScTableHeader,
    ScTableHeaderCell,
    ScTableRow,
    ScDataTableCell,
    ScDataTableColumnToggle,
    ScDataTableColumnToggleContent,
    ScDataTableColumnToggleTrigger,
    ScDataTableColumnVisibility,
    ScDataTableGlobalFilter,
    ScDataTableHead,
    ScDataTablePagination,
    ScDataTableRow,
    ScDataTableSelectAll,
    ScDataTableSelectRow,
    ScDataTableSortButton,
    SiArrowDownIcon,
    SiArrowUpIcon,
    SiChevronLeftIcon,
    SiChevronRightIcon,
    SiChevronsLeftIcon,
    SiChevronsRightIcon,
    SiChevronsUpDownIcon,
    SiColumns3Icon,
    SiEllipsisIcon,
  ],
  template: `
    <div class="w-full max-w-4xl space-y-4">
      <div class="flex items-center justify-between gap-2">
        <input
          scInput
          scDataTableGlobalFilter
          [table]="table"
          placeholder="Search all columns..."
          aria-label="Search users"
          class="max-w-sm"
        />

        <div
          scDataTableColumnToggle
          #columnToggle="scDataTableColumnToggle"
          [table]="table"
        >
          <button scButton variant="outline" scDataTableColumnToggleTrigger>
            <svg siColumns3Icon></svg>
            Columns
          </button>
          <div scDataTableColumnToggleContent>
            @for (column of columnToggle.columns(); track column.id) {
              <label scCheckboxField>
                <input
                  type="checkbox"
                  scCheckbox
                  scDataTableColumnVisibility
                  [column]="column"
                />
                {{ columnToggle.label(column) }}
              </label>
            }
          </div>
        </div>
      </div>

      <div class="overflow-hidden rounded-md border">
        <table scTable>
          <thead scTableHeader>
            @for (
              headerGroup of table.getHeaderGroups();
              track headerGroup.id
            ) {
              <tr scTableRow>
                @for (header of headerGroup.headers; track header.id) {
                  <th
                    scTableHeaderCell
                    scDataTableHead
                    [column]="header.column"
                  >
                    @switch (header.column.id) {
                      @case ('select') {
                        <label scCheckboxField>
                          <input
                            type="checkbox"
                            scCheckbox
                            scDataTableSelectAll
                            [table]="table"
                          />
                        </label>
                      }
                      @case ('actions') {
                        <span class="sr-only">Actions</span>
                      }
                      @default {
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
                      }
                    }
                  </th>
                }
              </tr>
            }
          </thead>
          <tbody scTableBody>
            @for (row of table.getRowModel().rows; track row.id) {
              <tr scTableRow scDataTableRow [row]="row">
                @for (cell of row.getVisibleCells(); track cell.id) {
                  <td scTableCell scDataTableCell [column]="cell.column">
                    @switch (cell.column.id) {
                      @case ('select') {
                        <label scCheckboxField>
                          <input
                            type="checkbox"
                            scCheckbox
                            scDataTableSelectRow
                            [row]="row"
                            [attr.aria-label]="'Select ' + row.original.name"
                          />
                        </label>
                      }
                      @case ('name') {
                        <span class="font-medium">{{ row.original.name }}</span>
                      }
                      @case ('role') {
                        <span
                          scBadge
                          [variant]="roleVariant(row.original.role)"
                        >
                          {{ row.original.role }}
                        </span>
                      }
                      @case ('status') {
                        <span
                          scBadge
                          [variant]="statusVariant(row.original.status)"
                        >
                          {{ row.original.status }}
                        </span>
                      }
                      @case ('createdAt') {
                        {{ formatDate(row.original.createdAt) }}
                      }
                      @case ('actions') {
                        <button
                          scButton
                          variant="ghost"
                          size="icon-sm"
                          [attr.aria-label]="'Actions for ' + row.original.name"
                        >
                          <svg siEllipsisIcon></svg>
                        </button>
                      }
                      @default {
                        {{ cell.getValue() }}
                      }
                    }
                  </td>
                }
              </tr>
            } @empty {
              <tr scTableRow>
                <td
                  scTableCell
                  [attr.colspan]="table.getVisibleLeafColumns().length"
                  class="text-muted-foreground h-24 text-center"
                >
                  No results.
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>

      <div class="flex flex-wrap items-center justify-between gap-4">
        <p class="text-muted-foreground text-sm">
          {{ selectedCount() }} of {{ table.getRowCount() }} row(s) selected.
        </p>

        <nav
          scPagination
          scDataTablePagination
          #pagination="scPagination"
          [table]="table"
          [pageSizes]="[5, 10, 20]"
          aria-label="Users pages"
          class="mx-0 w-auto flex-wrap items-center gap-4"
        >
          <div class="flex items-center gap-2 text-sm">
            <label for="users-page-size" class="font-medium">
              Rows per page
            </label>
            <select scPaginationPageSizeSelect id="users-page-size">
              @for (size of [5, 10, 20]; track size) {
                <option [value]="size">{{ size }}</option>
              }
            </select>
          </div>
          <span class="text-sm font-medium" aria-live="polite">
            Page {{ pagination.currentPage() }} of
            {{ pagination.totalPages() }}
          </span>
          <ul scPaginationList>
            <li scPaginationItem>
              <button scPaginationFirst variant="outline" size="icon-sm">
                <svg siChevronsLeftIcon></svg>
              </button>
            </li>
            <li scPaginationItem>
              <button scPaginationPrevious variant="outline" size="icon-sm">
                <svg siChevronLeftIcon></svg>
              </button>
            </li>
            <li scPaginationItem>
              <button scPaginationNext variant="outline" size="icon-sm">
                <svg siChevronRightIcon></svg>
              </button>
            </li>
            <li scPaginationItem>
              <button scPaginationLast variant="outline" size="icon-sm">
                <svg siChevronsRightIcon></svg>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class FeaturedDataTableDemo {
  readonly table = injectTable(() => ({
    features,
    columns,
    data: SAMPLE_DATA,
    getRowId: (user) => String(user.id),
    initialState: { pagination: { pageIndex: 0, pageSize: 5 } },
  }));

  readonly selectedCount = computed(
    () => Object.keys(this.table.atoms.rowSelection.get()).length,
  );

  roleVariant(role: string): 'default' | 'secondary' | 'outline' {
    return role === 'Admin'
      ? 'default'
      : role === 'Editor'
        ? 'secondary'
        : 'outline';
  }

  statusVariant(status: User['status']): 'default' | 'secondary' | 'outline' {
    return status === 'active'
      ? 'default'
      : status === 'pending'
        ? 'secondary'
        : 'outline';
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }
}
