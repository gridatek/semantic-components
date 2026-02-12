import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { PageSizePaginationDemo } from './page-size-pagination-demo';

@Component({
  selector: 'app-page-size-pagination-demo-container',
  imports: [DemoContainer, PageSizePaginationDemo],
  template: `
    <app-demo-container
      title="Page Size Selector"
      [code]="code"
      demoUrl="/demos/pagination/page-size-pagination-demo"
    >
      <app-page-size-pagination-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageSizePaginationDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScPagination,
  ScPaginationChange,
  ScPaginationEllipsis,
  ScPaginationItem,
  ScPaginationLink,
  ScPaginationList,
  ScPaginationNext,
  ScPaginationPageSizeSelect,
  ScPaginationPrevious,
} from '@semantic-components/ui-lab';
import {
  SiChevronLeftIcon,
  SiChevronRightIcon,
  SiEllipsisIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-page-size-pagination-demo',
  imports: [
    ScPagination,
    ScPaginationList,
    ScPaginationItem,
    ScPaginationLink,
    ScPaginationPrevious,
    ScPaginationNext,
    ScPaginationEllipsis,
    ScPaginationPageSizeSelect,
    SiChevronLeftIcon,
    SiChevronRightIcon,
    SiEllipsisIcon,
  ],
  template: \`
    <div class="space-y-4">
      <nav
        sc-pagination
        #pagination="scPagination"
        [currentPage]="currentPage()"
        [pageSize]="pageSize()"
        [totalItems]="totalItems()"
        [pageSizes]="[10, 25, 50, 100]"
        (change)="onPaginationChange($event)"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="text-sm text-muted-foreground">Items per page:</span>
            <sc-pagination-page-size-select />
          </div>

          <p class="text-sm text-muted-foreground">
            Page {{ currentPage() }} of {{ pagination.totalPages() }} ({{
              totalItems()
            }}
            items total)
          </p>
        </div>

        <ul sc-pagination-list>
          <li sc-pagination-item>
            <button sc-pagination-previous>
              <svg si-chevron-left-icon></svg>
              <span>Previous</span>
            </button>
          </li>

          @for (page of pagination.pages(); track page.value) {
            <li sc-pagination-item>
              @if (page.type === 'ellipsis') {
                <span sc-pagination-ellipsis>
                  <svg si-ellipsis-icon></svg>
                  <span class="sr-only">More pages</span>
                </span>
              } @else {
                <button sc-pagination-link [page]="page.value">
                  {{ page.value }}
                </button>
              }
            </li>
          }

          <li sc-pagination-item>
            <button sc-pagination-next>
              <span>Next</span>
              <svg si-chevron-right-icon></svg>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageSizePaginationDemo {
  readonly currentPage = signal(1);
  readonly pageSize = signal(10);
  readonly totalItems = signal(250);

  onPaginationChange(event: ScPaginationChange): void {
    this.currentPage.set(event.page);
    this.pageSize.set(event.pageSize);
  }
}`;
}
