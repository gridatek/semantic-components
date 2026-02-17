import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScPagination,
  ScPaginationChange,
  ScPaginationEllipsis,
  ScPaginationList,
  ScPaginationItem,
  ScPaginationLink,
  ScPaginationNext,
  ScPaginationPrevious,
} from '@semantic-components/ui';
import {
  SiChevronLeftIcon,
  SiChevronRightIcon,
  SiEllipsisIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-disabled-link-pagination-demo',
  imports: [
    ScPagination,
    ScPaginationEllipsis,
    ScPaginationList,
    ScPaginationItem,
    ScPaginationLink,
    ScPaginationNext,
    ScPaginationPrevious,
    SiChevronLeftIcon,
    SiChevronRightIcon,
    SiEllipsisIcon,
  ],
  template: `
    <nav
      scPagination
      #pagination="scPagination"
      [currentPage]="currentPage()"
      [totalItems]="30"
      [pageSize]="10"
      (change)="onPaginationChange($event)"
    >
      <ul scPaginationList>
        <li scPaginationItem>
          <a scPaginationPrevious>
            <svg si-chevron-left-icon></svg>
            <span>Previous</span>
          </a>
        </li>
        @for (page of pagination.pages(); track page.value) {
          <li scPaginationItem>
            @if (page.type === 'ellipsis') {
              <span scPaginationEllipsis>
                <svg si-ellipsis-icon></svg>
                <span class="sr-only">More pages</span>
              </span>
            } @else {
              <a scPaginationLink [page]="page.value">
                {{ page.value }}
              </a>
            }
          </li>
        }
        <li scPaginationItem>
          <a scPaginationNext>
            <span>Next</span>
            <svg si-chevron-right-icon></svg>
          </a>
        </li>
      </ul>
    </nav>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledLinkPaginationDemo {
  readonly currentPage = signal(1);

  onPaginationChange(event: ScPaginationChange): void {
    this.currentPage.set(event.page);
  }
}
