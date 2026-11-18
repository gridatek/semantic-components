import {
  columnFilteringFeature,
  createColumnHelper,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  globalFilteringFeature,
  injectTable,
  rowPaginationFeature,
  rowSortingFeature,
  sortFn_alphanumeric,
  tableFeatures,
} from '@tanstack/angular-table';
import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScAvatar,
  ScAvatarFallback,
  ScAvatarImage,
  ScBadge,
  ScCard,
  ScCardBody,
  ScCardHeader,
  ScCardTitle,
  ScInput,
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
  ScDataTableGlobalFilter,
  ScDataTableHeaderCell,
  ScDataTablePagination,
  ScDataTableRow,
  ScDataTableSortButton,
} from '@semantic-components/ui/data-table';
import {
  SiArrowDownIcon,
  SiArrowUpIcon,
  SiChevronLeftIcon,
  SiChevronRightIcon,
  SiChevronsLeftIcon,
  SiChevronsRightIcon,
  SiChevronsUpDownIcon,
} from '@semantic-icons/lucide-icons';
import { EMPLOYEES, type Employee } from '../../data/tables';
import { initials, money } from '../../shared/format';
import { label } from '../../shared/labels';

const features = tableFeatures({
  columnFilteringFeature,
  globalFilteringFeature,
  rowSortingFeature,
  rowPaginationFeature,
  filteredRowModel: createFilteredRowModel(),
  sortedRowModel: createSortedRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
  sortFns: { alphanumeric: sortFn_alphanumeric },
});

const columnHelper = createColumnHelper<typeof features, Employee>();

const columns = columnHelper.columns([
  columnHelper.accessor('name', {
    header: $localize`:@@tables.employeesTable.name:Name`,
  }),
  columnHelper.accessor('position', {
    header: $localize`:@@tables.employeesTable.position:Position`,
  }),
  columnHelper.accessor('department', {
    header: $localize`:@@tables.employeesTable.department:Department`,
  }),
  columnHelper.accessor('salary', {
    header: $localize`:@@tables.employeesTable.salary:Salary`,
  }),
  columnHelper.accessor('status', {
    header: $localize`:@@tables.employeesTable.status:Status`,
  }),
]);

/** The data table: search, sorting and pages over the employees. */
@Component({
  selector: 'app-employees-table',
  imports: [
    ScAvatar,
    ScAvatarFallback,
    ScAvatarImage,
    ScBadge,
    ScCard,
    ScCardBody,
    ScCardHeader,
    ScCardTitle,
    ScInput,
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
    ScDataTableCell,
    ScDataTableGlobalFilter,
    ScDataTableHeaderCell,
    ScDataTablePagination,
    ScDataTableRow,
    ScDataTableSortButton,
    SiArrowDownIcon,
    SiArrowUpIcon,
    SiChevronLeftIcon,
    SiChevronRightIcon,
    SiChevronsLeftIcon,
    SiChevronsRightIcon,
    SiChevronsUpDownIcon,
  ],
  template: `
    <div scCard>
      <div scCardHeader>
        <h2
          i18n="@@tables.employeesTable.dataTable"
          scCardTitle
          id="employees-title"
        >
          Data Table
        </h2>
      </div>
      <div scCardBody class="flex flex-col gap-4">
        <input
          i18n-aria-label="@@tables.employeesTable.searchEmployees"
          i18n-placeholder="@@tables.employeesTable.searchEmployees2"
          scInput
          scDataTableGlobalFilter
          [table]="table"
          type="search"
          placeholder="Search employees…"
          aria-label="Search employees"
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
                    >
                      <button
                        scDataTableSortButton
                        #sort="scDataTableSortButton"
                        [column]="header.column"
                      >
                        {{ header.column.columnDef.header }}
                        @switch (sort.direction()) {
                          @case ('asc') {
                            <svg siArrowUpIcon></svg>
                          }
                          @case ('desc') {
                            <svg siArrowDownIcon></svg>
                          }
                          @default {
                            <svg siChevronsUpDownIcon></svg>
                          }
                        }
                      </button>
                    </th>
                  }
                </tr>
              }
            </thead>
            <tbody scTableBody>
              @for (row of table.getRowModel().rows; track row.id) {
                <tr scTableRow scDataTableRow [row]="row">
                  <td scTableCell scDataTableCell>
                    <div class="flex items-center gap-3">
                      <span scAvatar class="size-8">
                        <img scAvatarImage [src]="row.original.avatar" alt="" />
                        <span scAvatarFallback>{{
                          initialsOf(row.original.name)
                        }}</span>
                      </span>
                      <span class="font-medium">{{ row.original.name }}</span>
                    </div>
                  </td>
                  <td scTableCell scDataTableCell>
                    {{ row.original.position }}
                  </td>
                  <td scTableCell scDataTableCell>
                    {{ labelOf(row.original.department) }}
                  </td>
                  <td scTableCell scDataTableCell class="tabular-nums">
                    {{ salaryOf(row.original.salary) }}
                  </td>
                  <td scTableCell scDataTableCell>
                    <span
                      scBadge
                      [variant]="
                        row.original.status === 'Active'
                          ? 'secondary'
                          : row.original.status === 'On Leave'
                            ? 'outline'
                            : 'destructive'
                      "
                      >{{ labelOf(row.original.status) }}</span
                    >
                  </td>
                </tr>
              } @empty {
                <tr scTableRow>
                  <td
                    i18n="@@tables.employeesTable.noEmployeesMatch"
                    scTableCell
                    colspan="5"
                    class="text-muted-foreground h-24 text-center"
                  >
                    No employees match.
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
        <nav
          i18n-aria-label="@@tables.employeesTable.employeePages"
          scPagination
          scDataTablePagination
          #pagination="scPagination"
          [table]="table"
          aria-label="Employee pages"
          class="mx-0 w-auto flex-wrap items-center justify-end gap-4"
        >
          <span
            i18n="@@tables.employeesTable.pageOf"
            class="text-sm font-medium"
            aria-live="polite"
          >
            Page {{ pagination.currentPage() }} of {{ pagination.totalPages() }}
          </span>
          <ul scPaginationList>
            <li scPaginationItem>
              <button scPaginationFirst variant="outline" size="icon-sm">
                <svg siChevronsLeftIcon class="rtl:-scale-x-100"></svg>
                <span
                  i18n="@@tables.employeesTable.goToFirstPage"
                  class="sr-only"
                  >Go to first page</span
                >
              </button>
            </li>
            <li scPaginationItem>
              <button scPaginationPrevious variant="outline" size="icon-sm">
                <svg siChevronLeftIcon class="rtl:-scale-x-100"></svg>
                <span
                  i18n="@@tables.employeesTable.goToPreviousPage"
                  class="sr-only"
                  >Go to previous page</span
                >
              </button>
            </li>
            <li scPaginationItem>
              <button scPaginationNext variant="outline" size="icon-sm">
                <svg siChevronRightIcon class="rtl:-scale-x-100"></svg>
                <span
                  i18n="@@tables.employeesTable.goToNextPage"
                  class="sr-only"
                  >Go to next page</span
                >
              </button>
            </li>
            <li scPaginationItem>
              <button scPaginationLast variant="outline" size="icon-sm">
                <svg siChevronsRightIcon class="rtl:-scale-x-100"></svg>
                <span
                  i18n="@@tables.employeesTable.goToLastPage"
                  class="sr-only"
                  >Go to last page</span
                >
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
})
export class EmployeesTable {
  private readonly labelOf = label;
  private readonly table = injectTable(() => ({
    features,
    columns,
    data: [...EMPLOYEES],
    getRowId: (employee) => String(employee.id),
    initialState: { pagination: { pageIndex: 0, pageSize: 5 } },
  }));

  private readonly initialsOf = initials;
  private readonly salaryOf = money;
}
