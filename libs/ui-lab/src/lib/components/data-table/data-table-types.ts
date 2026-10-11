/**
 * The data table parts style and wire a headless table — built for
 * TanStack Table, but typed structurally: each part only needs the few
 * methods it calls, so this library has no dependency on TanStack. Pass
 * TanStack's own `table`, `column` and `row` objects.
 */

export type ScDataTableSortDirection = 'asc' | 'desc';
export type ScDataTablePinPosition = false | 'start' | 'end';

/** A column as used by `scDataTableHeaderCell` / `scDataTableCell`. */
export interface ScDataTableCellColumn {
  getCanSort?(): boolean;
  getIsSorted?(): false | ScDataTableSortDirection;
  getIsPinned?(): ScDataTablePinPosition;
  /** With column sizing: offset of a start-pinned column. */
  getStart?(position?: ScDataTablePinPosition | 'center'): number;
  /** With column sizing: offset of an end-pinned column. */
  getAfter?(position?: ScDataTablePinPosition | 'center'): number;
}

export interface ScDataTableSortableColumn {
  getCanSort(): boolean;
  getIsSorted(): false | ScDataTableSortDirection;
  toggleSorting(desc?: boolean, isMulti?: boolean): void;
  getCanMultiSort?(): boolean;
}

export interface ScDataTableFilterableColumn {
  getFilterValue(): unknown;
  setFilterValue(value: unknown): void;
}

export interface ScDataTableHideableColumn {
  id: string;
  columnDef: { header?: unknown };
  getCanHide(): boolean;
  getIsVisible(): boolean;
  toggleVisibility(value?: boolean): void;
}

export interface ScDataTableSelectableRow {
  getIsSelected(): boolean;
  getCanSelect(): boolean;
  toggleSelected(value?: boolean): void;
}

export interface ScDataTableSelectAllTable {
  getIsAllPageRowsSelected(): boolean;
  getIsSomePageRowsSelected(): boolean;
  toggleAllPageRowsSelected(value?: boolean): void;
  getIsAllRowsSelected(): boolean;
  getIsSomeRowsSelected(): boolean;
  toggleAllRowsSelected(value?: boolean): void;
}

export interface ScDataTableGlobalFilterTable {
  atoms: { globalFilter: { get(): unknown } };
  setGlobalFilter(value: string): void;
}

export interface ScDataTablePaginationTable {
  atoms: { pagination: { get(): { pageIndex: number; pageSize: number } } };
  /** Rows before pagination (after filtering). */
  getRowCount(): number;
  setPageIndex(pageIndex: number): void;
  setPageSize(pageSize: number): void;
}

export interface ScDataTableColumnsTable {
  getAllLeafColumns(): ScDataTableHideableColumn[];
}

/** A column's label: its string `header`, else its id. */
export function dataTableColumnLabel(
  column: ScDataTableHideableColumn,
): string {
  const header = column.columnDef.header;
  return typeof header === 'string' && header ? header : column.id;
}
