import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';
import {
  type ScPaginationChange,
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
import type { Table } from '@tanstack/angular-table';

@Component({
  selector: 'app-data-table-pagination',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
      #pagination="scPagination"
      [currentPage]="currentPage()"
      [pageSize]="pageSize()"
      [totalItems]="totalItems()"
      [pageSizes]="pageSizeOptions()"
      (change)="onPageChange($event)"
      class="flex items-center justify-between py-4"
    >
      <div class="text-muted-foreground flex items-center gap-2 text-sm">
        <span>Rows per page:</span>
        <select scPaginationPageSizeSelect>
          @for (size of pageSizeOptions(); track size) {
            <option [value]="size">{{ size }}</option>
          }
        </select>
      </div>

      <div class="flex items-center gap-2 text-sm">
        <span class="text-muted-foreground">
          Page {{ currentPage() }} of {{ table().getPageCount() }}
        </span>
        <ul scPaginationList>
          <li scPaginationItem>
            <button scPaginationFirst variant="outline" size="icon-sm">
              <svg siChevronsLeftIcon></svg>
            </button>
          </li>
          <li scPaginationItem>
            <button
              scPaginationPrevious
              variant="outline"
              size="icon-sm"
              class="pl-0"
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
              variant="outline"
              size="icon-sm"
              class="pr-0"
            >
              <svg siChevronRightIcon></svg>
            </button>
          </li>
          <li scPaginationItem>
            <button scPaginationLast variant="outline" size="icon-sm">
              <svg siChevronsRightIcon></svg>
            </button>
          </li>
        </ul>
      </div>
    </div>
  `,
})
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class DataTablePagination {
  readonly table = input.required<Table<any>>();
  readonly pageSizeOptions = input<number[]>([5, 10, 20, 30]);

  readonly currentPage = computed(
    () => this.table().getState().pagination.pageIndex + 1,
  );
  readonly pageSize = computed(
    () => this.table().getState().pagination.pageSize,
  );
  readonly totalItems = computed(
    () => this.table().getFilteredRowModel().rows.length,
  );

  onPageChange(event: ScPaginationChange): void {
    this.table().setPageIndex(event.page - 1);
    this.table().setPageSize(event.pageSize);
  }
}
