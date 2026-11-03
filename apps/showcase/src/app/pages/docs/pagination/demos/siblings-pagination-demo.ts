import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScPagination,
  ScPaginationEllipsis,
  ScPaginationItem,
  ScPaginationLink,
  ScPaginationList,
  type ScPaginationPage,
} from '@semantic-components/ui';
import { SiEllipsisIcon } from '@semantic-icons/lucide-icons';

/**
 * Two pages either side of the current one (siblings); boundaries
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
  template: `
    <nav
      scPagination
      aria-label="Photos"
      #pagination="scPagination"
      [totalItems]="200"
      [pageSize]="10"
      [currentPage]="10"
      [siblings]="2"
    >
      <ul scPaginationList>
        @for (item of pagination.pages(); track item.value) {
          <!-- On a phone, the current page and its siblings only. -->
          <li
            scPaginationItem
            [class]="
              isSibling(item, pagination.currentPage()) ? '' : 'max-sm:hidden'
            "
          >
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
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SiblingsPaginationDemo {
  protected isSibling(item: ScPaginationPage, current: number): boolean {
    return item.type === 'page' && Math.abs(item.value - current) <= 2;
  }
}
