import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ScField, ScLabel } from '@semantic-components/ui';
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
} from '@semantic-components/ui';
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
    ScField,
    ScLabel,
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
  template: `
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
        scPagination
        #pagination="scPagination"
        [currentPage]="currentPage()"
        [pageSize]="pageSize()"
        [totalItems]="totalItems()"
        [pageSizes]="[10, 25, 50, 100]"
        (change)="onPaginationChange($event)"
      >
        <div class="mb-4 flex items-center justify-between">
          <div scField orientation="horizontal" class="w-auto">
            <label scLabel class="text-sm text-muted-foreground">
              Items per page:
            </label>
            <select scPaginationPageSizeSelect>
              @for (size of pagination.pageSizes(); track size) {
                <option [value]="size">{{ size }}</option>
              }
            </select>
          </div>

          <p class="text-sm text-muted-foreground">
            Page {{ currentPage() }} of {{ pagination.totalPages() }} ({{
              totalItems()
            }}
            items total)
          </p>
        </div>

        <ul scPaginationList>
          <li scPaginationItem>
            <button
              scPaginationFirst
              [disabled]="currentPage() === 1"
              aria-label="Go to first page"
            >
              <svg siChevronsLeftIcon></svg>
              <span>First</span>
            </button>
          </li>
          <li scPaginationItem>
            <button
              scPaginationPrevious
              [disabled]="currentPage() === 1"
              aria-label="Go to previous page"
            >
              <svg siChevronLeftIcon></svg>
              <span>Previous</span>
            </button>
          </li>

          @for (page of pagination.pages(); track page.value) {
            <li scPaginationItem>
              @if (page.type === 'ellipsis') {
                <span scPaginationEllipsis aria-hidden="true">
                  <svg siEllipsisIcon></svg>
                  <span class="sr-only">More pages</span>
                </span>
              } @else {
                <button
                  scPaginationLink
                  [page]="page.value"
                  [attr.aria-label]="'Go to page ' + page.value"
                >
                  {{ page.value }}
                </button>
              }
            </li>
          }

          <li scPaginationItem>
            <button
              scPaginationNext
              [disabled]="currentPage() === pagination.totalPages()"
              aria-label="Go to next page"
            >
              <span>Next</span>
              <svg siChevronRightIcon></svg>
            </button>
          </li>
          <li scPaginationItem>
            <button
              scPaginationLast
              [disabled]="currentPage() === pagination.totalPages()"
              aria-label="Go to last page"
            >
              <span>Last</span>
              <svg siChevronsRightIcon></svg>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  `,
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
}
