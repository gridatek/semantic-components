# Data Table

Styled, accessible parts for data tables powered by [TanStack Table](https://tanstack.com/table). TanStack owns the logic and state (sorting, filtering, paging, selection, visibility, pinning…); these parts render and wire it. You compose them with the `scTable` primitives from `@semantic-components/ui`, and the icons stay in your template.

The parts are **typed structurally**: each one only declares the few methods it calls, so this library has no dependency on TanStack and doesn't pin its version. Pass TanStack's own `table`, `column` and `row` objects.

## Installation

```bash
npm install @tanstack/angular-table
```

```typescript
import { ScDataTableCell, ScDataTableColumnVisibility, ScDataTableGlobalFilter, ScDataTableHeaderCell, ScDataTablePagination, ScDataTableRow, ScDataTableSelectAll, ScDataTableSelectRow, ScDataTableSortButton } from '@semantic-components/ui-lab';
```

## Usage

### 1. The table (TanStack)

Register the features you use (TanStack only exposes registered features), then build the table with `injectTable`:

```typescript
import { columnFilteringFeature, createColumnHelper, createFilteredRowModel, createPaginatedRowModel, createSortedRowModel, globalFilteringFeature, injectTable, rowPaginationFeature, rowSelectionFeature, rowSortingFeature, sortFn_alphanumeric, sortFn_text, tableFeatures } from '@tanstack/angular-table';

const features = tableFeatures({
  columnFilteringFeature,
  globalFilteringFeature,
  rowSortingFeature,
  rowPaginationFeature,
  rowSelectionFeature,
  filteredRowModel: createFilteredRowModel(),
  sortedRowModel: createSortedRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
  sortFns: { alphanumeric: sortFn_alphanumeric, text: sortFn_text },
});

const columnHelper = createColumnHelper<typeof features, User>();
const columns = columnHelper.columns([columnHelper.display({ id: 'select', enableSorting: false, enableHiding: false }), columnHelper.accessor('name', { header: 'Name' }), columnHelper.accessor('email', { header: 'Email' })]);

export class UsersTable {
  readonly table = injectTable(() => ({
    features,
    columns,
    data: this.users(),
    getRowId: (user) => String(user.id),
  }));
}
```

### 2. The markup (these parts)

```html
<input scInput scDataTableGlobalFilter [table]="table" aria-label="Search users" placeholder="Search…" />

<table scTable>
  <thead scTableHeader>
    @for (headerGroup of table.getHeaderGroups(); track headerGroup.id) {
    <tr scTableRow>
      @for (header of headerGroup.headers; track header.id) {
      <th scTableHeaderCell scDataTableHeaderCell [column]="header.column">
        @if (header.column.id === 'select') {
        <label scCheckboxField>
          <input type="checkbox" scCheckbox scDataTableSelectAll [table]="table" />
        </label>
        } @else {
        <button scDataTableSortButton #sort="scDataTableSortButton" [column]="header.column">
          {{ header.column.columnDef.header }} @switch (sort.direction()) { @case ('asc') {
          <svg siArrowUpIcon></svg>
          } @case ('desc') {
          <svg siArrowDownIcon></svg>
          } @default {
          <svg siChevronsUpDownIcon></svg>
          } }
        </button>
        }
      </th>
      }
    </tr>
    }
  </thead>
  <tbody scTableBody>
    @for (row of table.getRowModel().rows; track row.id) {
    <tr scTableRow scDataTableRow [row]="row">
      @for (cell of row.getVisibleCells(); track cell.id) {
      <td scTableCell scDataTableCell [column]="cell.column">
        @if (cell.column.id === 'select') {
        <label scCheckboxField>
          <input type="checkbox" scCheckbox scDataTableSelectRow [row]="row" [attr.aria-label]="'Select ' + row.original.name" />
        </label>
        } @else { {{ cell.getValue() }} }
      </td>
      }
    </tr>
    }
  </tbody>
</table>

<nav scPagination scDataTablePagination #pagination="scPagination" [table]="table" [pageSizes]="[10, 20, 50]">
  <span aria-live="polite">Page {{ pagination.currentPage() }} of {{ pagination.totalPages() }}</span>
  <!-- scPaginationList / scPaginationPrevious / scPaginationNext… as usual -->
</nav>
```

### Column visibility

Use `scDataTableColumnVisibility` checkboxes in a `scPopover` (it positions itself, flips when there's no room, and handles Escape and outside clicks):

```html
<div scPopoverProvider align="end">
  <button scButton variant="outline" scPopoverTrigger>
    <svg siColumns3Icon></svg>
    Columns
  </button>
  <ng-template scPopoverPortal>
    <div scPopover aria-label="Toggle columns">
      @for (column of hideableColumns(); track column.id) {
      <label scCheckboxField>
        <input type="checkbox" scCheckbox scDataTableColumnVisibility [column]="column" />
        {{ columnLabel(column) }}
      </label>
      }
    </div>
  </ng-template>
</div>
```

```typescript
readonly hideableColumns = computed(() => this.table.getAllLeafColumns().filter((column) => column.getCanHide()));
readonly columnLabel = dataTableColumnLabel;
```

Set `enableHiding: false` on columns that shouldn't be listed (selection, actions).

## Parts

| Part                          | Selector                                            | Input            | Does                                                                                                         |
| ----------------------------- | --------------------------------------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------ |
| `ScDataTableHeaderCell`       | `th[scDataTableHeaderCell]`                         | `column`         | `aria-sort` on sortable columns; sticky when pinned (`data-pinned="start\|end"`, offsets with column sizing) |
| `ScDataTableCell`             | `td[scDataTableCell]`                               | `column`         | Sticky when its column is pinned                                                                             |
| `ScDataTableRow`              | `tr[scDataTableRow]`                                | `row`            | `data-state="selected"` while selected                                                                       |
| `ScDataTableSortButton`       | `button[scDataTableSortButton]`                     | `column`         | Click sorts, Shift+click multi-sorts; `direction()` for your icons (`exportAs`)                              |
| `ScDataTableSelectAll`        | `input[type=checkbox][scDataTableSelectAll]`        | `table`, `scope` | Checked / indeterminate from the selection; `scope="page"` (default) or `"all"`; named "Select all rows"     |
| `ScDataTableSelectRow`        | `input[type=checkbox][scDataTableSelectRow]`        | `row`            | Row selection; disabled when the row can't be selected                                                       |
| `ScDataTableGlobalFilter`     | `input[scDataTableGlobalFilter]`                    | `table`          | Global filter as you type (`type="search"`)                                                                  |
| `ScDataTableColumnFilter`     | `input[scDataTableColumnFilter]`                    | `column`         | Column filter as you type (empty clears it)                                                                  |
| `ScDataTablePagination`       | `[scPagination][scDataTablePagination]`             | `table`          | Feeds `scPagination` (page, size, row count) and sends its changes back                                      |
| `ScDataTableColumnVisibility` | `input[type=checkbox][scDataTableColumnVisibility]` | `column`         | Shows/hides its column                                                                                       |

The checkbox parts work alone or together with `scCheckbox` (they then drive its `checked` / `indeterminate`).

### Structural types

Exported for your own wrappers: `ScDataTableCellColumn`, `ScDataTableSortableColumn`, `ScDataTableFilterableColumn`, `ScDataTableHideableColumn`, `ScDataTableSelectableRow`, `ScDataTableSelectAllTable`, `ScDataTableGlobalFilterTable`, `ScDataTablePaginationTable`, plus `dataTableColumnLabel(column)` and `dataTablePinnedClasses`.

## Notes

- **Selection:** `getIsSomePageRowsSelected()` is also true when all rows are selected; `scDataTableSelectAll` already shows indeterminate only for a partial selection.
- **Pinning:** positions are logical — `'start' | 'end'` — so sticky columns follow the writing direction (RTL-safe). Register `columnSizingFeature` for correct offsets when several columns are pinned to one side.
- **Server-rendered apps:** interactions before hydration finishes are reset, as for any hydrated control.

## Accessibility

- Sortable headers are real buttons inside `<th aria-sort>`.
- Name the selection checkboxes ("Select all rows" by default; give rows `aria-label`s like "Select Jane"), column filters, the global filter and icon-only buttons.
- Put column checkboxes in a named `scPopover` (e.g. "Toggle columns"); the popover handles `aria-expanded`, Escape and focus return.
- Announce paging with an `aria-live="polite"` "Page X of Y".
