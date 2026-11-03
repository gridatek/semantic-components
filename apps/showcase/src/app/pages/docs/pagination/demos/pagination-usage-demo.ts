import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScPagination,
  ScPaginationItem,
  ScPaginationLink,
  ScPaginationList,
  ScPaginationNext,
  ScPaginationPrevious,
} from '@semantic-components/ui';
import {
  SiChevronLeftIcon,
  SiChevronRightIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-pagination-usage-demo',
  imports: [
    ScPagination,
    ScPaginationItem,
    ScPaginationLink,
    ScPaginationList,
    ScPaginationNext,
    ScPaginationPrevious,
    SiChevronLeftIcon,
    SiChevronRightIcon,
  ],
  template: `
    <nav
      scPagination
      aria-label="Results"
      #pagination="scPagination"
      [totalItems]="30"
      [pageSize]="10"
      [(currentPage)]="page"
    >
      <ul scPaginationList>
        <li scPaginationItem>
          <button scPaginationPrevious>
            <svg siChevronLeftIcon data-icon="inline-start"></svg>
            <span class="sr-only sm:not-sr-only">Previous</span>
          </button>
        </li>
        @for (item of pagination.pages(); track item.value) {
          <li scPaginationItem>
            <button scPaginationLink [page]="+item.value">
              {{ item.value }}
            </button>
          </li>
        }
        <li scPaginationItem>
          <button scPaginationNext>
            <span class="sr-only sm:not-sr-only">Next</span>
            <svg siChevronRightIcon data-icon="inline-end"></svg>
          </button>
        </li>
      </ul>
    </nav>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class PaginationUsageDemo {
  protected readonly page = signal(1);
}
