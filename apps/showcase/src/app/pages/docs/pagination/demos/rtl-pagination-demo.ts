import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScPagination,
  ScPaginationEllipsis,
  ScPaginationItem,
  ScPaginationLink,
  ScPaginationList,
  ScPaginationNext,
  ScPaginationPrevious,
} from '@semantic-components/ui';
import {
  SiChevronLeftIcon,
  SiChevronRightIcon,
  SiEllipsisIcon,
} from '@semantic-icons/lucide-icons';

/** Right to left: the order flips, the chevrons flip by themselves. */
@Component({
  selector: 'app-rtl-pagination-demo',
  imports: [
    ScPagination,
    ScPaginationEllipsis,
    ScPaginationItem,
    ScPaginationLink,
    ScPaginationList,
    ScPaginationNext,
    ScPaginationPrevious,
    SiChevronLeftIcon,
    SiChevronRightIcon,
    SiEllipsisIcon,
  ],
  template: `
    <nav
      scPagination
      dir="rtl"
      lang="ar"
      aria-label="النتائج"
      #pagination="scPagination"
      [totalItems]="100"
      [pageSize]="10"
      [currentPage]="2"
    >
      <ul scPaginationList>
        <li scPaginationItem>
          <button scPaginationPrevious>
            <svg siChevronLeftIcon data-icon="inline-start"></svg>
            <span class="sr-only sm:not-sr-only">السابق</span>
          </button>
        </li>
        @for (item of pagination.pages(); track item.value) {
          <!-- On a phone, the current page only: the rest would not fit. -->
          <li
            scPaginationItem
            [class]="
              item.value === pagination.currentPage() ? '' : 'max-sm:hidden'
            "
          >
            @if (item.type === 'ellipsis') {
              <span scPaginationEllipsis>
                <svg siEllipsisIcon></svg>
              </span>
            } @else {
              <button scPaginationLink [page]="item.value">
                {{ item.value }}
              </button>
            }
          </li>
        }
        <li scPaginationItem>
          <button scPaginationNext>
            <span class="sr-only sm:not-sr-only">التالي</span>
            <svg siChevronRightIcon data-icon="inline-end"></svg>
          </button>
        </li>
      </ul>
    </nav>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlPaginationDemo {}
