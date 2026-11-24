import { DestroyRef, Directive, computed, effect, inject } from '@angular/core';
import { ScPagination, bindInput } from '@semantic-components/ui';
import { ScDataTableProvider } from './data-table-provider';
import type { ScDataTablePaginationTable } from './data-table-types';

/**
 * The table's pagination: the Pagination, its page, page size and row count
 * from the table (`scDataTableProvider`'s), its page changes back to it.
 * Compose the Pagination's parts inside as usual; `#pagination="scPagination"`
 * reads its state.
 *
 * ```html
 * <nav scDataTablePagination aria-label="Pages">…</nav>
 * ```
 */
@Directive({
  selector: 'nav[scDataTablePagination], div[scDataTablePagination]',
  hostDirectives: [
    { directive: ScPagination, inputs: ['class', 'siblings', 'boundaries'] },
  ],
})
export class ScDataTablePagination {
  private readonly table = inject(ScDataTableProvider)
    .table as () => ScDataTablePaginationTable;

  private readonly state = computed(() => this.table().atoms.pagination.get());

  constructor() {
    const pagination = inject(ScPagination, { self: true });
    // The table's page and size, into the pagination's models.
    effect(() => pagination.currentPageModel.set(this.state().pageIndex + 1));
    effect(() => pagination.pageSizeModel.set(this.state().pageSize));
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
