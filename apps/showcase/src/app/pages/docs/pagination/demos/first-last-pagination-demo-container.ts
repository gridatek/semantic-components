import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { FirstLastPaginationDemo } from './first-last-pagination-demo';

@Component({
  selector: 'app-first-last-pagination-demo-container',
  imports: [DemoContainer, FirstLastPaginationDemo],
  template: `
    <app-demo-container
      title="First and Last"
      demoUrl="/demos/pagination/first-last-pagination-demo"
      [code]="code"
    >
      <app-first-last-pagination-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class FirstLastPaginationDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScPagination,
  ScPaginationEllipsis,
  ScPaginationFirst,
  ScPaginationItem,
  ScPaginationLast,
  ScPaginationLink,
  ScPaginationList,
  ScPaginationNext,
  ScPaginationPrevious,
  ScPaginationStatus,
} from '@semantic-components/ui';
import {
  SiChevronLeftIcon,
  SiChevronRightIcon,
  SiChevronsLeftIcon,
  SiChevronsRightIcon,
  SiEllipsisIcon,
} from '@semantic-icons/lucide-icons';

/** First and Last beside Previous and Next; the page said in a status. */
@Component({
  selector: 'app-first-last-pagination-demo',
  imports: [
    ScPagination,
    ScPaginationEllipsis,
    ScPaginationFirst,
    ScPaginationItem,
    ScPaginationLast,
    ScPaginationLink,
    ScPaginationList,
    ScPaginationNext,
    ScPaginationPrevious,
    ScPaginationStatus,
    SiChevronLeftIcon,
    SiChevronRightIcon,
    SiChevronsLeftIcon,
    SiChevronsRightIcon,
    SiEllipsisIcon,
  ],
  template: \`
    <nav
      scPagination
      aria-label="Results"
      #pagination="scPagination"
      [totalItems]="120"
      [pageSize]="10"
      class="flex-col items-center gap-3"
    >
      <ul scPaginationList>
        <li scPaginationItem>
          <button scPaginationFirst size="icon">
            <svg siChevronsLeftIcon></svg>
            <span class="sr-only">First</span>
          </button>
        </li>
        <li scPaginationItem>
          <button scPaginationPrevious size="icon">
            <svg siChevronLeftIcon></svg>
            <span class="sr-only">Previous</span>
          </button>
        </li>
        @for (item of pagination.pages(); track item.value) {
          <li scPaginationItem>
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
          <button scPaginationNext size="icon">
            <svg siChevronRightIcon></svg>
            <span class="sr-only">Next</span>
          </button>
        </li>
        <li scPaginationItem>
          <button scPaginationLast size="icon">
            <svg siChevronsRightIcon></svg>
            <span class="sr-only">Last</span>
          </button>
        </li>
      </ul>
      <p scPaginationStatus>
        Page {{ pagination.currentPage() }} of {{ pagination.totalPages() }}
      </p>
    </nav>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class FirstLastPaginationDemo {}`;
}
