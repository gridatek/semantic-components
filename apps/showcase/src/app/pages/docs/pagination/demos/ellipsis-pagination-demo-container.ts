import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { EllipsisPaginationDemo } from './ellipsis-pagination-demo';

@Component({
  selector: 'app-ellipsis-pagination-demo-container',
  imports: [DemoContainer, EllipsisPaginationDemo],
  template: `
    <app-demo-container
      title="With Ellipsis"
      [code]="code"
      demoUrl="/demos/pagination/ellipsis-pagination-demo"
    >
      <app-ellipsis-pagination-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EllipsisPaginationDemoContainer {
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
  selector: 'app-ellipsis-pagination-demo',
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
      scPagination
      #pagination="scPagination"
      [currentPage]="currentPage()"
      [totalItems]="100"
      [pageSize]="10"
      (change)="onPaginationChange($event)"
    >
      <ul scPaginationList>
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
      </ul>
    </nav>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EllipsisPaginationDemo {
  readonly currentPage = signal(1);

  onPaginationChange(event: ScPaginationChange): void {
    this.currentPage.set(event.page);
  }
}`;
}
