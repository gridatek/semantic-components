# Data Table

Advanced table component with sorting, filtering, column visibility, row selection, and pagination.

## Usage

```html
<div sc-data-table [data]="data" [columns]="columns">
  <input sc-data-table-filter placeholder="Search..." />
  <div sc-data-table-column-toggle></div>

  <table>
    <thead sc-data-table-header>
      <tr>
        <th sc-data-table-head columnId="name" [sortable]="true">Name</th>
        <th sc-data-table-head columnId="email" [sortable]="true">Email</th>
      </tr>
    </thead>
    <tbody sc-data-table-body>
      @for (row of data; track row.id) {
      <tr sc-data-table-row>
        <td sc-data-table-cell>{{ row.name }}</td>
        <td sc-data-table-cell>{{ row.email }}</td>
      </tr>
      }
    </tbody>
  </table>

  <div sc-data-table-pagination></div>
</div>
```

## Components

### ScDataTable

Root container that manages table state and provides context.

**Selector:** `[sc-data-table]`

**Inputs:**

| Input     | Type             | Default | Description        |
| --------- | ---------------- | ------- | ------------------ |
| `data`    | `T[]`            | `[]`    | Data array         |
| `columns` | `ColumnDef<T>[]` | `[]`    | Column definitions |
| `class`   | `string`         | `''`    | Additional CSS     |

**Two-way Bindings:**

| Binding            | Type                    | Default     | Description           |
| ------------------ | ----------------------- | ----------- | --------------------- |
| `sorting`          | `SortingState \| null`  | `null`      | Current sort state    |
| `columnVisibility` | `ColumnVisibilityState` | `{}`        | Column visibility map |
| `globalFilter`     | `string`                | `''`        | Global filter value   |
| `rowSelection`     | `Set<number>`           | `new Set()` | Selected row indices  |

**Outputs:**

| Output         | Type                   | Description            |
| -------------- | ---------------------- | ---------------------- |
| `sortChange`   | `SortingState \| null` | Emits on sort change   |
| `filterChange` | `string`               | Emits on filter change |

**Computed Properties:**

- `visibleColumns` - Columns filtered by visibility
- `filteredData` - Data filtered by global filter
- `sortedData` - Data sorted by current sort state

### ScDataTableHeader

Table header container.

**Selector:** `[sc-data-table-header]`

### ScDataTableBody

Table body container.

**Selector:** `[sc-data-table-body]`

### ScDataTableRow

Table row with selection state.

**Selector:** `[sc-data-table-row]`

**Inputs:**

| Input      | Type      | Default | Description     |
| ---------- | --------- | ------- | --------------- |
| `selected` | `boolean` | `false` | Selection state |
| `class`    | `string`  | `''`    | Additional CSS  |

### ScDataTableHead

Table header cell with optional sorting.

**Selector:** `[sc-data-table-head]`

**Inputs:**

| Input      | Type      | Default | Description           |
| ---------- | --------- | ------- | --------------------- |
| `columnId` | `string`  | `''`    | Column ID for sorting |
| `sortable` | `boolean` | `false` | Enable sorting        |
| `class`    | `string`  | `''`    | Additional CSS        |

### ScDataTableCell

Table data cell.

**Selector:** `[sc-data-table-cell]`

### ScDataTableFilter

Global filter input.

**Selector:** `input[sc-data-table-filter]`

**Inputs:**

| Input         | Type     | Default       | Description       |
| ------------- | -------- | ------------- | ----------------- |
| `placeholder` | `string` | `'Filter...'` | Input placeholder |
| `class`       | `string` | `''`          | Additional CSS    |

### ScDataTableColumnToggle

Dropdown to toggle column visibility.

**Selector:** `[sc-data-table-column-toggle]`

### ScDataTablePagination

Pagination controls with page size selector.

**Selector:** `[sc-data-table-pagination]`

**Inputs:**

| Input           | Type       | Default                | Description          |
| --------------- | ---------- | ---------------------- | -------------------- |
| `pageSizes`     | `number[]` | `[10, 20, 30, 40, 50]` | Page size options    |
| `showSelection` | `boolean`  | `true`                 | Show selection count |
| `class`         | `string`   | `''`                   | Additional CSS       |

**Two-way Bindings:**

| Binding       | Type     | Default | Description    |
| ------------- | -------- | ------- | -------------- |
| `pageSize`    | `number` | `10`    | Items per page |
| `currentPage` | `number` | `1`     | Current page   |

## Types

### ColumnDef<T>

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
```

### SortingState

```typescript
interface SortingState {
  id: string;
  desc: boolean;
}
```

### ColumnVisibilityState

```typescript
interface ColumnVisibilityState {
  [columnId: string]: boolean;
}
```

## Examples

### Basic Table

```html
<div sc-data-table [data]="users" [columns]="columns">
  <table>
    <thead sc-data-table-header>
      <tr>
        <th sc-data-table-head>Name</th>
        <th sc-data-table-head>Email</th>
      </tr>
    </thead>
    <tbody sc-data-table-body>
      @for (user of users; track user.id) {
      <tr sc-data-table-row>
        <td sc-data-table-cell>{{ user.name }}</td>
        <td sc-data-table-cell>{{ user.email }}</td>
      </tr>
      }
    </tbody>
  </table>
</div>
```

### With Sorting

```html
<div #table sc-data-table [data]="users" [columns]="columns">
  <table>
    <thead sc-data-table-header>
      <tr>
        <th sc-data-table-head columnId="name" [sortable]="true">Name</th>
        <th sc-data-table-head columnId="email" [sortable]="true">Email</th>
      </tr>
    </thead>
    <tbody sc-data-table-body>
      @for (user of table.sortedData(); track user.id) {
      <tr sc-data-table-row>
        <td sc-data-table-cell>{{ user.name }}</td>
        <td sc-data-table-cell>{{ user.email }}</td>
      </tr>
      }
    </tbody>
  </table>
</div>
```

### With Filtering

```html
<div #table sc-data-table [data]="users" [columns]="columns">
  <input sc-data-table-filter placeholder="Search users..." />

  <table>
    <thead sc-data-table-header>
      <tr>
        <th sc-data-table-head>Name</th>
        <th sc-data-table-head>Email</th>
      </tr>
    </thead>
    <tbody sc-data-table-body>
      @for (user of table.filteredData(); track user.id) {
      <tr sc-data-table-row>
        <td sc-data-table-cell>{{ user.name }}</td>
        <td sc-data-table-cell>{{ user.email }}</td>
      </tr>
      } @empty {
      <tr>
        <td colspan="2" class="text-center">No results found.</td>
      </tr>
      }
    </tbody>
  </table>
</div>
```

### With Row Selection

```html
<div #table sc-data-table [data]="users" [columns]="columns">
  <table>
    <thead sc-data-table-header>
      <tr>
        <th sc-data-table-head>
          <input type="checkbox" [checked]="table.isAllRowsSelected()" [indeterminate]="table.isSomeRowsSelected()" (change)="table.toggleAllRowSelection()" />
        </th>
        <th sc-data-table-head>Name</th>
      </tr>
    </thead>
    <tbody sc-data-table-body>
      @for (user of table.sortedData(); track user.id; let i = $index) {
      <tr sc-data-table-row [selected]="table.isRowSelected(i)">
        <td sc-data-table-cell>
          <input type="checkbox" [checked]="table.isRowSelected(i)" (change)="table.toggleRowSelection(i)" />
        </td>
        <td sc-data-table-cell>{{ user.name }}</td>
      </tr>
      }
    </tbody>
  </table>
</div>
```

### With Column Visibility

```html
<div sc-data-table [data]="users" [columns]="columns">
  <div sc-data-table-column-toggle></div>
  <!-- ... -->
</div>
```

### With Pagination

```html
<div sc-data-table [data]="users" [columns]="columns">
  <!-- ... table ... -->

  <div sc-data-table-pagination [(pageSize)]="pageSize" [(currentPage)]="currentPage" [pageSizes]="[5, 10, 25, 50]"></div>
</div>
```

## Features

- **Sorting**: Click column headers to sort ascending/descending
- **Filtering**: Global text search across all columns
- **Column Visibility**: Show/hide columns dynamically
- **Row Selection**: Single and bulk selection with indeterminate state
- **Pagination**: Configurable page sizes with navigation controls
- **Custom Rendering**: Use accessorFn for computed values, cell for custom display
- **Custom Sorting**: Provide sortingFn for custom sort logic
- **Generic Types**: Full TypeScript support with generic data types

## Accessibility

- Proper table semantics with `<table>`, `<thead>`, `<tbody>`
- Sortable columns indicate direction with icons
- Checkboxes have proper focus states
- Keyboard navigation supported for interactive elements
- Selected rows indicated with `data-selected` attribute
