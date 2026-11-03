import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { LinksPaginationDemo } from './links-pagination-demo';

@Component({
  selector: 'app-links-pagination-demo-container',
  imports: [DemoContainer, LinksPaginationDemo],
  template: `
    <app-demo-container
      title="Links"
      demoUrl="/demos/pagination/links-pagination-demo"
      [code]="code"
    >
      <app-links-pagination-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class LinksPaginationDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, computed, inject } from '@angular/core';
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
  template: \`
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
            [queryParams]="{ page: previousPage() }"
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
            [queryParams]="{ page: nextPage() }"
            fragment="links-results"
          >
            <span class="sr-only sm:not-sr-only">Next</span>
            <svg siChevronRightIcon data-icon="inline-end"></svg>
          </a>
        </li>
      </ul>
    </nav>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class LinksPaginationDemo {
  private readonly query = toSignal(inject(ActivatedRoute).queryParamMap);

  private readonly totalPages = 10;

  protected readonly page = computed(() => {
    const page = Number(this.query()?.get('page') ?? 1);
    return Number.isInteger(page)
      ? Math.min(Math.max(page, 1), this.totalPages)
      : 1;
  });

  protected readonly previousPage = computed(() =>
    Math.max(this.page() - 1, 1),
  );

  protected readonly nextPage = computed(() =>
    Math.min(this.page() + 1, this.totalPages),
  );
}`;
}
