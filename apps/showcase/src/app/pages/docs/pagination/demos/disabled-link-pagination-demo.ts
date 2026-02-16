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
      sc-pagination
      #pagination="scPagination"
      [currentPage]="currentPage()"
      [totalItems]="30"
      [pageSize]="10"
      (change)="onPaginationChange($event)"
    >
      <ul sc-pagination-list>
        <li sc-pagination-item>
          <a sc-pagination-previous>
            <svg si-chevron-left-icon></svg>
            <span>Previous</span>
          </a>
        </li>
        @for (page of pagination.pages(); track page.value) {
          <li sc-pagination-item>
            @if (page.type === 'ellipsis') {
              <span sc-pagination-ellipsis>
                <svg si-ellipsis-icon></svg>
                <span class="sr-only">More pages</span>
              </span>
            } @else {
              <a sc-pagination-link [page]="page.value">
                {{ page.value }}
              </a>
            }
          </li>
        }
        <li sc-pagination-item>
          <a sc-pagination-next>
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
