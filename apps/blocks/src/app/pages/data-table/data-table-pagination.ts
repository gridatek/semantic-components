import type { Table } from '@tanstack/angular-table';
import { Component, ViewEncapsulation, input } from '@angular/core';
import {
  ScPagination,
  ScPaginationEllipsis,
  ScPaginationFirst,
  ScPaginationItem,
  ScPaginationLast,
  ScPaginationLink,
  ScPaginationList,
  ScPaginationNext,
  ScPaginationPageSizeSelect,
  ScPaginationPrevious,
} from '@semantic-components/ui';
import { ScDataTablePagination } from '@semantic-components/ui/data-table';
import {
  SiChevronLeftIcon,
  SiChevronRightIcon,
  SiChevronsLeftIcon,
  SiChevronsRightIcon,
  SiEllipsisIcon,
} from '@semantic-icons/lucide-icons';
import type { DataTableFeatures } from './data-table-features';
import type { User } from './user-service';

@Component({
  selector: 'app-data-table-pagination',
  encapsulation: ViewEncapsulation.None,
  imports: [
    ScPagination,
    ScPaginationList,
    ScPaginationItem,
    ScPaginationLink,
    ScPaginationPrevious,
    ScPaginationNext,
    ScPaginationFirst,
    ScPaginationLast,
    ScPaginationEllipsis,
    ScPaginationPageSizeSelect,
    ScDataTablePagination,
    SiChevronsLeftIcon,
    SiChevronLeftIcon,
    SiChevronRightIcon,
    SiChevronsRightIcon,
    SiEllipsisIcon,
  ],
  host: { class: 'block' },
  template: `
    <div
      scPagination
      scDataTablePagination
      #pagination="scPagination"
      [table]="table()"
      [pageSizes]="pageSizeOptions()"
      class="flex items-center justify-between py-4"
    >
      <div class="text-muted-foreground flex items-center gap-2 text-sm">
        <label for="users-page-size" i18n="@@dataTable.rowsPerPage"
          >Rows per page:</label
        >
        <select scPaginationPageSizeSelect id="users-page-size">
          @for (size of pageSizeOptions(); track size) {
            <option [value]="size">{{ size }}</option>
          }
        </select>
      </div>

      <div class="flex items-center gap-2 text-sm">
        <span
          class="text-muted-foreground"
          aria-live="polite"
          i18n="@@dataTable.pageOf"
        >
          Page {{ pagination.currentPage() }} of {{ pagination.totalPages() }}
        </span>
        <ul scPaginationList>
          <li scPaginationItem>
            <button scPaginationFirst variant="outline" size="icon-sm">
              <svg siChevronsLeftIcon></svg>
              <span class="sr-only" i18n="@@dataTable.firstPage"
                >Go to first page</span
              >
            </button>
          </li>
          <li scPaginationItem>
            <button scPaginationPrevious variant="outline" size="icon-sm">
              <svg siChevronLeftIcon></svg>
              <span class="sr-only" i18n="@@dataTable.previousPage"
                >Go to previous page</span
              >
            </button>
          </li>

          @for (page of pagination.pages(); track page.value) {
            <li scPaginationItem>
              @if (page.type === 'ellipsis') {
                <span scPaginationEllipsis>
                  <svg siEllipsisIcon></svg>
                </span>
              } @else {
                <button scPaginationLink [page]="page.value" size="icon-sm">
                  {{ page.value }}
                </button>
              }
            </li>
          }

          <li scPaginationItem>
            <button scPaginationNext variant="outline" size="icon-sm">
              <svg siChevronRightIcon></svg>
              <span class="sr-only" i18n="@@dataTable.nextPage"
                >Go to next page</span
              >
            </button>
          </li>
          <li scPaginationItem>
            <button scPaginationLast variant="outline" size="icon-sm">
              <svg siChevronsRightIcon></svg>
              <span class="sr-only" i18n="@@dataTable.lastPage"
                >Go to last page</span
              >
            </button>
          </li>
        </ul>
      </div>
    </div>
  `,
})
export class DataTablePagination {
  readonly table = input.required<Table<DataTableFeatures, User>>();
  readonly pageSizeOptions = input<number[]>([5, 10, 20, 30]);
}
