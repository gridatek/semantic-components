import { Directive, computed, input, model, output } from '@angular/core';
import { cn } from '../../utils';

export type ScPaginationPage =
  | { type: 'page'; value: number }
  | { type: 'ellipsis'; value: 'ellipsis-start' | 'ellipsis-end' };

export interface ScPaginationChange {
  page: number;
  pageSize: number;
}

/** The items on the current page, counted from 1: `start` to `end`. */
export interface ScPaginationRange {
  start: number;
  end: number;
}

@Directive({
  selector: 'nav[scPagination], div[scPagination]',
  exportAs: 'scPagination',
  host: {
    role: 'navigation',
    '[class]': 'class()',
  },
})
export class ScPagination {
  readonly classInput = input<string>('', { alias: 'class' });

  /** `[(currentPage)]`: the page asked for; read `currentPage()`, kept in range. */
  readonly currentPageModel = model(1, { alias: 'currentPage' });
  /** `[(pageSize)]`: items per page. */
  readonly pageSizeModel = model(10, { alias: 'pageSize' });
  readonly totalItems = input<number>(0);
  /** Pages shown on each side of the current one. */
  readonly siblingCount = input<number>(1);
  /** Pages always shown at the start and at the end. */
  readonly boundaryCount = input<number>(1);

  /** A page or its size changed by the user: to load that page. */
  readonly change = output<ScPaginationChange>();

  protected readonly class = computed(() =>
    cn('mx-auto flex w-full justify-center', this.classInput()),
  );

  readonly pageSize = computed(() => Math.max(1, this.pageSizeModel()));

  /** At least 1: with no items there is still a (empty) first page. */
  readonly totalPages = computed(() =>
    Math.max(1, Math.ceil(this.totalItems() / this.pageSize())),
  );

  /** The current page, between 1 and the last page, even as items go. */
  readonly currentPage = computed(() =>
    Math.min(
      Math.max(1, Math.trunc(this.currentPageModel())),
      this.totalPages(),
    ),
  );

  /** The page before, or null on the first. */
  readonly previousPage = computed(() =>
    this.currentPage() > 1 ? this.currentPage() - 1 : null,
  );

  /** The page after, or null on the last. */
  readonly nextPage = computed(() =>
    this.currentPage() < this.totalPages() ? this.currentPage() + 1 : null,
  );

  /** The items on this page, for "Showing 11–20 of 100"; 0–0 with none. */
  readonly range = computed<ScPaginationRange>(() => {
    const total = this.totalItems();
    if (total <= 0) return { start: 0, end: 0 };
    const start = (this.currentPage() - 1) * this.pageSize() + 1;
    return { start, end: Math.min(start + this.pageSize() - 1, total) };
  });

  /** The pages to show, with ellipses: always as many items once there are more pages. */
  readonly pages = computed(() =>
    pageItems(
      this.currentPage(),
      this.totalPages(),
      Math.max(0, this.siblingCount()),
      Math.max(0, this.boundaryCount()),
    ),
  );

  /** Goes to a page (kept in range) and emits `change`. */
  goToPage(page: number): void {
    const target = Math.min(Math.max(1, page), this.totalPages());
    if (target === this.currentPage()) return;
    this.currentPageModel.set(target);
    this.change.emit({ page: target, pageSize: this.pageSize() });
  }

  /**
   * Changes the page size and goes back to page 1 — from a page-size picker
   * of yours (a Select: `(valueChange)="pagination.changePageSize(+$event)"`).
   */
  changePageSize(pageSize: number): void {
    if (pageSize <= 0 || pageSize === this.pageSize()) return;
    this.pageSizeModel.set(pageSize);
    this.currentPageModel.set(1);
    this.change.emit({ page: 1, pageSize });
  }
}

/**
 * The pages round the current one, with ellipses: the boundaries at each
 * end, the siblings either side of the current page. The count of items
 * stays the same as the page moves (an ellipsis stands for two pages or
 * more; a single gap shows the page instead).
 */
function pageItems(
  page: number,
  total: number,
  siblings: number,
  boundaries: number,
): ScPaginationPage[] {
  const range = (from: number, to: number) =>
    Array.from({ length: Math.max(0, to - from + 1) }, (_, i) => from + i);

  const start = range(1, Math.min(boundaries, total));
  const end = range(Math.max(total - boundaries + 1, boundaries + 1), total);

  const siblingsStart = Math.max(
    Math.min(page - siblings, total - boundaries - siblings * 2 - 1),
    boundaries + 2,
  );
  const siblingsEnd = Math.min(
    Math.max(page + siblings, boundaries + siblings * 2 + 2),
    end.length > 0 ? end[0] - 2 : total - 1,
  );

  const items: ScPaginationPage[] = start.map((value) => ({
    type: 'page',
    value,
  }));

  if (siblingsStart > boundaries + 2) {
    items.push({ type: 'ellipsis', value: 'ellipsis-start' });
  } else if (boundaries + 1 < total - boundaries) {
    items.push({ type: 'page', value: boundaries + 1 });
  }

  for (const value of range(siblingsStart, siblingsEnd)) {
    items.push({ type: 'page', value });
  }

  if (siblingsEnd < total - boundaries - 1) {
    items.push({ type: 'ellipsis', value: 'ellipsis-end' });
  } else if (total - boundaries > boundaries) {
    items.push({ type: 'page', value: total - boundaries });
  }

  for (const value of end) items.push({ type: 'page', value });

  return items;
}
