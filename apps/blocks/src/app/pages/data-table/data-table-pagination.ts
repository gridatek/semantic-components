import type { Table } from '@tanstack/angular-table';
import { Component, ViewEncapsulation, input } from '@angular/core';
import { ScDataTablePagination } from '@semantic-components/data-table';
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
import {
  SiChevronLeftIcon,
  SiChevronRightIcon,
  SiChevronsLeftIcon,
  SiChevronsRightIcon,
  SiEllipsisIcon,
} from '@semantic-icons/lucide-icons';
import type { DataTableFeatures } from './data-table-features';
import type { User } from './user.service';

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
        <label for="users-page-size">Rows per page:</label>
        <select scPaginationPageSizeSelect id="users-page-size">
          @for (size of pageSizeOptions(); track size) {
            <option [value]="size">{{ size }}</option>
          }
        </select>
      </div>

      <div class="flex items-center gap-2 text-sm">
        <span class="text-muted-foreground" aria-live="polite">
          Page {{ pagination.currentPage() }} of {{ pagination.totalPages() }}
        </span>
        <ul scPaginationList>
          <li scPaginationItem>
            <button
              scPaginationFirst
              aria-label="Go to first page"
              variant="outline"
              size="icon-sm"
            >
              <svg siChevronsLeftIcon></svg>
            </button>
          </li>
          <li scPaginationItem>
            <button
              scPaginationPrevious
              aria-label="Go to previous page"
              variant="outline"
              size="icon-sm"
            >
              <svg siChevronLeftIcon></svg>
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
            <button
              scPaginationNext
              aria-label="Go to next page"
              variant="outline"
              size="icon-sm"
            >
              <svg siChevronRightIcon></svg>
            </button>
          </li>
          <li scPaginationItem>
            <button
              scPaginationLast
              aria-label="Go to last page"
              variant="outline"
              size="icon-sm"
            >
              <svg siChevronsRightIcon></svg>
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
