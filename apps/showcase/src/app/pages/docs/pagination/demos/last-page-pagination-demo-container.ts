import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { LastPagePaginationDemo } from './last-page-pagination-demo';

@Component({
  selector: 'app-last-page-pagination-demo-container',
  imports: [DemoContainer, LastPagePaginationDemo],
  template: `
    <app-demo-container
      title="Last Page"
      [code]="code"
      demoUrl="/demos/pagination/last-page-pagination-demo"
    >
      <app-last-page-pagination-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LastPagePaginationDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScPagination,
  ScPaginationChange,
  ScPaginationList,
  ScPaginationEllipsis,
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
  selector: 'app-last-page-pagination-demo',
  imports: [
    ScPagination,
    ScPaginationList,
    ScPaginationEllipsis,
    ScPaginationItem,
    ScPaginationLink,
    ScPaginationNext,
    ScPaginationPrevious,
    SiChevronLeftIcon,
    SiChevronRightIcon,
    SiEllipsisIcon,
  ],
  template: \`
    <nav
      sc-pagination
      #pagination="scPagination"
      [currentPage]="currentPage()"
      [totalItems]="100"
      [pageSize]="10"
      (change)="onPaginationChange($event)"
    >
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
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LastPagePaginationDemo {
  readonly currentPage = signal(10);

  onPaginationChange(event: ScPaginationChange): void {
    this.currentPage.set(event.page);
  }
}`;
}
