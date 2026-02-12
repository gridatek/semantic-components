import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicPaginationDemo } from './basic-pagination-demo';

@Component({
  selector: 'app-basic-pagination-demo-container',
  imports: [DemoContainer, BasicPaginationDemo],
  template: `
    <app-demo-container
      title="Basic"
      [code]="code"
      demoUrl="/demos/pagination/basic-pagination-demo"
    >
      <app-basic-pagination-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicPaginationDemoContainer {
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
  ScPaginationList,
  ScPaginationItem,
  ScPaginationLink,
  ScPaginationNext,
  ScPaginationPrevious,
} from '@semantic-components/ui-lab';
import {
  SiChevronLeftIcon,
  SiChevronRightIcon,
  SiEllipsisIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-basic-pagination-demo',
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
  template: \`
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
export class BasicPaginationDemo {
  readonly currentPage = signal(1);

  onPaginationChange(event: ScPaginationChange): void {
    this.currentPage.set(event.page);
  }
}`;
}
