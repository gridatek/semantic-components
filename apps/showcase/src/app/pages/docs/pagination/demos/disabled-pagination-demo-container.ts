import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DisabledPaginationDemo } from './disabled-pagination-demo';

@Component({
  selector: 'app-disabled-pagination-demo-container',
  imports: [DemoContainer, DisabledPaginationDemo],
  template: `
    <app-demo-container
      title="Disabled"
      demoUrl="/demos/pagination/disabled-pagination-demo"
      [code]="code"
    >
      <app-disabled-pagination-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledPaginationDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScPagination,
  ScPaginationItem,
  ScPaginationLink,
  ScPaginationList,
  ScPaginationNext,
  ScPaginationPrevious,
} from '@semantic-components/ui';
import {
  SiChevronLeftIcon,
  SiChevronRightIcon,
} from '@semantic-icons/lucide-icons';

/**
 * On the first page, Previous is disabled by itself; a page can be disabled
 * too (not yet loaded).
 */
@Component({
  selector: 'app-disabled-pagination-demo',
  imports: [
    ScPagination,
    ScPaginationItem,
    ScPaginationLink,
    ScPaginationList,
    ScPaginationNext,
    ScPaginationPrevious,
    SiChevronLeftIcon,
    SiChevronRightIcon,
  ],
  template: \`
    <nav
      scPagination
      aria-label="Messages"
      #pagination="scPagination"
      [totalItems]="30"
      [pageSize]="10"
    >
      <ul scPaginationList>
        <li scPaginationItem>
          <button scPaginationPrevious>
            <svg siChevronLeftIcon data-icon="inline-start"></svg>
            <span class="sr-only sm:not-sr-only">Previous</span>
          </button>
        </li>
        @for (item of pagination.pages(); track item.value) {
          <li scPaginationItem>
            <button
              scPaginationLink
              [page]="+item.value"
              [disabled]="item.value === 3"
            >
              {{ item.value }}
            </button>
          </li>
        }
        <li scPaginationItem>
          <button scPaginationNext>
            <span class="sr-only sm:not-sr-only">Next</span>
            <svg siChevronRightIcon data-icon="inline-end"></svg>
          </button>
        </li>
      </ul>
    </nav>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledPaginationDemo {}`;
}
