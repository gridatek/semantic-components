# Data Table

Table state and parts: global filtering, sorting, paging, column visibility and row selection. You write the `<table>`; the root gives you the rows to render.

## Usage

```html
<div scDataTable #table="scDataTable" [data]="users" [columns]="columns" [pageSize]="10">
  <div class="flex items-center justify-between py-4">
    <input scDataTableFilter placeholder="Search all columns..." aria-label="Search users" />
    <div scDataTableColumnToggle></div>
  </div>

  <table class="w-full text-sm">
    <thead scDataTableHeader>
      <tr>
        <th scDataTableHead>
          <input type="checkbox" aria-label="Select all rows" [checked]="table.isAllRowsSelected()" [indeterminate]="table.isSomeRowsSelected()" (change)="table.toggleAllRowSelection()" />
        </th>
        <th scDataTableHead columnId="name" [sortable]="true">Name</th>
        <th scDataTableHead columnId="email" [sortable]="true">Email</th>
      </tr>
    </thead>
    <tbody scDataTableBody>
      @for (user of table.rows(); track user.id) {
      <tr scDataTableRow [selected]="table.isRowSelected(user)">
        <td scDataTableCell>
          <input type="checkbox" [attr.aria-label]="'Select ' + user.name" [checked]="table.isRowSelected(user)" (change)="table.toggleRowSelection(user)" />
        </td>
        <td scDataTableCell columnId="name">{{ user.name }}</td>
        <td scDataTableCell columnId="email">{{ user.email }}</td>
      </tr>
      } @empty {
      <tr>
        <td colspan="3">No results found.</td>
      </tr>
      }
    </tbody>
  </table>

  <div scDataTablePagination [pageSizes]="[10, 20, 50]"></div>
</div>
```

`rows()` is the current page of the filtered, sorted data. Give header and body cells a `columnId` so they hide with their column.

## Components

### ScDataTable — `[scDataTable]` (`exportAs: 'scDataTable'`)

| Input     | Type             | Default | Description        |
| --------- | ---------------- | ------- | ------------------ |
| `data`    | `T[]`            | `[]`    | Data array         |
| `columns` | `ColumnDef<T>[]` | `[]`    | Column definitions |
| `class`   | `string`         | `''`    | Additional CSS     |

| Model              | Type                    | Default     | Description                                        |
| ------------------ | ----------------------- | ----------- | -------------------------------------------------- |
| `sorting`          | `SortingState \| null`  | `null`      | Current sort                                       |
| `columnVisibility` | `ColumnVisibilityState` | `{}`        | Column visibility map                              |
| `globalFilter`     | `string`                | `''`        | Filter text                                        |
| `rowSelection`     | `ReadonlySet<T>`        | `new Set()` | Selected rows (by identity, across pages)          |
| `pageSize`         | `number`                | `10`        | Rows per page                                      |
| `page`             | `number`                | `1`         | Current page, 1-based (clamped by `currentPage()`) |

| Output         | Type                   | Description    |
| -------------- | ---------------------- | -------------- |
| `sortChange`   | `SortingState \| null` | Sort changed   |
| `filterChange` | `string`               | Filter changed |

Signals: `filteredData()`, `sortedData()`, `rows()`, `pageCount()`, `currentPage()`, `visibleColumns()`.

Methods: `toggleSort(id)`, `setFilter(text)` (also resets to page 1), `goToPage(n)`, `setPageSize(n)`, `isColumnVisible(id)`, `toggleColumnVisibility(id)`, `setColumnVisibility(id, visible)`, `isRowSelected(row)`, `toggleRowSelection(row)`, `toggleAllRowSelection()` (every row matching the filter), `isAllRowsSelected()`, `isSomeRowsSelected()`.

### ScDataTableHead — `[scDataTableHead]`

| Input      | Type      | Default | Description                            |
| ---------- | --------- | ------- | -------------------------------------- |
| `columnId` | `string`  | `''`    | Column it belongs to (sorting, hiding) |
| `sortable` | `boolean` | `false` | Renders a sort button with the content |

Sets `aria-sort` (`ascending` / `descending` / `none`) on sortable headers.

### ScDataTableCell — `[scDataTableCell]`

| Input      | Type     | Default | Description                           |
| ---------- | -------- | ------- | ------------------------------------- |
| `columnId` | `string` | `''`    | Column it belongs to (hidden with it) |

### ScDataTableRow — `[scDataTableRow]`

| Input      | Type      | Default | Description                      |
| ---------- | --------- | ------- | -------------------------------- |
| `selected` | `boolean` | `false` | Sets `data-selected` for styling |

### ScDataTableHeader / ScDataTableBody

`<thead>` / `<tbody>` styling.

### ScDataTableFilter — `input[scDataTableFilter]`

Filters across all columns as you type. Give it an accessible name (`aria-label` or a `<label>`).

### ScDataTableColumnToggle — `[scDataTableColumnToggle]`

"Columns" disclosure: the button has `aria-expanded` / `aria-controls`; the panel is a group of checkboxes ("Toggle columns"), one per column with `enableHiding !== false`. Escape closes it and returns focus to the button; a click outside closes it.

### ScDataTablePagination — `[scDataTablePagination]`

Row count, a labelled "Rows per page" select, "Page X of Y" (`aria-live="polite"`) and first/previous/next/last buttons. Reads and writes the table's `pageSize` / `page`.

| Input           | Type       | Default                | Description          |
| --------------- | ---------- | ---------------------- | -------------------- |
| `pageSizes`     | `number[]` | `[10, 20, 30, 40, 50]` | Page size options    |
| `showSelection` | `boolean`  | `true`                 | Show selection count |

## Types

```typescript
interface ColumnDef<T> {
  id: string;
  header: string;
  accessorKey?: keyof T;
  accessorFn?: (row: T) => unknown;
  cell?: (row: T) => string;
  enableSorting?: boolean;
  enableHiding?: boolean;
  sortingFn?: (a: T, b: T, direction: SortDirection) => number;
}

interface SortingState {
  id: string;
  desc: boolean;
}

interface ColumnVisibilityState {
  [columnId: string]: boolean;
}
```

## Accessibility

- Native table semantics; sortable headers are buttons inside `<th aria-sort>`.
- Give selection checkboxes names ("Select all rows", "Select Jane Smith") and icon-only row actions an `aria-label`.
- The column toggle is a disclosure (`aria-expanded`), Escape returns focus.
- Page changes are announced ("Page 2 of 3").
