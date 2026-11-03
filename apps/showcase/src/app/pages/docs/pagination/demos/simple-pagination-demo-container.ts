import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SimplePaginationDemo } from './simple-pagination-demo';

@Component({
  selector: 'app-simple-pagination-demo-container',
  imports: [DemoContainer, SimplePaginationDemo],
  template: `
    <app-demo-container
      title="Simple"
      demoUrl="/demos/pagination/simple-pagination-demo"
      [code]="code"
    >
      <app-simple-pagination-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class SimplePaginationDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScPagination,
  ScPaginationItem,
  ScPaginationLink,
  ScPaginationList,
} from '@semantic-components/ui';

@Component({
  selector: 'app-simple-pagination-demo',
  imports: [ScPagination, ScPaginationItem, ScPaginationLink, ScPaginationList],
  template: \`
    <nav
      scPagination
      aria-label="Results"
      #pagination="scPagination"
      [totalItems]="50"
      [pageSize]="10"
      [currentPage]="2"
    >
      <ul scPaginationList>
        @for (item of pagination.pages(); track item.value) {
          <li scPaginationItem>
            <button scPaginationLink [page]="+item.value">
              {{ item.value }}
            </button>
          </li>
        }
      </ul>
    </nav>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SimplePaginationDemo {}`;
}
