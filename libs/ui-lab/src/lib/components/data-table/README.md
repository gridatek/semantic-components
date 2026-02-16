# Data Table

Advanced table component with sorting, filtering, column visibility, row selection, and pagination.

## Usage

```html
<div scDataTable [data]="data" [columns]="columns">
  <input scDataTableFilter placeholder="Search..." />
  <div scDataTableColumnToggle></div>

  <table>
    <thead scDataTableHeader>
      <tr>
        <th scDataTableHead columnId="name" [sortable]="true">Name</th>
        <th scDataTableHead columnId="email" [sortable]="true">Email</th>
      </tr>
    </thead>
    <tbody scDataTableBody>
      @for (row of data; track row.id) {
      <tr scDataTableRow>
        <td scDataTableCell>{{ row.name }}</td>
        <td scDataTableCell>{{ row.email }}</td>
      </tr>
      }
    </tbody>
  </table>

  <div scDataTablePagination></div>
</div>
```

## Components

### ScDataTable

Root container that manages table state and provides context.

**Selector:** `[scDataTable]`

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

**Selector:** `[scDataTableHeader]`

### ScDataTableBody

Table body container.

**Selector:** `[scDataTableBody]`

### ScDataTableRow

Table row with selection state.

**Selector:** `[scDataTableRow]`

**Inputs:**

| Input      | Type      | Default | Description     |
| ---------- | --------- | ------- | --------------- |
| `selected` | `boolean` | `false` | Selection state |
| `class`    | `string`  | `''`    | Additional CSS  |

### ScDataTableHead

Table header cell with optional sorting.

**Selector:** `[scDataTableHead]`

**Inputs:**

| Input      | Type      | Default | Description           |
| ---------- | --------- | ------- | --------------------- |
| `columnId` | `string`  | `''`    | Column ID for sorting |
| `sortable` | `boolean` | `false` | Enable sorting        |
| `class`    | `string`  | `''`    | Additional CSS        |

### ScDataTableCell

Table data cell.

**Selector:** `[scDataTableCell]`

### ScDataTableFilter

Global filter input.

**Selector:** `input[scDataTableFilter]`

**Inputs:**

| Input         | Type     | Default       | Description       |
| ------------- | -------- | ------------- | ----------------- |
| `placeholder` | `string` | `'Filter...'` | Input placeholder |
| `class`       | `string` | `''`          | Additional CSS    |

### ScDataTableColumnToggle

Dropdown to toggle column visibility.

**Selector:** `[scDataTableColumnToggle]`

### ScDataTablePagination

Pagination controls with page size selector.

**Selector:** `[scDataTablePagination]`

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
<div scDataTable [data]="users" [columns]="columns">
  <table>
    <thead scDataTableHeader>
      <tr>
        <th scDataTableHead>Name</th>
        <th scDataTableHead>Email</th>
      </tr>
    </thead>
    <tbody scDataTableBody>
      @for (user of users; track user.id) {
      <tr scDataTableRow>
        <td scDataTableCell>{{ user.name }}</td>
        <td scDataTableCell>{{ user.email }}</td>
      </tr>
      }
    </tbody>
  </table>
</div>
```

### With Sorting

```html
<div #table scDataTable [data]="users" [columns]="columns">
  <table>
    <thead scDataTableHeader>
      <tr>
        <th scDataTableHead columnId="name" [sortable]="true">Name</th>
        <th scDataTableHead columnId="email" [sortable]="true">Email</th>
      </tr>
    </thead>
    <tbody scDataTableBody>
      @for (user of table.sortedData(); track user.id) {
      <tr scDataTableRow>
        <td scDataTableCell>{{ user.name }}</td>
        <td scDataTableCell>{{ user.email }}</td>
      </tr>
      }
    </tbody>
  </table>
</div>
```

### With Filtering

```html
<div #table scDataTable [data]="users" [columns]="columns">
  <input scDataTableFilter placeholder="Search users..." />

  <table>
    <thead scDataTableHeader>
      <tr>
        <th scDataTableHead>Name</th>
        <th scDataTableHead>Email</th>
      </tr>
    </thead>
    <tbody scDataTableBody>
      @for (user of table.filteredData(); track user.id) {
      <tr scDataTableRow>
        <td scDataTableCell>{{ user.name }}</td>
        <td scDataTableCell>{{ user.email }}</td>
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
<div #table scDataTable [data]="users" [columns]="columns">
  <table>
    <thead scDataTableHeader>
      <tr>
        <th scDataTableHead>
          <input type="checkbox" [checked]="table.isAllRowsSelected()" [indeterminate]="table.isSomeRowsSelected()" (change)="table.toggleAllRowSelection()" />
        </th>
        <th scDataTableHead>Name</th>
      </tr>
    </thead>
    <tbody scDataTableBody>
      @for (user of table.sortedData(); track user.id; let i = $index) {
      <tr scDataTableRow [selected]="table.isRowSelected(i)">
        <td scDataTableCell>
          <input type="checkbox" [checked]="table.isRowSelected(i)" (change)="table.toggleRowSelection(i)" />
        </td>
        <td scDataTableCell>{{ user.name }}</td>
      </tr>
      }
    </tbody>
  </table>
</div>
```

### With Column Visibility

```html
<div scDataTable [data]="users" [columns]="columns">
  <div scDataTableColumnToggle></div>
  <!-- ... -->
</div>
```

### With Pagination

```html
<div scDataTable [data]="users" [columns]="columns">
  <!-- ... table ... -->

  <div scDataTablePagination [(pageSize)]="pageSize" [(currentPage)]="currentPage" [pageSizes]="[5, 10, 25, 50]"></div>
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
