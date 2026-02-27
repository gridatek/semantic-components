import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  signal,
  inject,
} from '@angular/core';

import { ScCheckbox, ScCheckboxField } from '@semantic-components/ui';
import { ScButtonPattern } from '@semantic-components/ui-lab';
import {
  type ColumnDef,
  type ColumnFiltersState,
  type ColumnPinningState,
  type ExpandedState,
  type GroupingState,
  type PaginationState,
  type RowPinningState,
  type RowSelectionState,
  type SortingState,
  type VisibilityState,
  createAngularTable,
  createColumnHelper,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getGroupedRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from '@tanstack/angular-table';

import type { User } from './user.service';
import { UserService } from './user.service';

const columnHelper = createColumnHelper<User>();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const columns: ColumnDef<User, any>[] = [
  {
    id: 'select',
    header: 'Select',
    enableSorting: false,
    enableColumnFilter: false,
  },
  {
    id: 'expand',
    header: '',
    enableSorting: false,
    enableColumnFilter: false,
  },
  columnHelper.accessor('id', {
    header: 'ID',
    enableColumnFilter: false,
  }),
  columnHelper.accessor('username', {
    header: 'Username',
    enableSorting: true,
    enableColumnFilter: true,
  }),
  columnHelper.accessor('firstName', {
    header: 'First Name',
    enableSorting: true,
    enableColumnFilter: true,
  }),
  columnHelper.accessor('lastName', {
    header: 'Last Name',
    enableSorting: true,
    enableColumnFilter: true,
  }),
  columnHelper.accessor('email', {
    header: 'Email',
    enableSorting: true,
    enableColumnFilter: false,
  }),
  columnHelper.accessor('role', {
    header: 'Role',
    enableSorting: true,
    enableColumnFilter: true,
    enableGrouping: true,
  }),
  columnHelper.accessor('plan', {
    header: 'Plan',
    enableSorting: true,
    enableColumnFilter: true,
    enableGrouping: true,
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    enableSorting: true,
    enableColumnFilter: true,
  }),
  columnHelper.accessor('joinedAt', {
    header: 'Joined',
    enableSorting: true,
    enableColumnFilter: false,
  }),
  columnHelper.accessor('lastLoginAt', {
    header: 'Last Login',
    enableSorting: true,
    enableColumnFilter: false,
  }),
  columnHelper.accessor('storageUsed', {
    header: 'Storage (MB)',
    enableSorting: true,
    enableColumnFilter: false,
    aggregationFn: 'mean',
  }),
  columnHelper.accessor('apiCalls', {
    header: 'API Calls',
    enableSorting: true,
    enableColumnFilter: false,
    aggregationFn: 'sum',
  }),
];

@Component({
  selector: 'app-data-table-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [ScCheckbox, ScCheckboxField, ScButtonPattern],
  host: { class: 'block' },
  template: `
    <div class="container mx-auto px-4 py-10">
      <h1 class="mb-6 text-3xl font-bold">TanStack Table Demo</h1>

      <!-- Toolbar -->
      <div class="mb-4 flex flex-wrap items-center gap-4">
        <!-- Global Filter -->
        <input
          type="text"
          [value]="globalFilter()"
          (input)="globalFilter.set($any($event.target).value)"
          placeholder="Search all columns..."
          class="h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        />

        <!-- Column Visibility -->
        <div class="flex items-center gap-2">
          <span class="text-sm font-medium">Columns:</span>
          @for (column of table.getAllLeafColumns(); track column.id) {
            @if (column.id !== 'select' && column.id !== 'expand') {
              <label scCheckboxField class="text-sm">
                <input
                  type="checkbox"
                  scCheckbox
                  [checked]="column.getIsVisible()"
                  (change)="column.toggleVisibility()"
                />
                {{ column.id }}
              </label>
            }
          }
        </div>

        <!-- Grouping -->
        <div class="flex items-center gap-2">
          <span class="text-sm font-medium">Group by:</span>
          <button
            (click)="toggleGrouping('role')"
            class="inline-flex h-8 items-center rounded-md border px-3 text-xs font-medium transition-colors hover:bg-accent"
            [class.bg-primary]="isGroupedBy('role')"
            [class.text-primary-foreground]="isGroupedBy('role')"
          >
            Role
          </button>
          <button
            (click)="toggleGrouping('plan')"
            class="inline-flex h-8 items-center rounded-md border px-3 text-xs font-medium transition-colors hover:bg-accent"
            [class.bg-primary]="isGroupedBy('plan')"
            [class.text-primary-foreground]="isGroupedBy('plan')"
          >
            Plan
          </button>
        </div>

        <!-- Selection Count -->
        @if (selectedRowCount() > 0) {
          <span class="text-sm text-muted-foreground">
            {{ selectedRowCount() }} of
            {{ table.getRowModel().rows.length }} row(s) selected
          </span>
        }
      </div>

      <!-- Table -->
      <div class="relative overflow-auto rounded-md border">
        <table class="w-full caption-bottom text-sm">
          <!-- Header -->
          <thead class="[&_tr]:border-b">
            @for (
              headerGroup of table.getHeaderGroups();
              track headerGroup.id
            ) {
              <tr class="border-b transition-colors hover:bg-muted/50">
                @for (header of headerGroup.headers; track header.id) {
                  <th
                    class="h-10 px-2 text-left align-middle font-medium text-muted-foreground"
                    [class.sticky]="header.column.getIsPinned()"
                    [class.left-0]="header.column.getIsPinned() === 'left'"
                    [class.right-0]="header.column.getIsPinned() === 'right'"
                    [class.z-10]="header.column.getIsPinned()"
                    [class.bg-background]="header.column.getIsPinned()"
                    [attr.colSpan]="header.colSpan"
                  >
                    @if (!header.isPlaceholder) {
                      @if (header.column.id === 'select') {
                        <label scCheckboxField>
                          <input
                            type="checkbox"
                            scCheckbox
                            [checked]="table.getIsAllPageRowsSelected()"
                            [indeterminate]="table.getIsSomePageRowsSelected()"
                            (change)="table.toggleAllPageRowsSelected()"
                          />
                        </label>
                      } @else {
                        <div
                          class="flex items-center gap-1"
                          [class.cursor-pointer]="header.column.getCanSort()"
                          [class.select-none]="header.column.getCanSort()"
                          [scButtonPattern]="header.column.getCanSort()"
                          (click)="
                            header.column.getCanSort()
                              ? header.column.toggleSorting()
                              : null
                          "
                        >
                          <span>{{ getHeaderLabel(header) }}</span>
                          @if (header.column.getIsSorted() === 'asc') {
                            <span>↑</span>
                          } @else if (header.column.getIsSorted() === 'desc') {
                            <span>↓</span>
                          }
                        </div>
                      }
                    }
                  </th>
                }
              </tr>
            }
            <!-- Column Filters Row -->
            <tr class="border-b">
              @for (
                header of table.getHeaderGroups()[
                  table.getHeaderGroups().length - 1
                ].headers;
                track header.id
              ) {
                <th class="px-2 py-1">
                  @if (header.column.getCanFilter()) {
                    <input
                      type="text"
                      [value]="getColumnFilterValue(header.column.id)"
                      (input)="
                        header.column.setFilterValue($any($event.target).value)
                      "
                      placeholder="Filter..."
                      class="h-7 w-full rounded border border-input bg-transparent px-2 text-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    />
                  }
                </th>
              }
            </tr>
          </thead>

          <!-- Body -->
          <tbody class="[&_tr:last-child]:border-0">
            @for (row of table.getRowModel().rows; track row.id) {
              <tr
                class="border-b transition-colors hover:bg-muted/50"
                [class.bg-muted/50]="row.getIsSelected()"
                [class.bg-muted/30]="row.getIsGrouped()"
              >
                @for (cell of row.getVisibleCells(); track cell.id) {
                  <td
                    class="p-2 align-middle"
                    [class.sticky]="cell.column.getIsPinned()"
                    [class.left-0]="cell.column.getIsPinned() === 'left'"
                    [class.right-0]="cell.column.getIsPinned() === 'right'"
                    [class.z-10]="cell.column.getIsPinned()"
                    [class.bg-background]="cell.column.getIsPinned()"
                  >
                    @if (cell.getIsGrouped()) {
                      <button
                        (click)="row.toggleExpanded()"
                        class="flex cursor-pointer items-center gap-1 font-medium"
                      >
                        {{ row.getIsExpanded() ? '▼' : '▶' }}
                        <span>{{ cell.getValue() }}</span>
                        <span class="ml-1 text-muted-foreground">
                          ({{ row.subRows.length }})
                        </span>
                      </button>
                    } @else if (cell.getIsAggregated()) {
                      <span class="text-muted-foreground">
                        @if (cell.column.id === 'storageUsed') {
                          Avg:
                          {{ formatNumber(asNumber(cell.getValue())) }}
                          MB
                        } @else if (cell.column.id === 'apiCalls') {
                          Total:
                          {{ formatNumber(asNumber(cell.getValue())) }}
                        } @else {
                          {{ cell.getValue() }}
                        }
                      </span>
                    } @else if (cell.getIsPlaceholder()) {
                      <!-- placeholder -->
                    } @else if (isEditing(row.id, cell.column.id)) {
                      <input
                        type="text"
                        [value]="getEditValue()"
                        (input)="editValue.set($any($event.target).value)"
                        (blur)="saveEdit(row.original, cell.column.id)"
                        (keydown.enter)="saveEdit(row.original, cell.column.id)"
                        (keydown.escape)="cancelEdit()"
                        class="h-7 w-full rounded border border-input bg-transparent px-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      />
                    } @else {
                      @if (cell.column.id === 'select') {
                        <label scCheckboxField>
                          <input
                            type="checkbox"
                            scCheckbox
                            [checked]="row.getIsSelected()"
                            [disabled]="!row.getCanSelect()"
                            (change)="row.toggleSelected()"
                          />
                        </label>
                      } @else if (cell.column.id === 'expand') {
                        @if (row.getCanExpand()) {
                          <button
                            (click)="row.toggleExpanded()"
                            class="cursor-pointer p-1"
                          >
                            {{ row.getIsExpanded() ? '▼' : '▶' }}
                          </button>
                        }
                      } @else if (cell.column.id === 'role') {
                        <span
                          class="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium"
                          [class.bg-purple-100]="cell.getValue() === 'admin'"
                          [class.text-purple-800]="cell.getValue() === 'admin'"
                          [class.bg-blue-100]="cell.getValue() === 'editor'"
                          [class.text-blue-800]="cell.getValue() === 'editor'"
                          [class.bg-gray-100]="cell.getValue() === 'viewer'"
                          [class.text-gray-800]="cell.getValue() === 'viewer'"
                        >
                          {{ cell.getValue() }}
                        </span>
                      } @else if (cell.column.id === 'plan') {
                        <span
                          class="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium"
                          [class.bg-gray-100]="cell.getValue() === 'free'"
                          [class.text-gray-700]="cell.getValue() === 'free'"
                          [class.bg-blue-100]="cell.getValue() === 'pro'"
                          [class.text-blue-700]="cell.getValue() === 'pro'"
                          [class.bg-amber-100]="
                            cell.getValue() === 'enterprise'
                          "
                          [class.text-amber-700]="
                            cell.getValue() === 'enterprise'
                          "
                        >
                          {{ cell.getValue() }}
                        </span>
                      } @else if (cell.column.id === 'status') {
                        <span
                          class="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium"
                          [class.bg-green-100]="cell.getValue() === 'active'"
                          [class.text-green-800]="cell.getValue() === 'active'"
                          [class.bg-red-100]="cell.getValue() === 'inactive'"
                          [class.text-red-800]="cell.getValue() === 'inactive'"
                          [class.bg-yellow-100]="
                            cell.getValue() === 'suspended'
                          "
                          [class.text-yellow-800]="
                            cell.getValue() === 'suspended'
                          "
                        >
                          {{ cell.getValue() }}
                        </span>
                      } @else if (cell.column.id === 'storageUsed') {
                        <div class="flex items-center gap-2">
                          <div class="h-2 w-16 rounded-full bg-muted">
                            <div
                              class="h-2 rounded-full"
                              [class.bg-green-500]="
                                asNumber(cell.getValue()) < 2000
                              "
                              [class.bg-yellow-500]="
                                asNumber(cell.getValue()) >= 2000 &&
                                asNumber(cell.getValue()) < 5000
                              "
                              [class.bg-red-500]="
                                asNumber(cell.getValue()) >= 5000
                              "
                              [style.width.%]="
                                storagePercent(asNumber(cell.getValue()))
                              "
                            ></div>
                          </div>
                          <span class="text-sm">
                            {{ formatNumber(asNumber(cell.getValue())) }}
                          </span>
                        </div>
                      } @else if (cell.column.id === 'apiCalls') {
                        {{ formatNumber(asNumber(cell.getValue())) }}
                      } @else {
                        <span
                          [scButtonPattern]="canEditColumn(cell.column.id)"
                          (dblclick)="
                            canEditColumn(cell.column.id)
                              ? startEdit(
                                  row.id,
                                  cell.column.id,
                                  cell.getValue()
                                )
                              : null
                          "
                          (click)="
                            canEditColumn(cell.column.id)
                              ? startEdit(
                                  row.id,
                                  cell.column.id,
                                  cell.getValue()
                                )
                              : null
                          "
                          [class.cursor-pointer]="canEditColumn(cell.column.id)"
                          [title]="
                            canEditColumn(cell.column.id)
                              ? 'Double-click or press Enter to edit'
                              : ''
                          "
                        >
                          {{ cell.getValue() }}
                        </span>
                      }
                    }
                  </td>
                }
              </tr>
              <!-- Expanded Row Detail -->
              @if (row.getIsExpanded() && !row.getIsGrouped()) {
                <tr class="border-b bg-muted/20">
                  <td [attr.colSpan]="row.getVisibleCells().length" class="p-4">
                    <div class="grid grid-cols-2 gap-4 text-sm md:grid-cols-4">
                      <div>
                        <span class="font-medium">Username:</span>
                        {{ row.original.username }}
                      </div>
                      <div>
                        <span class="font-medium">Full Name:</span>
                        {{ row.original.firstName }}
                        {{ row.original.lastName }}
                      </div>
                      <div>
                        <span class="font-medium">Email:</span>
                        {{ row.original.email }}
                      </div>
                      <div>
                        <span class="font-medium">Role:</span>
                        {{ row.original.role }}
                      </div>
                      <div>
                        <span class="font-medium">Plan:</span>
                        {{ row.original.plan }}
                      </div>
                      <div>
                        <span class="font-medium">Status:</span>
                        {{ row.original.status }}
                      </div>
                      <div>
                        <span class="font-medium">Joined:</span>
                        {{ row.original.joinedAt }}
                      </div>
                      <div>
                        <span class="font-medium">Last Login:</span>
                        {{ row.original.lastLoginAt }}
                      </div>
                      <div>
                        <span class="font-medium">Storage:</span>
                        {{ formatNumber(row.original.storageUsed) }} MB
                      </div>
                      <div>
                        <span class="font-medium">API Calls:</span>
                        {{ formatNumber(row.original.apiCalls) }}
                      </div>
                    </div>
                  </td>
                </tr>
              }
            }
            @if (table.getRowModel().rows.length === 0) {
              <tr>
                <td
                  [attr.colSpan]="columns.length"
                  class="h-24 text-center text-muted-foreground"
                >
                  No results.
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="flex items-center justify-between px-2 py-4">
        <div class="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Rows per page:</span>
          <select
            [value]="pagination().pageSize"
            (change)="table.setPageSize(+$any($event.target).value)"
            class="h-8 rounded-md border border-input bg-transparent px-2 text-sm"
          >
            @for (size of pageSizeOptions; track size) {
              <option [value]="size">{{ size }}</option>
            }
          </select>
        </div>

        <div class="flex items-center gap-2 text-sm">
          <span class="text-muted-foreground">
            Page {{ table.getState().pagination.pageIndex + 1 }} of
            {{ table.getPageCount() }}
          </span>
          <button
            (click)="table.firstPage()"
            [disabled]="!table.getCanPreviousPage()"
            class="inline-flex h-8 w-8 items-center justify-center rounded-md border text-sm disabled:pointer-events-none disabled:opacity-50 hover:bg-accent"
          >
            &laquo;
          </button>
          <button
            (click)="table.previousPage()"
            [disabled]="!table.getCanPreviousPage()"
            class="inline-flex h-8 w-8 items-center justify-center rounded-md border text-sm disabled:pointer-events-none disabled:opacity-50 hover:bg-accent"
          >
            &lsaquo;
          </button>
          <button
            (click)="table.nextPage()"
            [disabled]="!table.getCanNextPage()"
            class="inline-flex h-8 w-8 items-center justify-center rounded-md border text-sm disabled:pointer-events-none disabled:opacity-50 hover:bg-accent"
          >
            &rsaquo;
          </button>
          <button
            (click)="table.lastPage()"
            [disabled]="!table.getCanNextPage()"
            class="inline-flex h-8 w-8 items-center justify-center rounded-md border text-sm disabled:pointer-events-none disabled:opacity-50 hover:bg-accent"
          >
            &raquo;
          </button>
        </div>
      </div>

      <!-- Pin Controls -->
      <div class="mt-4 flex flex-wrap gap-4 rounded-md border p-4">
        <h3 class="w-full text-sm font-medium">Column Pinning</h3>
        <button
          (click)="toggleColumnPin('id', 'left')"
          class="inline-flex h-8 items-center rounded-md border px-3 text-xs font-medium transition-colors hover:bg-accent"
          [class.bg-primary]="columnPinning().left?.includes('id')"
          [class.text-primary-foreground]="columnPinning().left?.includes('id')"
        >
          Pin ID Left
        </button>
        <button
          (click)="toggleColumnPin('apiCalls', 'right')"
          class="inline-flex h-8 items-center rounded-md border px-3 text-xs font-medium transition-colors hover:bg-accent"
          [class.bg-primary]="columnPinning().right?.includes('apiCalls')"
          [class.text-primary-foreground]="
            columnPinning().right?.includes('apiCalls')
          "
        >
          Pin API Calls Right
        </button>
        <button
          (click)="resetColumnPinning()"
          class="inline-flex h-8 items-center rounded-md border px-3 text-xs font-medium transition-colors hover:bg-accent"
        >
          Reset Pinning
        </button>
      </div>
    </div>
  `,
})
export default class DataTablePage {
  readonly sorting = signal<SortingState>([]);
  readonly columnFilters = signal<ColumnFiltersState>([]);
  readonly globalFilter = signal('');
  readonly columnVisibility = signal<VisibilityState>({});
  readonly rowSelection = signal<RowSelectionState>({});
  readonly pagination = signal<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  readonly expanded = signal<ExpandedState>({});
  readonly grouping = signal<GroupingState>([]);
  readonly columnPinning = signal<ColumnPinningState>({});
  readonly rowPinning = signal<RowPinningState>({ top: [], bottom: [] });

  private readonly userService = inject(UserService);
  readonly data = signal<User[]>(this.userService.getUsers());

  readonly editingCell = signal<{
    rowId: string;
    columnId: string;
  } | null>(null);
  readonly editValue = signal<string>('');

  readonly columns = columns;
  readonly pageSizeOptions = [5, 10, 20, 30];

  readonly table = createAngularTable(() => ({
    data: this.data(),
    columns: this.columns,
    state: {
      sorting: this.sorting(),
      columnFilters: this.columnFilters(),
      globalFilter: this.globalFilter(),
      columnVisibility: this.columnVisibility(),
      rowSelection: this.rowSelection(),
      pagination: this.pagination(),
      expanded: this.expanded(),
      grouping: this.grouping(),
      columnPinning: this.columnPinning(),
      rowPinning: this.rowPinning(),
    },
    onSortingChange: (updater) => {
      this.sorting.update((prev) =>
        typeof updater === 'function' ? updater(prev) : updater,
      );
    },
    onColumnFiltersChange: (updater) => {
      this.columnFilters.update((prev) =>
        typeof updater === 'function' ? updater(prev) : updater,
      );
    },
    onGlobalFilterChange: (updater) => {
      this.globalFilter.update((prev) =>
        typeof updater === 'function' ? updater(prev) : updater,
      );
    },
    onColumnVisibilityChange: (updater) => {
      this.columnVisibility.update((prev) =>
        typeof updater === 'function' ? updater(prev) : updater,
      );
    },
    onRowSelectionChange: (updater) => {
      this.rowSelection.update((prev) =>
        typeof updater === 'function' ? updater(prev) : updater,
      );
    },
    onPaginationChange: (updater) => {
      this.pagination.update((prev) =>
        typeof updater === 'function' ? updater(prev) : updater,
      );
    },
    onExpandedChange: (updater) => {
      this.expanded.update((prev) =>
        typeof updater === 'function' ? updater(prev) : updater,
      );
    },
    onGroupingChange: (updater) => {
      this.grouping.update((prev) =>
        typeof updater === 'function' ? updater(prev) : updater,
      );
    },
    onColumnPinningChange: (updater) => {
      this.columnPinning.update((prev) =>
        typeof updater === 'function' ? updater(prev) : updater,
      );
    },
    onRowPinningChange: (updater) => {
      this.rowPinning.update((prev) =>
        typeof updater === 'function' ? updater(prev) : updater,
      );
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    enableRowSelection: true,
    enableExpanding: true,
    enableGrouping: true,
    enableColumnPinning: true,
    enableRowPinning: true,
    getRowCanExpand: () => true,
  }));

  readonly selectedRowCount = computed(
    () => Object.keys(this.rowSelection()).length,
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getHeaderLabel(header: any): string {
    const headerDef = header.column.columnDef.header;
    if (typeof headerDef === 'string') return headerDef;
    return header.column.id;
  }

  asNumber(value: unknown): number {
    return Number(value) || 0;
  }

  formatNumber(value: number): string {
    return new Intl.NumberFormat('en-US').format(Math.round(value));
  }

  storagePercent(value: number): number {
    return Math.min((value / 10000) * 100, 100);
  }

  getColumnFilterValue(columnId: string): string {
    const filter = this.columnFilters().find((f) => f.id === columnId);
    return (filter?.value as string) ?? '';
  }

  toggleGrouping(columnId: string): void {
    this.grouping.update((prev) =>
      prev.includes(columnId)
        ? prev.filter((id) => id !== columnId)
        : [...prev, columnId],
    );
  }

  isGroupedBy(columnId: string): boolean {
    return this.grouping().includes(columnId);
  }

  toggleColumnPin(columnId: string, position: 'left' | 'right'): void {
    this.columnPinning.update((prev) => {
      const pinned = prev[position] ?? [];
      if (pinned.includes(columnId)) {
        return {
          ...prev,
          [position]: pinned.filter((id) => id !== columnId),
        };
      }
      return { ...prev, [position]: [...pinned, columnId] };
    });
  }

  resetColumnPinning(): void {
    this.columnPinning.set({});
  }

  canEditColumn(columnId: string): boolean {
    return columnId === 'username';
  }

  isEditing(rowId: string, columnId: string): boolean {
    const editing = this.editingCell();
    return editing?.rowId === rowId && editing?.columnId === columnId;
  }

  getEditValue(): string {
    return this.editValue();
  }

  startEdit(rowId: string, columnId: string, value: unknown): void {
    this.editingCell.set({ rowId, columnId });
    this.editValue.set(String(value ?? ''));
  }

  saveEdit(row: User, columnId: string): void {
    const value = this.editValue();
    this.data.set(this.userService.updateUser(row.id, { [columnId]: value }));
    this.editingCell.set(null);
  }

  cancelEdit(): void {
    this.editingCell.set(null);
  }
}
