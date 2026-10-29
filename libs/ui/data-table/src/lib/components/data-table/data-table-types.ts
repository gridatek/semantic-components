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
  /** With sub-rows: some of them selected — the box shows it, half-ticked. */
  getIsSomeSelected?(): boolean;
}

/** A row of a tree table: TanStack's, with its expanding feature. */
export interface ScDataTableTreeRow {
  id: string;
  /** 0 for a top row. */
  depth: number;
  parentId?: string;
  getCanExpand(): boolean;
  getIsExpanded(): boolean;
  toggleExpanded(expanded?: boolean): void;
  getCanSelect?(): boolean;
  getIsSelected?(): boolean;
  toggleSelected?(value?: boolean): void;
}

/** A row's place among its siblings: `aria-posinset` / `aria-setsize`. */
export interface ScDataTableTreePosition {
  readonly index: number;
  readonly count: number;
}

/** A tree table: its rows as shown — the expanded ones' children among them. */
export interface ScDataTableTreeTable {
  getRowModel(): { rows: readonly ScDataTableTreeRow[] };
}

export interface ScDataTableExpandAllTable {
  getIsAllRowsExpanded(): boolean;
  toggleAllRowsExpanded(expanded?: boolean): void;
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

/** A column's label: its string `header`, else its id. */
export function dataTableColumnLabel(
  column: ScDataTableHideableColumn,
): string {
  const header = column.columnDef.header;
  return typeof header === 'string' && header ? header : column.id;
}
