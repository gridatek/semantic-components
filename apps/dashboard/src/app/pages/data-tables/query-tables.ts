import {
  columnFilteringFeature,
  columnVisibilityFeature,
  createColumnHelper,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  filterFn_includesString,
  globalFilteringFeature,
  injectTable,
  rowPaginationFeature,
  rowSortingFeature,
  sortFn_alphanumeric,
  tableFeatures,
} from '@tanstack/angular-table';
import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScCard,
  ScCardBody,
  ScCardDescription,
  ScCardHeader,
  ScCardTitle,
  ScInput,
  ScNativeSelect,
  ScNativeSelectContainer,
  ScNativeSelectIcon,
  ScNativeSelectOption,
  ScPagination,
  ScPaginationFirst,
  ScPaginationItem,
  ScPaginationLast,
  ScPaginationList,
  ScPaginationNext,
  ScPaginationPrevious,
  ScTable,
  ScTableBody,
  ScTableCell,
  ScTableContainer,
  ScTableHeader,
  ScTableHeaderCell,
  ScTableRow,
} from '@semantic-components/ui';
import {
  ScDataTableCell,
  ScDataTableColumnFilter,
  ScDataTableGlobalFilter,
  ScDataTableHeaderCell,
  ScDataTablePagination,
  ScDataTableRow,
} from '@semantic-components/ui/data-table';
import {
  SiChevronDownIcon,
  SiChevronLeftIcon,
  SiChevronRightIcon,
  SiChevronsLeftIcon,
  SiChevronsRightIcon,
} from '@semantic-icons/lucide-icons';
import { STAFF, type StaffMember } from '../../data/staff';
import { PageHeader } from '../../layout/page-header';
import { SortHeader, StaffCell } from './table-parts';

const features = tableFeatures({
  columnVisibilityFeature,
  columnFilteringFeature,
  globalFilteringFeature,
  rowSortingFeature,
  rowPaginationFeature,
  filteredRowModel: createFilteredRowModel(),
  sortedRowModel: createSortedRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
  sortFns: { alphanumeric: sortFn_alphanumeric },
  filterFns: { includesString: filterFn_includesString },
});
const columnHelper = createColumnHelper<typeof features, StaffMember>();

const COLUMNS = columnHelper.columns([
  columnHelper.accessor('name', {
    header: $localize`Name`,
    filterFn: 'includesString',
  }),
  columnHelper.accessor('role', {
    header: $localize`Role`,
    filterFn: 'includesString',
  }),
  columnHelper.accessor('department', {
    header: $localize`Department`,
    filterFn: 'includesString',
  }),
  columnHelper.accessor('location', {
    header: $localize`Location`,
    filterFn: 'includesString',
  }),
  columnHelper.accessor('salary', {
    header: $localize`Salary`,
    enableColumnFilter: false,
  }),
  columnHelper.accessor('status', {
    header: $localize`Status`,
    filterFn: 'includesString',
  }),
]);

const IMPORTS = [
  ScCard,
  ScCardBody,
  ScCardDescription,
  ScCardHeader,
  ScCardTitle,
  ScTable,
  ScTableBody,
  ScTableCell,
  ScTableContainer,
  ScTableHeader,
  ScTableHeaderCell,
  ScTableRow,
  ScDataTableCell,
  ScDataTableHeaderCell,
  ScDataTableRow,
  PageHeader,
  StaffCell,
];

/** Sorting (Pro TanStack tables): a click on a header sorts by it; Shift adds a second. */
@Component({
  selector: 'app-sorting-table-page',
  imports: [...IMPORTS, SortHeader],
  template: `
    <app-page-header
      i18n-title
      title="Sorting"
      [trail]="[{ label: t.dataTables }, { label: t.sorting }]"
    />
    <div scCard>
      <div scCardHeader>
        <h2 i18n scCardTitle>Team</h2>
        <p i18n scCardDescription>
          A header sorts up, then down, then not; Shift+click adds another
          column
        </p>
      </div>
      <div scCardBody>
        <div scTableContainer>
          <table scTable>
            <thead scTableHeader>
              @for (group of table.getHeaderGroups(); track group.id) {
                <tr scTableRow>
                  @for (header of group.headers; track header.id) {
                    <th
                      scTableHeaderCell
                      scDataTableHeaderCell
                      [column]="header.column"
                    >
                      <app-sort-header
                        [column]="header.column"
                        [label]="$any(header.column.columnDef.header)"
                      />
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
                      <app-staff-cell
                        [column]="cell.column.id"
                        [member]="row.original"
                      />
                    </td>
                  }
                </tr>
              } @empty {
                <tr scTableRow>
                  <td
                    i18n
                    scTableCell
                    colspan="6"
                    class="text-muted-foreground h-24 text-center"
                  >
                    No one matches.
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex flex-col gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class SortingTablePage {
  /** The template's words that sit in bindings, translated. */
  private readonly t = {
    dataTables: $localize`Data Tables`,
    sorting: $localize`Sorting`,
  };

  private readonly table = injectTable(() => ({
    features,
    columns: COLUMNS,
    data: STAFF.slice(0, 12) as StaffMember[],
    initialState: { sorting: [{ id: 'salary', desc: true }] },
  }));
}

/** Filtering (Pro TanStack tables): one search for all, one per column. */
@Component({
  selector: 'app-filtering-table-page',
  imports: [
    ...IMPORTS,
    ScInput,
    ScDataTableColumnFilter,
    ScDataTableGlobalFilter,
  ],
  template: `
    <app-page-header
      i18n-title
      title="Filtering"
      [trail]="[{ label: t.dataTables }, { label: t.filtering }]"
    />
    <div scCard>
      <div scCardHeader>
        <h2 i18n scCardTitle>Team</h2>
        <p i18n scCardDescription>
          Search everything, or narrow one column at a time
        </p>
      </div>
      <div scCardBody class="flex flex-col gap-4">
        <input
          i18n-aria-label
          i18n-placeholder
          scInput
          scDataTableGlobalFilter
          [table]="table"
          type="search"
          placeholder="Search all columns…"
          aria-label="Search all columns"
          class="max-w-sm"
        />
        <div scTableContainer>
          <table scTable>
            <thead scTableHeader>
              @for (group of table.getHeaderGroups(); track group.id) {
                <tr scTableRow>
                  @for (header of group.headers; track header.id) {
                    <th
                      scTableHeaderCell
                      scDataTableHeaderCell
                      [column]="header.column"
                      class="align-top"
                    >
                      <div class="flex flex-col gap-1 py-2">
                        {{ header.column.columnDef.header }}
                        @if (header.column.getCanFilter()) {
                          <input
                            scInput
                            scDataTableColumnFilter
                            [column]="header.column"
                            type="search"
                            class="h-7 font-normal"
                            [attr.aria-label]="
                              t.filter + header.column.columnDef.header
                            "
                          />
                        }
                      </div>
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
                      <app-staff-cell
                        [column]="cell.column.id"
                        [member]="row.original"
                      />
                    </td>
                  }
                </tr>
              } @empty {
                <tr scTableRow>
                  <td
                    i18n
                    scTableCell
                    colspan="6"
                    class="text-muted-foreground h-24 text-center"
                  >
                    No one matches.
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
        <p i18n class="text-muted-foreground text-sm" aria-live="polite">
          {{ table.getFilteredRowModel().rows.length }} of {{ total }} people
        </p>
      </div>
    </div>
  `,
  host: { class: 'flex flex-col gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class FilteringTablePage {
  /** The template's words that sit in bindings, translated. */
  private readonly t = {
    dataTables: $localize`Data Tables`,
    filtering: $localize`Filtering`,
    filter: $localize`Filter `,
  };

  private readonly table = injectTable(() => ({
    features,
    columns: COLUMNS,
    data: STAFF as StaffMember[],
    initialState: { pagination: { pageIndex: 0, pageSize: 100 } },
  }));
  private readonly total = STAFF.length;
}

/** Pagination (Pro TanStack tables): pages, and how many rows on each. */
@Component({
  selector: 'app-pagination-table-page',
  imports: [
    ...IMPORTS,
    SortHeader,
    ScNativeSelect,
    ScNativeSelectContainer,
    ScNativeSelectIcon,
    ScNativeSelectOption,
    ScPagination,
    ScPaginationFirst,
    ScPaginationItem,
    ScPaginationLast,
    ScPaginationList,
    ScPaginationNext,
    ScPaginationPrevious,
    ScDataTablePagination,
    SiChevronDownIcon,
    SiChevronLeftIcon,
    SiChevronRightIcon,
    SiChevronsLeftIcon,
    SiChevronsRightIcon,
  ],
  template: `
    <app-page-header
      i18n-title
      title="Pagination"
      [trail]="[{ label: t.dataTables }, { label: t.pagination }]"
    />
    <div scCard>
      <div scCardHeader>
        <h2 i18n scCardTitle>Team</h2>
        <p i18n scCardDescription>{{ total }} people, a page at a time</p>
      </div>
      <div scCardBody class="flex flex-col gap-4">
        <div scTableContainer>
          <table scTable>
            <thead scTableHeader>
              @for (group of table.getHeaderGroups(); track group.id) {
                <tr scTableRow>
                  @for (header of group.headers; track header.id) {
                    <th
                      scTableHeaderCell
                      scDataTableHeaderCell
                      [column]="header.column"
                    >
                      <app-sort-header
                        [column]="header.column"
                        [label]="$any(header.column.columnDef.header)"
                      />
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
                      <app-staff-cell
                        [column]="cell.column.id"
                        [member]="row.original"
                      />
                    </td>
                  }
                </tr>
              } @empty {
                <tr scTableRow>
                  <td
                    i18n
                    scTableCell
                    colspan="6"
                    class="text-muted-foreground h-24 text-center"
                  >
                    No one matches.
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
        <div class="flex flex-wrap items-center justify-between gap-4">
          <div class="flex items-center gap-2 text-sm">
            <label i18n for="page-size">Rows per page</label>
            <div scNativeSelectContainer class="w-20">
              <select
                scNativeSelect
                size="sm"
                id="page-size"
                [value]="table.atoms.pagination.get().pageSize"
                (change)="table.setPageSize(+$any($event.target).value)"
              >
                @for (n of sizes; track n) {
                  <option scNativeSelectOption [value]="n">{{ n }}</option>
                }
              </select>
              <svg siChevronDownIcon scNativeSelectIcon></svg>
            </div>
          </div>

          <nav
            i18n-aria-label
            scPagination
            scDataTablePagination
            #pagination="scPagination"
            [table]="table"
            aria-label="Pages"
            class="mx-0 w-auto flex-wrap items-center justify-end gap-4"
          >
            <span i18n class="text-sm font-medium" aria-live="polite">
              Page {{ pagination.currentPage() }} of
              {{ pagination.totalPages() }}
            </span>
            <ul scPaginationList>
              <li scPaginationItem>
                <button scPaginationFirst variant="outline" size="icon-sm">
                  <svg siChevronsLeftIcon class="rtl:-scale-x-100"></svg
                  ><span i18n class="sr-only">Go to first page</span>
                </button>
              </li>
              <li scPaginationItem>
                <button scPaginationPrevious variant="outline" size="icon-sm">
                  <svg siChevronLeftIcon class="rtl:-scale-x-100"></svg
                  ><span i18n class="sr-only">Go to previous page</span>
                </button>
              </li>
              <li scPaginationItem>
                <button scPaginationNext variant="outline" size="icon-sm">
                  <svg siChevronRightIcon class="rtl:-scale-x-100"></svg
                  ><span i18n class="sr-only">Go to next page</span>
                </button>
              </li>
              <li scPaginationItem>
                <button scPaginationLast variant="outline" size="icon-sm">
                  <svg siChevronsRightIcon class="rtl:-scale-x-100"></svg
                  ><span i18n class="sr-only">Go to last page</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex flex-col gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class PaginationTablePage {
  /** The template's words that sit in bindings, translated. */
  private readonly t = {
    dataTables: $localize`Data Tables`,
    pagination: $localize`Pagination`,
  };

  private readonly table = injectTable(() => ({
    features,
    columns: COLUMNS,
    data: STAFF as StaffMember[],
    initialState: { pagination: { pageIndex: 0, pageSize: 5 } },
  }));
  private readonly total = STAFF.length;
  private readonly sizes = [5, 10, 20];
}
