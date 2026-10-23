import { DestroyRef, Directive, computed, inject, input } from '@angular/core';
import { ScPagination, bindInput, cn } from '@semantic-components/ui';
import type { ScDataTablePaginationTable } from './data-table-types';

/**
 * Connects an `scPagination` to the table: page, page size and row count come
 * from the table, and page changes go back to it. Compose the pagination's
 * parts (buttons, page links, size select) as usual.
 *
 * ```html
 * <nav scPagination scDataTablePagination [table]="table" [pageSizes]="[10, 20, 50]">…</nav>
 * ```
 */
@Directive({
  selector: '[scPagination][scDataTablePagination]',
  host: {
    '[class]': 'class()',
  },
})
export class ScDataTablePagination {
  readonly table = input.required<ScDataTablePaginationTable>();
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly state = computed(() => this.table().atoms.pagination.get());

  protected readonly class = computed(() => cn(this.classInput()));

  constructor() {
    const pagination = inject(ScPagination, { self: true });
    bindInput(
      pagination.currentPageInput,
      computed(() => this.state().pageIndex + 1),
    );
    bindInput(
      pagination.pageSizeInput,
      computed(() => this.state().pageSize),
    );
    bindInput(
      pagination.totalItems,
      computed(() => this.table().getRowCount()),
    );

    const subscription = pagination.change.subscribe(({ page, pageSize }) => {
      const table = this.table();
      if (pageSize !== this.state().pageSize) table.setPageSize(pageSize);
      table.setPageIndex(page - 1);
    });
    inject(DestroyRef).onDestroy(() => subscription.unsubscribe());
  }
}
