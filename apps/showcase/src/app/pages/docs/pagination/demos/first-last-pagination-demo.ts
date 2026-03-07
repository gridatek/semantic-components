import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import {
  ScPagination,
  ScPaginationChange,
  ScPaginationEllipsis,
  ScPaginationFirst,
  ScPaginationItem,
  ScPaginationLast,
  ScPaginationLink,
  ScPaginationList,
  ScPaginationNext,
  ScPaginationPrevious,
} from '@semantic-components/ui';
import {
  SiChevronLeftIcon,
  SiChevronRightIcon,
  SiChevronsLeftIcon,
  SiChevronsRightIcon,
  SiEllipsisIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-first-last-pagination-demo',
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
    SiChevronLeftIcon,
    SiChevronRightIcon,
    SiChevronsLeftIcon,
    SiChevronsRightIcon,
    SiEllipsisIcon,
  ],
  template: `
    <div class="space-y-4">
      <div class="flex items-center gap-4">
        <p class="text-muted-foreground text-sm">
          Page {{ currentPage() }} of {{ pagination.totalPages() }} ({{
            totalItems()
          }}
          items total)
        </p>
      </div>

      <nav
        scPagination
        aria-label="First and last pagination"
        #pagination="scPagination"
        [currentPage]="currentPage()"
        [pageSize]="pageSize()"
        [totalItems]="totalItems()"
        (change)="onPaginationChange($event)"
      >
        <ul scPaginationList>
          <li scPaginationItem>
            <button scPaginationFirst>
              <svg siChevronsLeftIcon></svg>
              <span>First</span>
            </button>
          </li>
          <li scPaginationItem>
            <button scPaginationPrevious>
              <svg siChevronLeftIcon></svg>
              <span>Previous</span>
            </button>
          </li>

          @for (page of pagination.pages(); track page.value) {
            <li scPaginationItem>
              @if (page.type === 'ellipsis') {
                <span scPaginationEllipsis>
                  <svg siEllipsisIcon></svg>
                  <span class="sr-only">More pages</span>
                </span>
              } @else {
                <button scPaginationLink [page]="page.value">
                  {{ page.value }}
                </button>
              }
            </li>
          }

          <li scPaginationItem>
            <button scPaginationNext>
              <span>Next</span>
              <svg siChevronRightIcon></svg>
            </button>
          </li>
          <li scPaginationItem>
            <button scPaginationLast>
              <span>Last</span>
              <svg siChevronsRightIcon></svg>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FirstLastPaginationDemo {
  readonly currentPage = signal(1);
  readonly pageSize = signal(10);
  readonly totalItems = signal(100);

  onPaginationChange(event: ScPaginationChange): void {
    this.currentPage.set(event.page);
    this.pageSize.set(event.pageSize);
  }
}
