import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { KeyboardNavigationPaginationDemo } from './keyboard-navigation-pagination-demo';

@Component({
  selector: 'app-keyboard-navigation-pagination-demo-container',
  imports: [DemoContainer, KeyboardNavigationPaginationDemo],
  template: `
    <app-demo-container
      title="Keyboard Navigation"
      [code]="code"
      demoUrl="/demos/pagination/keyboard-navigation-pagination-demo"
    >
      <app-keyboard-navigation-pagination-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KeyboardNavigationPaginationDemoContainer {
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
  ScPaginationPageSizeSelect,
  ScPaginationPrevious,
} from '@semantic-components/ui-lab';
import {
  SiChevronLeftIcon,
  SiChevronRightIcon,
  SiChevronsLeftIcon,
  SiChevronsRightIcon,
  SiEllipsisIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-keyboard-navigation-pagination-demo',
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
    ScPaginationPageSizeSelect,
    SiChevronLeftIcon,
    SiChevronRightIcon,
    SiChevronsLeftIcon,
    SiChevronsRightIcon,
    SiEllipsisIcon,
  ],
  template: \`
    <div class="space-y-6">
      <div class="rounded-lg border border-border bg-muted/50 p-4">
        <h3 class="mb-2 font-semibold">Keyboard Navigation</h3>
        <ul class="space-y-1 text-sm text-muted-foreground">
          <li>
            <kbd class="rounded bg-background px-1.5 py-0.5 font-mono text-xs">
              Tab
            </kbd>
            - Move between controls
          </li>
          <li>
            <kbd class="rounded bg-background px-1.5 py-0.5 font-mono text-xs">
              Enter
            </kbd>
            /
            <kbd class="rounded bg-background px-1.5 py-0.5 font-mono text-xs">
              Space
            </kbd>
            - Activate button
          </li>
          <li>
            <kbd class="rounded bg-background px-1.5 py-0.5 font-mono text-xs">
              ↑
            </kbd>
            <kbd class="rounded bg-background px-1.5 py-0.5 font-mono text-xs">
              ↓
            </kbd>
            - Navigate page size options
          </li>
        </ul>
      </div>

      <nav
        sc-pagination
        #pagination="scPagination"
        [currentPage]="currentPage()"
        [pageSize]="pageSize()"
        [totalItems]="totalItems()"
        [pageSizes]="[10, 25, 50, 100]"
        (change)="onPaginationChange($event)"
      >
        <div class="mb-4 flex items-center justify-between">
          <label class="flex items-center gap-2">
            <span class="text-sm text-muted-foreground">Items per page:</span>
            <sc-pagination-page-size-select />
          </label>

          <p class="text-sm text-muted-foreground">
            Page {{ currentPage() }} of {{ pagination.totalPages() }} ({{
              totalItems()
            }}
            items total)
          </p>
        </div>

        <ul sc-pagination-list>
          <li sc-pagination-item>
            <button
              sc-pagination-first
              [disabled]="currentPage() === 1"
              aria-label="Go to first page"
            >
              <svg si-chevrons-left-icon></svg>
              <span>First</span>
            </button>
          </li>
          <li sc-pagination-item>
            <button
              sc-pagination-previous
              [disabled]="currentPage() === 1"
              aria-label="Go to previous page"
            >
              <svg si-chevron-left-icon></svg>
              <span>Previous</span>
            </button>
          </li>

          @for (page of pagination.pages(); track page.value) {
            <li sc-pagination-item>
              @if (page.type === 'ellipsis') {
                <span sc-pagination-ellipsis aria-hidden="true">
                  <svg si-ellipsis-icon></svg>
                  <span class="sr-only">More pages</span>
                </span>
              } @else {
                <button
                  sc-pagination-link
                  [page]="page.value"
                  [attr.aria-label]="'Go to page ' + page.value"
                >
                  {{ page.value }}
                </button>
              }
            </li>
          }

          <li sc-pagination-item>
            <button
              sc-pagination-next
              [disabled]="currentPage() === pagination.totalPages()"
              aria-label="Go to next page"
            >
              <span>Next</span>
              <svg si-chevron-right-icon></svg>
            </button>
          </li>
          <li sc-pagination-item>
            <button
              sc-pagination-last
              [disabled]="currentPage() === pagination.totalPages()"
              aria-label="Go to last page"
            >
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
export class KeyboardNavigationPaginationDemo {
  readonly currentPage = signal(1);
  readonly pageSize = signal(10);
  readonly totalItems = signal(250);

  onPaginationChange(event: ScPaginationChange): void {
    this.currentPage.set(event.page);
    this.pageSize.set(event.pageSize);
  }
}`;
}
