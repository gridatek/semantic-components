import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { FirstLastPaginationDemo } from './first-last-pagination-demo';

@Component({
  selector: 'app-first-last-pagination-demo-container',
  imports: [DemoContainer, FirstLastPaginationDemo],
  template: `
    <app-demo-container
      title="With First & Last Buttons"
      [code]="code"
      demoUrl="/demos/pagination/first-last-pagination-demo"
    >
      <app-first-last-pagination-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FirstLastPaginationDemoContainer {
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
  template: \`
    <div class="space-y-4">
      <div class="flex items-center gap-4">
        <p class="text-sm text-muted-foreground">
          Page {{ currentPage() }} of {{ pagination.totalPages() }} ({{
            totalItems()
          }}
          items total)
        </p>
      </div>

      <nav
        sc-pagination
        #pagination="scPagination"
        [currentPage]="currentPage()"
        [pageSize]="pageSize()"
        [totalItems]="totalItems()"
        (change)="onPaginationChange($event)"
      >
        <ul sc-pagination-list>
          <li sc-pagination-item>
            <button sc-pagination-first>
              <svg si-chevrons-left-icon></svg>
              <span>First</span>
            </button>
          </li>
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
          <li sc-pagination-item>
            <button sc-pagination-last>
              <span>Last</span>
              <svg si-chevrons-right-icon></svg>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  \`,
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
}`;
}
