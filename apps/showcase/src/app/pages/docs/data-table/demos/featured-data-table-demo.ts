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
import { Component, ViewEncapsulation, computed, signal } from '@angular/core';
import {
  ScBadge,
  ScButton,
  ScCheckbox,
  ScCheckboxField,
  ScFrame,
  ScInput,
  ScMenu,
  ScMenuContent,
  ScMenuItem,
  ScMenuPortal,
  ScMenuProvider,
  ScMenuSeparator,
  ScMenuTrigger,
  ScPagination,
  ScPaginationFirst,
  ScPaginationItem,
  ScPaginationLast,
  ScPaginationList,
  ScPaginationNext,
  ScPaginationPrevious,
  ScPopover,
  ScPopoverPortal,
  ScPopoverProvider,
  ScPopoverTrigger,
  ScSelect,
  ScSelectGroup,
  ScSelectIcon,
  ScSelectItem,
  ScSelectItemIndicator,
  ScSelectItemText,
  ScSelectLabel,
  ScSelectList,
  ScSelectPopup,
  ScSelectPortal,
  ScSelectTrigger,
  ScSelectValue,
  ScTable,
  ScTableBody,
  ScTableCell,
  ScTableContainer,
  ScTableHeader,
  ScTableHeaderCell,
  ScTableRow,
} from '@semantic-components/ui';
import {
  ScDataTableCell,
  ScDataTableColumnVisibility,
  ScDataTableGlobalFilter,
  ScDataTableHeaderCell,
  ScDataTablePagination,
  ScDataTableRow,
  ScDataTableSelectAll,
  ScDataTableSelectRow,
  ScDataTableSortButton,
  dataTableColumnLabel,
} from '@semantic-components/ui/data-table';
import {
  SiArrowDownIcon,
  SiArrowUpIcon,
  SiCheckIcon,
  SiChevronDownIcon,
  SiChevronLeftIcon,
  SiChevronRightIcon,
  SiChevronsLeftIcon,
  SiChevronsRightIcon,
  SiChevronsUpDownIcon,
  SiColumns3Icon,
  SiCopyIcon,
  SiEllipsisIcon,
  SiEyeIcon,
  SiTrash2Icon,
} from '@semantic-icons/lucide-icons';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  createdAt: Temporal.PlainDate;
}

/** Register the TanStack features the table uses. */
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
  columnHelper.accessor('createdAt', {
    header: 'Created',
    sortFn: (a, b) =>
      Temporal.PlainDate.compare(a.original.createdAt, b.original.createdAt),
  }),
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
    createdAt: Temporal.PlainDate.from('2024-01-15'),
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'Editor',
    status: 'active',
    createdAt: Temporal.PlainDate.from('2024-02-20'),
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob@example.com',
    role: 'Viewer',
    status: 'inactive',
    createdAt: Temporal.PlainDate.from('2024-01-10'),
  },
  {
    id: 4,
    name: 'Alice Brown',
    email: 'alice@example.com',
    role: 'Editor',
    status: 'pending',
    createdAt: Temporal.PlainDate.from('2024-03-05'),
  },
  {
    id: 5,
    name: 'Charlie Wilson',
    email: 'charlie@example.com',
    role: 'Admin',
    status: 'active',
    createdAt: Temporal.PlainDate.from('2024-02-28'),
  },
  {
    id: 6,
    name: 'Diana Miller',
    email: 'diana@example.com',
    role: 'Viewer',
    status: 'active',
    createdAt: Temporal.PlainDate.from('2024-01-22'),
  },
  {
    id: 7,
    name: 'Edward Davis',
    email: 'edward@example.com',
    role: 'Editor',
    status: 'inactive',
    createdAt: Temporal.PlainDate.from('2024-03-12'),
  },
  {
    id: 8,
    name: 'Fiona Garcia',
    email: 'fiona@example.com',
    role: 'Viewer',
    status: 'pending',
    createdAt: Temporal.PlainDate.from('2024-02-14'),
  },
  {
    id: 9,
    name: 'George Martinez',
    email: 'george@example.com',
    role: 'Admin',
    status: 'active',
    createdAt: Temporal.PlainDate.from('2024-01-30'),
  },
  {
    id: 10,
    name: 'Hannah Lee',
    email: 'hannah@example.com',
    role: 'Editor',
    status: 'active',
    createdAt: Temporal.PlainDate.from('2024-03-01'),
  },
  {
    id: 11,
    name: 'Ivan Taylor',
    email: 'ivan@example.com',
    role: 'Viewer',
    status: 'inactive',
    createdAt: Temporal.PlainDate.from('2024-02-08'),
  },
  {
    id: 12,
    name: 'Julia Anderson',
    email: 'julia@example.com',
    role: 'Editor',
    status: 'active',
    createdAt: Temporal.PlainDate.from('2024-03-18'),
  },
];

@Component({
  selector: 'app-featured-data-table-demo',
  imports: [
    SiChevronDownIcon,
    SiCheckIcon,
    ScBadge,
    ScButton,
    ScCheckbox,
    ScCheckboxField,
    ScInput,
    ScMenu,
    ScMenuContent,
    ScMenuItem,
    ScMenuPortal,
    ScMenuProvider,
    ScMenuSeparator,
    ScMenuTrigger,
    ScPagination,
    ScPopover,
    ScPopoverPortal,
    ScPopoverProvider,
    ScPopoverTrigger,
    ScPopover,
    ScPopoverPortal,
    ScPopoverProvider,
    ScPopoverTrigger,
    ScPaginationFirst,
    ScPaginationItem,
    ScPaginationLast,
    ScPaginationList,
    ScPaginationNext,
    ScSelect,
    ScSelectGroup,
    ScSelectIcon,
    ScSelectItem,
    ScSelectItemIndicator,
    ScSelectItemText,
    ScSelectLabel,
    ScSelectList,
    ScSelectPopup,
    ScSelectPortal,
    ScSelectTrigger,
    ScSelectValue,
    ScPaginationPrevious,
    ScFrame,
    ScTable,
    ScTableContainer,
    ScTableBody,
    ScTableCell,
    ScTableHeader,
    ScTableHeaderCell,
    ScTableRow,
    ScDataTableCell,
    ScDataTableColumnVisibility,
    ScDataTableGlobalFilter,
    ScDataTableHeaderCell,
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
    SiCopyIcon,
    SiEllipsisIcon,
    SiEyeIcon,
    SiTrash2Icon,
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

        <div scPopoverProvider align="end">
          <button scButton variant="outline" scPopoverTrigger>
            <svg siColumns3Icon></svg>
            Columns
          </button>
          <ng-template scPopoverPortal>
            <div scPopover aria-label="Toggle columns" class="w-44 gap-1 p-2">
              @for (column of hideableColumns(); track column.id) {
                <label scCheckboxField>
                  <input
                    type="checkbox"
                    scCheckbox
                    scDataTableColumnVisibility
                    [column]="column"
                  />
                  {{ columnLabel(column) }}
                </label>
              }
            </div>
          </ng-template>
        </div>
      </div>

      <div scTableContainer scFrame>
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
                    scDataTableHeaderCell
                    [column]="header.column"
                  >
                    @switch (header.column.id) {
                      @case ('select') {
                        <label scCheckboxField>
                          <input
                            type="checkbox"
                            scCheckbox
                            scDataTableSelectAll
                            aria-label="Select all rows"
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
                        <div scMenuProvider align="end">
                          <button
                            scButton
                            scMenuTrigger
                            variant="ghost"
                            size="icon-sm"
                          >
                            <svg siEllipsisIcon></svg>
                            <span class="sr-only">{{
                              'Actions for ' + row.original.name
                            }}</span>
                          </button>
                          <ng-template scMenuPortal>
                            <div
                              scMenu
                              (itemSelected)="onAction($event, row.original)"
                            >
                              <ng-template scMenuContent>
                                <div scMenuItem value="copy">
                                  <svg siCopyIcon></svg>
                                  Copy email
                                </div>
                                <div scMenuItem value="view">
                                  <svg siEyeIcon></svg>
                                  View details
                                </div>
                                <div scMenuSeparator></div>
                                <div
                                  scMenuItem
                                  value="delete"
                                  class="text-destructive"
                                >
                                  <svg siTrash2Icon></svg>
                                  Delete user
                                </div>
                              </ng-template>
                            </div>
                          </ng-template>
                        </div>
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
        <div class="text-muted-foreground space-y-1 text-sm">
          <p>
            {{ selectedCount() }} of {{ table.getRowCount() }} row(s) selected.
          </p>
          <p aria-live="polite">{{ lastAction() }}</p>
        </div>

        <nav
          scPagination
          scDataTablePagination
          #pagination="scPagination"
          [table]="table"
          aria-label="Users pages"
          class="mx-0 w-auto flex-wrap items-center gap-4"
        >
          <div
            scSelect
            [value]="'' + pagination.pageSize()"
            (valueChange)="pagination.changePageSize(+$event)"
            class="flex-row items-center"
          >
            <div scSelectLabel>Rows per page</div>
            <div scSelectTrigger size="sm" class="w-18">
              <span scSelectValue></span>
              <svg scSelectIcon siChevronDownIcon></svg>
            </div>
            <ng-template scSelectPortal>
              <div scSelectPopup>
                <div scSelectList>
                  <div scSelectGroup>
                    @for (size of [5, 10, 20]; track size) {
                      <div scSelectItem [value]="'' + size">
                        <span scSelectItemText>{{ size }}</span>
                        <span scSelectItemIndicator
                          ><svg siCheckIcon></svg
                        ></span>
                      </div>
                    }
                  </div>
                </div>
              </div>
            </ng-template>
          </div>
          <span class="text-sm font-medium" aria-live="polite">
            Page {{ pagination.currentPage() }} of
            {{ pagination.totalPages() }}
          </span>
          <ul scPaginationList>
            <li scPaginationItem>
              <button scPaginationFirst variant="outline" size="icon-sm">
                <svg siChevronsLeftIcon></svg>
                <span class="sr-only">Go to first page</span>
              </button>
            </li>
            <li scPaginationItem>
              <button scPaginationPrevious variant="outline" size="icon-sm">
                <svg siChevronLeftIcon></svg>
                <span class="sr-only">Go to previous page</span>
              </button>
            </li>
            <li scPaginationItem>
              <button scPaginationNext variant="outline" size="icon-sm">
                <svg siChevronRightIcon></svg>
                <span class="sr-only">Go to next page</span>
              </button>
            </li>
            <li scPaginationItem>
              <button scPaginationLast variant="outline" size="icon-sm">
                <svg siChevronsRightIcon></svg>
                <span class="sr-only">Go to last page</span>
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
  readonly users = signal<User[]>(SAMPLE_DATA);
  readonly lastAction = signal('');

  readonly table = injectTable(() => ({
    features,
    columns,
    data: this.users(),
    getRowId: (user) => String(user.id),
    initialState: { pagination: { pageIndex: 0, pageSize: 5 } },
  }));

  /** Columns the user may hide (TanStack `getCanHide()`). */
  readonly hideableColumns = computed(() =>
    this.table.getAllLeafColumns().filter((column) => column.getCanHide()),
  );
  readonly columnLabel = dataTableColumnLabel;

  readonly selectedCount = computed(
    () => Object.keys(this.table.atoms.rowSelection.get()).length,
  );

  onAction(action: unknown, user: User): void {
    switch (action) {
      case 'copy':
        void navigator.clipboard?.writeText(user.email);
        this.lastAction.set(`Copied ${user.email}`);
        break;
      case 'view':
        this.lastAction.set(
          `Viewing ${user.name} (${user.role}, ${user.status})`,
        );
        break;
      case 'delete':
        this.users.update((users) => users.filter((u) => u.id !== user.id));
        this.table.setRowSelection((selection) => {
          const next = { ...selection };
          delete next[String(user.id)];
          return next;
        });
        this.lastAction.set(`Deleted ${user.name}`);
        break;
    }
  }

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

  formatDate(date: Temporal.PlainDate): string {
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }
}
