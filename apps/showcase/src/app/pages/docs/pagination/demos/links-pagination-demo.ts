import { Component, ViewEncapsulation, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
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

/**
 * Links: each page has its own URL (?page=2), the page read from it. The
 * hrefs are yours — here routerLinks; the fragment brings the list back
 * into view.
 */
@Component({
  selector: 'app-links-pagination-demo',
  imports: [
    RouterLink,
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
      id="links-results"
      aria-label="Results"
      #pagination="scPagination"
      [totalItems]="100"
      [pageSize]="10"
      [currentPage]="page()"
    >
      <ul scPaginationList>
        <li scPaginationItem>
          <a
            scPaginationPrevious
            routerLink="."
            [queryParams]="{
              page: pagination.previousPage() ?? pagination.currentPage(),
            }"
            fragment="links-results"
          >
            <svg siChevronLeftIcon data-icon="inline-start"></svg>
            <span class="sr-only sm:not-sr-only">Previous</span>
          </a>
        </li>
        @for (item of pagination.pages(); track item.value) {
          <li scPaginationItem>
            @if (item.type === 'ellipsis') {
              <span scPaginationEllipsis>
                <svg siEllipsisIcon></svg>
              </span>
            } @else {
              <a
                scPaginationLink
                [page]="item.value"
                routerLink="."
                [queryParams]="{ page: item.value }"
                fragment="links-results"
              >
                {{ item.value }}
              </a>
            }
          </li>
        }
        <li scPaginationItem>
          <a
            scPaginationNext
            routerLink="."
            [queryParams]="{
              page: pagination.nextPage() ?? pagination.currentPage(),
            }"
            fragment="links-results"
          >
            <span class="sr-only sm:not-sr-only">Next</span>
            <svg siChevronRightIcon data-icon="inline-end"></svg>
          </a>
        </li>
      </ul>
    </nav>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class LinksPaginationDemo {
  private readonly query = toSignal(inject(ActivatedRoute).queryParamMap);

  // The pagination keeps it in range (?page=99: the last page).
  protected readonly page = computed(
    () => Number(this.query()?.get('page')) || 1,
  );
}
