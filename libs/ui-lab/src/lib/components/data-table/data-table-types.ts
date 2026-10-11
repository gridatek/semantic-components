/**
 * The data table parts style and wire a headless table — built for
 * TanStack Table (v9), but typed structurally: each part only needs the few
 * methods it calls, so this library has no dependency on TanStack. Pass
 * TanStack's own `table`, `column` and `row` objects.
 */

export type DataTableSortDirection = 'asc' | 'desc';
export type DataTablePinPosition = false | 'start' | 'end';

/** A column as used by `scDataTableHead` / `scDataTableCell`. */
export interface DataTableHeadColumn {
  getCanSort?(): boolean;
  getIsSorted?(): false | DataTableSortDirection;
  getIsPinned?(): DataTablePinPosition;
  /** With column sizing: offset of a start-pinned column. */
  getStart?(position?: DataTablePinPosition | 'center'): number;
  /** With column sizing: offset of an end-pinned column. */
  getAfter?(position?: DataTablePinPosition | 'center'): number;
}

export interface DataTableSortableColumn {
  getCanSort(): boolean;
  getIsSorted(): false | DataTableSortDirection;
  toggleSorting(desc?: boolean, isMulti?: boolean): void;
  getCanMultiSort?(): boolean;
}

export interface DataTableFilterableColumn {
  getFilterValue(): unknown;
  setFilterValue(value: unknown): void;
}

export interface DataTableHideableColumn {
  id: string;
  columnDef: { header?: unknown };
  getCanHide(): boolean;
  getIsVisible(): boolean;
  toggleVisibility(value?: boolean): void;
}

export interface DataTableSelectableRow {
  getIsSelected(): boolean;
  getCanSelect(): boolean;
  toggleSelected(value?: boolean): void;
}

export interface DataTableSelectAllTable {
  getIsAllPageRowsSelected(): boolean;
  getIsSomePageRowsSelected(): boolean;
  toggleAllPageRowsSelected(value?: boolean): void;
  getIsAllRowsSelected(): boolean;
  getIsSomeRowsSelected(): boolean;
  toggleAllRowsSelected(value?: boolean): void;
}

export interface DataTableGlobalFilterTable {
  atoms: { globalFilter: { get(): unknown } };
  setGlobalFilter(value: string): void;
}

export interface DataTablePaginationTable {
  atoms: { pagination: { get(): { pageIndex: number; pageSize: number } } };
  /** Rows before pagination (after filtering). */
  getRowCount(): number;
  setPageIndex(pageIndex: number): void;
  setPageSize(pageSize: number): void;
}

export interface DataTableColumnsTable {
  getAllLeafColumns(): DataTableHideableColumn[];
}

/** A column's label: its string `header`, else its id. */
export function dataTableColumnLabel(column: DataTableHideableColumn): string {
  const header = column.columnDef.header;
  return typeof header === 'string' && header ? header : column.id;
}
