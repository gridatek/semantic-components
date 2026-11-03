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
  ScPaginationPrevious,
  ScSelect,
  ScSelectGroup,
  ScSelectIcon,
  ScSelectItem,
  ScSelectItemIndicator,
  ScSelectItemText,
  ScSelectLabel,
  ScSelectList,
  ScSelectPopup,
  ScSelectPortal,
  ScSelectTrigger,
  ScSelectValue,
} from '@semantic-components/ui';
import { ScDataTablePagination } from '@semantic-components/ui/data-table';
import {
  SiCheckIcon,
  SiChevronDownIcon,
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
    SiChevronDownIcon,
    SiCheckIcon,
    ScPagination,
    ScPaginationList,
    ScPaginationItem,
    ScPaginationLink,
    ScPaginationPrevious,
    ScPaginationNext,
    ScPaginationFirst,
    ScPaginationLast,
    ScPaginationEllipsis,
    ScSelect,
    ScSelectGroup,
    ScSelectIcon,
    ScSelectItem,
    ScSelectItemIndicator,
    ScSelectItemText,
    ScSelectLabel,
    ScSelectList,
    ScSelectPopup,
    ScSelectPortal,
    ScSelectTrigger,
    ScSelectValue,
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
      class="flex items-center justify-between py-4"
    >
      <div
        scSelect
        [value]="'' + pagination.pageSize()"
        (valueChange)="pagination.changePageSize(+$event)"
        class="flex-row items-center"
      >
        <div
          scSelectLabel
          class="text-muted-foreground font-normal"
          i18n="@@dataTable.rowsPerPage"
        >
          Rows per page:
        </div>
        <div scSelectTrigger size="sm" class="w-18">
          <span scSelectValue></span>
          <svg scSelectIcon siChevronDownIcon></svg>
        </div>
        <ng-template scSelectPortal>
          <div scSelectPopup>
            <div scSelectList>
              <div scSelectGroup>
                @for (size of pageSizeOptions(); track size) {
                  <div scSelectItem [value]="'' + size">
                    <span scSelectItemText>{{ size }}</span>
                    <span scSelectItemIndicator><svg siCheckIcon></svg></span>
                  </div>
                }
              </div>
            </div>
          </div>
        </ng-template>
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
