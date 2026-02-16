import {
  computed,
  Directive,
  effect,
  input,
  output,
  signal,
  untracked,
} from '@angular/core';
import { cn } from '../../utils';

export type ScPaginationPage =
  | { type: 'page'; value: number }
  | { type: 'ellipsis'; value: string };

export interface ScPaginationChange {
  page: number;
  pageSize: number;
}

@Directive({
  selector: 'nav[sc-pagination]',
  exportAs: 'scPagination',
  host: {
    'data-slot': 'pagination',
    role: 'navigation',
    '[attr.aria-label]': '"pagination"',
    '[class]': 'class()',
  },
})
export class ScPagination {
  readonly classInput = input<string>('', { alias: 'class' });

  // Smart pagination inputs
  readonly currentPageInput = input<number>(1, { alias: 'currentPage' });
  readonly pageSizeInput = input<number>(10, { alias: 'pageSize' });
  readonly totalItems = input<number>(0);
  readonly pageSizes = input<number[]>([10, 25, 50, 100]); // Available page size options

  // Internal state
  readonly currentPage = signal(1);
  readonly pageSize = signal(10);

  // Output events
  readonly change = output<ScPaginationChange>();

  constructor() {
    // Sync inputs to internal state
    effect(() => {
      const inputPage = this.currentPageInput();
      if (inputPage !== undefined) {
        untracked(() => this.currentPage.set(inputPage));
      }
    });

    effect(() => {
      const inputSize = this.pageSizeInput();
      if (inputSize !== undefined) {
        untracked(() => this.pageSize.set(inputSize));
      }
    });
  }

  protected readonly class = computed(() =>
    cn('mx-auto flex w-full justify-center', this.classInput()),
  );

  // Computed total pages
  readonly totalPages = computed(() => {
    const total = this.totalItems();
    const size = this.pageSize();
    return Math.ceil(total / size);
  });

  // Computed pages array for rendering
  readonly pages = computed(() => {
    const current = this.currentPage();
    const total = this.totalPages();

    return this.generatePageNumbers(current, total);
  });

  /**
   * Trigger a page change. Called internally by child components.
   * @param page The target page number
   */
  goToPage(page: number): void {
    const total = this.totalPages();
    if (page >= 1 && page <= total && page !== this.currentPage()) {
      this.currentPage.set(page);
      this.change.emit({ page, pageSize: this.pageSize() });
    }
  }

  /**
   * Change the page size. Called internally by ScPaginationPageSizeSelect.
   * @param newPageSize The new page size
   */
  changePageSize(newPageSize: number): void {
    if (newPageSize > 0 && newPageSize !== this.pageSize()) {
      // Reset to page 1 when page size changes
      this.currentPage.set(1);
      this.pageSize.set(newPageSize);
      this.change.emit({ page: 1, pageSize: newPageSize });
    }
  }

  private generatePageNumbers(
    currentPage: number,
    totalPages: number,
  ): ScPaginationPage[] {
    const siblingCount = 1; // Number of pages to show on each side of current page
    // If total pages is less than or equal to 7, show all pages
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => ({
        type: 'page' as const,
        value: i + 1,
      }));
    }

    // For more than 7 pages, always return exactly 7 items
    const pages: ScPaginationPage[] = [];

    // Pattern: [1, ..., current-1, current, current+1, ..., last]
    // Total: 7 items

    // First page
    pages.push({ type: 'page', value: 1 });

    // Calculate the range around current page
    const maxSiblings = siblingCount;
    let start = Math.max(2, currentPage - maxSiblings);
    let end = Math.min(totalPages - 1, currentPage + maxSiblings);

    // Adjust to ensure we show the right number of pages
    const totalMiddleSlots = 5; // Total slots minus first and last
    const needLeftEllipsis = start > 2;
    const needRightEllipsis = end < totalPages - 1;

    // Calculate how many actual page slots we have (excluding ellipsis)
    let pageSlots = totalMiddleSlots;
    if (needLeftEllipsis) pageSlots--;
    if (needRightEllipsis) pageSlots--;

    // Adjust range to fit in available slots
    if (!needLeftEllipsis && needRightEllipsis) {
      // Near start: [1, 2, 3, 4, 5, ..., last]
      end = Math.min(pageSlots + 1, totalPages - 1);
    } else if (needLeftEllipsis && !needRightEllipsis) {
      // Near end: [1, ..., n-4, n-3, n-2, n-1, n]
      start = Math.max(2, totalPages - pageSlots);
    } else if (needLeftEllipsis && needRightEllipsis) {
      // Middle: [1, ..., current-1, current, current+1, ..., last]
      const middlePages = pageSlots; // e.g., 3 pages in the middle
      const halfPages = Math.floor(middlePages / 2);
      start = currentPage - halfPages;
      end = currentPage + (middlePages - halfPages - 1);

      // Adjust if we're too close to edges
      if (start < 2) {
        start = 2;
        end = start + middlePages - 1;
      }
      if (end > totalPages - 1) {
        end = totalPages - 1;
        start = end - middlePages + 1;
      }
    }

    // Add left ellipsis if needed
    if (start > 2) {
      pages.push({ type: 'ellipsis', value: 'ellipsis-left' });
    }

    // Add middle pages
    for (let i = start; i <= end; i++) {
      pages.push({ type: 'page', value: i });
    }

    // Add right ellipsis if needed
    if (end < totalPages - 1) {
      pages.push({ type: 'ellipsis', value: 'ellipsis-right' });
    }

    // Last page
    pages.push({ type: 'page', value: totalPages });

    return pages;
  }
}
