import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SiblingsPaginationDemo } from './siblings-pagination-demo';

@Component({
  selector: 'app-siblings-pagination-demo-container',
  imports: [DemoContainer, SiblingsPaginationDemo],
  template: `
    <app-demo-container
      title="Siblings"
      demoUrl="/demos/pagination/siblings-pagination-demo"
      [code]="code"
    >
      <app-siblings-pagination-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class SiblingsPaginationDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScPagination,
  ScPaginationEllipsis,
  ScPaginationItem,
  ScPaginationLink,
  ScPaginationList,
} from '@semantic-components/ui';
import { SiEllipsisIcon } from '@semantic-icons/lucide-icons';

/**
 * Two pages either side of the current one (siblingCount); boundaryCount
 * sets how many stay at each end.
 */
@Component({
  selector: 'app-siblings-pagination-demo',
  imports: [
    ScPagination,
    ScPaginationEllipsis,
    ScPaginationItem,
    ScPaginationLink,
    ScPaginationList,
    SiEllipsisIcon,
  ],
  template: \`
    <nav
      scPagination
      aria-label="Results"
      #pagination="scPagination"
      [totalItems]="200"
      [pageSize]="10"
      [currentPage]="10"
      [siblingCount]="2"
    >
      <ul scPaginationList>
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
      </ul>
    </nav>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SiblingsPaginationDemo {}`;
}
