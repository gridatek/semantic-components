import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScBadge,
  ScButton,
  ScCheckbox,
  ScCheckboxField,
  ScInput,
  ScProgress,
  ScTable,
  ScTableBody,
  ScTableCell,
  ScTableHeader,
  ScTableHeaderCell,
  ScTableRow,
} from '@semantic-components/ui';
import {
  SiArrowDownIcon,
  SiArrowUpIcon,
  SiChevronDownIcon,
  SiChevronRightIcon,
} from '@semantic-icons/lucide-icons';
import { ScButtonPattern } from '@semantic-components/ui-lab';
import {
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
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getGroupedRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from '@tanstack/angular-table';

import { DataTableColumnPinning } from './data-table-column-pinning';
import { columns } from './data-table-columns';
import { DataTablePagination } from './data-table-pagination';
import { DataTableToolbar } from './data-table-toolbar';
import type { User } from './user.service';
import { UserService } from './user.service';

@Component({
  selector: 'app-data-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [
    ScBadge,
    ScButton,
    ScCheckbox,
    ScCheckboxField,
    ScInput,
    ScProgress,
    ScTable,
    ScTableBody,
    ScTableCell,
    ScTableHeader,
    ScTableHeaderCell,
    ScTableRow,
    SiArrowUpIcon,
    SiArrowDownIcon,
    SiChevronDownIcon,
    SiChevronRightIcon,
    ScButtonPattern,
    DataTableToolbar,
    DataTablePagination,
    DataTableColumnPinning,
  ],
  host: { class: 'block' },
  template: `
    <app-data-table-toolbar
      [table]="table"
      [globalFilter]="globalFilter()"
      (globalFilterChange)="globalFilter.set($event)"
      [grouping]="grouping()"
      (groupingChange)="grouping.set($event)"
    />

    <div class="relative overflow-auto rounded-md border">
      <table scTable>
        <!-- Header -->
        <thead scTableHeader>
          @for (headerGroup of table.getHeaderGroups(); track headerGroup.id) {
            <tr scTableRow>
              @for (header of headerGroup.headers; track header.id) {
                <th
                  scTableHeaderCell
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
                        class="flex items-center gap-1 [&_svg]:size-4"
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
                          <svg siArrowUpIcon></svg>
                        } @else if (header.column.getIsSorted() === 'desc') {
                          <svg siArrowDownIcon></svg>
                        }
                      </div>
                    }
                  }
                </th>
              }
            </tr>
          }
          <!-- Column Filters Row -->
          <tr scTableRow>
            @for (
              header of table.getHeaderGroups()[
                table.getHeaderGroups().length - 1
              ].headers;
              track header.id
            ) {
              <th scTableHeaderCell class="px-2 py-1">
                @if (header.column.getCanFilter()) {
                  <input
                    scInput
                    type="text"
                    [value]="getColumnFilterValue(header.column.id)"
                    (input)="
                      header.column.setFilterValue($any($event.target).value)
                    "
                    placeholder="Filter..."
                    class="h-7 text-xs"
                  />
                }
              </th>
            }
          </tr>
        </thead>

        <!-- Body -->
        <tbody scTableBody>
          @for (row of table.getRowModel().rows; track row.id) {
            <tr
              scTableRow
              [attr.data-state]="row.getIsSelected() ? 'selected' : null"
              [class]="row.getIsGrouped() ? 'bg-muted/30' : ''"
            >
              @for (cell of row.getVisibleCells(); track cell.id) {
                <td
                  scTableCell
                  [class.sticky]="cell.column.getIsPinned()"
                  [class.left-0]="cell.column.getIsPinned() === 'left'"
                  [class.right-0]="cell.column.getIsPinned() === 'right'"
                  [class.z-10]="cell.column.getIsPinned()"
                  [class.bg-background]="cell.column.getIsPinned()"
                >
                  @if (cell.getIsGrouped()) {
                    <button
                      scButton
                      variant="ghost"
                      size="sm"
                      (click)="row.toggleExpanded()"
                      class="gap-1 font-medium"
                    >
                      @if (row.getIsExpanded()) {
                        <svg siChevronDownIcon></svg>
                      } @else {
                        <svg siChevronRightIcon></svg>
                      }
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
                      scInput
                      type="text"
                      [value]="getEditValue()"
                      (input)="editValue.set($any($event.target).value)"
                      (blur)="saveEdit(row.original, cell.column.id)"
                      (keydown.enter)="saveEdit(row.original, cell.column.id)"
                      (keydown.escape)="cancelEdit()"
                      class="h-7"
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
                          scButton
                          variant="ghost"
                          size="icon-xs"
                          (click)="row.toggleExpanded()"
                        >
                          @if (row.getIsExpanded()) {
                            <svg siChevronDownIcon></svg>
                          } @else {
                            <svg siChevronRightIcon></svg>
                          }
                        </button>
                      }
                    } @else if (cell.column.id === 'role') {
                      <span
                        scBadge
                        [variant]="
                          cell.getValue() === 'admin'
                            ? 'default'
                            : cell.getValue() === 'editor'
                              ? 'secondary'
                              : 'outline'
                        "
                      >
                        {{ cell.getValue() }}
                      </span>
                    } @else if (cell.column.id === 'plan') {
                      <span
                        scBadge
                        [variant]="
                          cell.getValue() === 'enterprise'
                            ? 'default'
                            : cell.getValue() === 'pro'
                              ? 'secondary'
                              : 'outline'
                        "
                      >
                        {{ cell.getValue() }}
                      </span>
                    } @else if (cell.column.id === 'status') {
                      <span
                        scBadge
                        [variant]="
                          cell.getValue() === 'active'
                            ? 'default'
                            : cell.getValue() === 'inactive'
                              ? 'destructive'
                              : 'secondary'
                        "
                      >
                        {{ cell.getValue() }}
                      </span>
                    } @else if (cell.column.id === 'storageUsed') {
                      <div class="flex items-center gap-2">
                        <div
                          scProgress
                          [value]="asNumber(cell.getValue())"
                          [max]="10000"
                          class="h-2 w-16"
                        >
                          <div
                            scProgressIndicator
                            [class]="storageColor(asNumber(cell.getValue()))"
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
                            ? startEdit(row.id, cell.column.id, cell.getValue())
                            : null
                        "
                        (click)="
                          canEditColumn(cell.column.id)
                            ? startEdit(row.id, cell.column.id, cell.getValue())
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
              <tr scTableRow class="bg-muted/20">
                <td scTableCell [attr.colSpan]="row.getVisibleCells().length">
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
            <tr scTableRow>
              <td
                scTableCell
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

    <app-data-table-pagination
      [table]="table"
      [pageSizeOptions]="pageSizeOptions"
    />

    <app-data-table-column-pinning
      [columnPinning]="columnPinning()"
      (columnPinningChange)="columnPinning.set($event)"
    />
  `,
})
export class DataTable {
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

  storageColor(value: number): string {
    if (value >= 5000) return 'bg-red-500';
    if (value >= 2000) return 'bg-yellow-500';
    return 'bg-green-500';
  }

  getColumnFilterValue(columnId: string): string {
    const filters = this.table.getState().columnFilters;
    const filter = filters.find((f) => f.id === columnId);
    return (filter?.value as string) ?? '';
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
