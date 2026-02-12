import {
  computed,
  Directive,
  InjectionToken,
  input,
  model,
  output,
} from '@angular/core';
import { cn } from '../../utils';

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

@Directive({
  selector: '[sc-data-table]',
  exportAs: 'scDataTable',
  providers: [{ provide: SC_DATA_TABLE, useExisting: ScDataTable }],
  host: {
    'data-slot': 'data-table',
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
  readonly rowSelection = model<Set<number>>(new Set());

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

  getCellValue(row: T, column: ColumnDef<T>): unknown {
    if (column.accessorFn) {
      return column.accessorFn(row);
    }
    if (column.accessorKey) {
      return row[column.accessorKey];
    }
    return '';
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

  toggleColumnVisibility(columnId: string): void {
    const current = this.columnVisibility();
    const isVisible = current[columnId] !== false;
    this.columnVisibility.set({ ...current, [columnId]: !isVisible });
  }

  setColumnVisibility(columnId: string, visible: boolean): void {
    const current = this.columnVisibility();
    this.columnVisibility.set({ ...current, [columnId]: visible });
  }

  toggleRowSelection(index: number): void {
    const selection = new Set(this.rowSelection());
    if (selection.has(index)) {
      selection.delete(index);
    } else {
      selection.add(index);
    }
    this.rowSelection.set(selection);
  }

  toggleAllRowSelection(): void {
    const data = this.sortedData();
    const selection = this.rowSelection();

    if (selection.size === data.length) {
      this.rowSelection.set(new Set());
    } else {
      this.rowSelection.set(new Set(data.map((_, i) => i)));
    }
  }

  isRowSelected(index: number): boolean {
    return this.rowSelection().has(index);
  }

  isAllRowsSelected(): boolean {
    const data = this.sortedData();
    return data.length > 0 && this.rowSelection().size === data.length;
  }

  isSomeRowsSelected(): boolean {
    const selection = this.rowSelection();
    const data = this.sortedData();
    return selection.size > 0 && selection.size < data.length;
  }
}
