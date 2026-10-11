import {
  type ColumnDef,
  type ColumnFiltersState,
  type ColumnPinningState,
  type ColumnVisibilityState,
  type ExpandedState,
  type GroupingState,
  type Header,
  type PaginationState,
  type RowPinningState,
  type RowSelectionState,
  type SortingState,
  injectTable,
} from '@tanstack/angular-table';
import {
  Component,
  ViewEncapsulation,
  input,
  output,
  signal,
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
  ScButtonPattern,
  ScDataTableCell,
  ScDataTableColumnFilter,
  ScDataTableHead,
  ScDataTableRow,
  ScDataTableSelectAll,
  ScDataTableSelectRow,
  ScDataTableSortButton,
} from '@semantic-components/ui-lab';
import {
  SiArrowDownIcon,
  SiArrowUpIcon,
  SiChevronDownIcon,
  SiChevronRightIcon,
} from '@semantic-icons/lucide-icons';
import { DataTableColumnPinning } from './data-table-column-pinning';
import { type DataTableFeatures, features } from './data-table-features';
import { DataTablePagination } from './data-table-pagination';
import { DataTableToolbar } from './data-table-toolbar';
import type { User } from './user.service';

@Component({
  selector: 'app-data-table',
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
    ScDataTableCell,
    ScDataTableColumnFilter,
    ScDataTableHead,
    ScDataTableRow,
    ScDataTableSelectAll,
    ScDataTableSelectRow,
    ScDataTableSortButton,
    DataTableToolbar,
    DataTablePagination,
    DataTableColumnPinning,
  ],
  host: { class: 'block' },
  template: `
    <app-data-table-toolbar
      [table]="table"
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
                  scDataTableHead
                  [column]="header.column"
                  [attr.colSpan]="header.colSpan"
                >
                  @if (!header.isPlaceholder) {
                    @if (header.column.id === 'select') {
                      <label scCheckboxField>
                        <input
                          type="checkbox"
                          scCheckbox
                          scDataTableSelectAll
                          [table]="table"
                        />
                      </label>
                    } @else if (header.column.getCanSort()) {
                      <button
                        scDataTableSortButton
                        #sort="scDataTableSortButton"
                        [column]="header.column"
                      >
                        {{ getHeaderLabel(header) }}
                        @if (sort.direction() === 'asc') {
                          <svg siArrowUpIcon></svg>
                        } @else if (sort.direction() === 'desc') {
                          <svg siArrowDownIcon></svg>
                        }
                      </button>
                    } @else {
                      {{ getHeaderLabel(header) }}
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
                    scDataTableColumnFilter
                    [column]="header.column"
                    [attr.aria-label]="'Filter ' + getHeaderLabel(header)"
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
              scDataTableRow
              [row]="row"
              [class]="row.getIsGrouped() ? 'bg-muted/30' : ''"
            >
              @for (cell of row.getVisibleCells(); track cell.id) {
                <td scTableCell scDataTableCell [column]="cell.column">
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
                      <span class="text-muted-foreground ml-1">
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
                          scDataTableSelectRow
                          [row]="row"
                          [attr.aria-label]="'Select ' + row.original.username"
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
                [attr.colSpan]="columns().length"
                class="text-muted-foreground h-24 text-center"
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
  readonly columnVisibility = signal<ColumnVisibilityState>({});
  readonly rowSelection = signal<RowSelectionState>({});
  readonly pagination = signal<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  readonly expanded = signal<ExpandedState>({});
  readonly grouping = signal<GroupingState>([]);
  readonly columnPinning = signal<ColumnPinningState>({ start: [], end: [] });
  readonly rowPinning = signal<RowPinningState>({ top: [], bottom: [] });

  readonly columns =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- each column has its own value type
    input.required<ColumnDef<DataTableFeatures, User, any>[]>();
  readonly data = input.required<User[]>();

  readonly editSave = output<{ row: User; columnId: string; value: string }>();

  readonly editingCell = signal<{
    rowId: string;
    columnId: string;
  } | null>(null);
  readonly editValue = signal<string>('');
  readonly pageSizeOptions = [5, 10, 20, 30];

  readonly table = injectTable(() => ({
    features,
    data: this.data(),
    columns: this.columns(),
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
    enableRowSelection: true,
    enableExpanding: true,
    enableGrouping: true,
    enableColumnPinning: true,
    enableRowPinning: true,
    getRowCanExpand: () => true,
  }));

  getHeaderLabel(header: Header<DataTableFeatures, User, unknown>): string {
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
    this.editSave.emit({ row, columnId, value });
    this.editingCell.set(null);
  }

  cancelEdit(): void {
    this.editingCell.set(null);
  }
}
