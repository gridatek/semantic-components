import {
  Directive,
  InjectionToken,
  computed,
  input,
  model,
  output,
} from '@angular/core';
import { cn } from '@semantic-components/ui';

export type SortDirection = 'asc' | 'desc' | null;

export interface ColumnDef<T> {
  id: string;
  header: string;
  accessorKey?: keyof T;
  accessorFn?: (row: T) => unknown;
  cell?: (row: T) => string;
  enableSorting?: boolean;
  enableHiding?: boolean;
  sortingFn?: (a: T, b: T, direction: SortDirection) => number;
}

export interface SortingState {
  id: string;
  desc: boolean;
}

export interface ColumnVisibilityState {
  [key: string]: boolean;
}

// Token for data table context
export const SC_DATA_TABLE = new InjectionToken<ScDataTable<unknown>>(
  'SC_DATA_TABLE',
);

/**
 * Table state: filtering, sorting, paging, column visibility and selection.
 * Render `rows()` (the current page of filtered, sorted data).
 */
@Directive({
  selector: '[scDataTable]',
  exportAs: 'scDataTable',
  providers: [{ provide: SC_DATA_TABLE, useExisting: ScDataTable }],
  host: {
    '[class]': 'class()',
  },
})
export class ScDataTable<T> {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly data = input<T[]>([]);
  readonly columns = input<ColumnDef<T>[]>([]);

  readonly sorting = model<SortingState | null>(null);
  readonly columnVisibility = model<ColumnVisibilityState>({});
  readonly globalFilter = model<string>('');
  /** Selected rows (by identity), across all pages. */
  readonly rowSelection = model<ReadonlySet<T>>(new Set());
  readonly pageSize = model<number>(10);
  /** Current page, 1-based. Clamped to `pageCount()` when read via `currentPage()`. */
  readonly page = model<number>(1);

  readonly sortChange = output<SortingState | null>();
  readonly filterChange = output<string>();

  protected readonly class = computed(() => cn('w-full', this.classInput()));

  readonly visibleColumns = computed(() => {
    const cols = this.columns();
    const visibility = this.columnVisibility();
    return cols.filter((col) => visibility[col.id] !== false);
  });

  readonly filteredData = computed(() => {
    const data = this.data();
    const filter = this.globalFilter().toLowerCase().trim();

    if (!filter) return data;

    return data.filter((row) => {
      return this.columns().some((col) => {
        const value = this.getCellValue(row, col);
        return String(value).toLowerCase().includes(filter);
      });
    });
  });

  readonly sortedData = computed(() => {
    const data = [...this.filteredData()];
    const sort = this.sorting();

    if (!sort) return data;

    const column = this.columns().find((col) => col.id === sort.id);
    if (!column) return data;

    return data.sort((a, b) => {
      if (column.sortingFn) {
        return column.sortingFn(a, b, sort.desc ? 'desc' : 'asc');
      }

      const aVal = this.getCellValue(a, column);
      const bVal = this.getCellValue(b, column);

      if (aVal === bVal) return 0;
      if (aVal === null || aVal === undefined) return 1;
      if (bVal === null || bVal === undefined) return -1;

      const comparison = aVal < bVal ? -1 : 1;
      return sort.desc ? -comparison : comparison;
    });
  });

  readonly pageCount = computed(() =>
    Math.max(1, Math.ceil(this.sortedData().length / this.pageSize())),
  );

  readonly currentPage = computed(() =>
    Math.min(Math.max(1, this.page()), this.pageCount()),
  );

  /** The rows to render: the current page of filtered, sorted data. */
  readonly rows = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize();
    return this.sortedData().slice(start, start + this.pageSize());
  });

  getCellValue(row: T, column: ColumnDef<T>): unknown {
    if (column.accessorFn) {
      return column.accessorFn(row);
    }
    if (column.accessorKey) {
      return row[column.accessorKey];
    }
    return '';
  }

  setFilter(value: string): void {
    this.globalFilter.set(value);
    this.page.set(1);
    this.filterChange.emit(value);
  }

  toggleSort(columnId: string): void {
    const column = this.columns().find((col) => col.id === columnId);
    if (!column || column.enableSorting === false) return;

    const currentSort = this.sorting();

    if (!currentSort || currentSort.id !== columnId) {
      this.sorting.set({ id: columnId, desc: false });
    } else if (!currentSort.desc) {
      this.sorting.set({ id: columnId, desc: true });
    } else {
      this.sorting.set(null);
    }

    this.sortChange.emit(this.sorting());
  }

  goToPage(page: number): void {
    this.page.set(Math.min(Math.max(1, page), this.pageCount()));
  }

  setPageSize(size: number): void {
    this.pageSize.set(size);
    this.page.set(1);
  }

  isColumnVisible(columnId: string): boolean {
    return this.columnVisibility()[columnId] !== false;
  }

  toggleColumnVisibility(columnId: string): void {
    const current = this.columnVisibility();
    const isVisible = current[columnId] !== false;
    this.columnVisibility.set({ ...current, [columnId]: !isVisible });
  }

  setColumnVisibility(columnId: string, visible: boolean): void {
    const current = this.columnVisibility();
    this.columnVisibility.set({ ...current, [columnId]: visible });
  }

  isRowSelected(row: T): boolean {
    return this.rowSelection().has(row);
  }

  toggleRowSelection(row: T): void {
    const selection = new Set(this.rowSelection());
    if (selection.has(row)) {
      selection.delete(row);
    } else {
      selection.add(row);
    }
    this.rowSelection.set(selection);
  }

  /** Selects every row matching the filter, or clears the selection. */
  toggleAllRowSelection(): void {
    this.rowSelection.set(
      this.isAllRowsSelected() ? new Set() : new Set(this.sortedData()),
    );
  }

  isAllRowsSelected(): boolean {
    const data = this.sortedData();
    const selection = this.rowSelection();
    return data.length > 0 && data.every((row) => selection.has(row));
  }

  isSomeRowsSelected(): boolean {
    const selection = this.rowSelection();
    return (
      this.sortedData().some((row) => selection.has(row)) &&
      !this.isAllRowsSelected()
    );
  }
}
