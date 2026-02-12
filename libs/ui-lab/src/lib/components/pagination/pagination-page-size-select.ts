import { _IdGenerator } from '@angular/cdk/a11y';
import { computed, Directive, inject, input } from '@angular/core';
import { cn } from '../../utils';
import { SC_FIELD } from '../field';
import { ScPagination } from './pagination';

@Directive({
  selector: 'select[sc-pagination-page-size-select]',
  host: {
    'data-slot': 'pagination-page-size-select',
    '[attr.id]': 'id()',
    '[value]': 'pagination.pageSize()',
    '[class]': 'class()',
    '(change)': 'onPageSizeChange($event)',
  },
})
export class ScPaginationPageSizeSelect {
  protected readonly pagination = inject(ScPagination);
  private readonly field = inject(SC_FIELD, { optional: true });
  private readonly fallbackId = inject(_IdGenerator).getId(
    'sc-pagination-page-size-select-',
  );

  readonly idInput = input('', { alias: 'id' });
  readonly classInput = input<string>('', { alias: 'class' });

  readonly id = computed(
    () => this.idInput() || this.field?.id() || this.fallbackId,
  );

  protected readonly class = computed(() =>
    cn(
      'h-8 rounded-md border border-input bg-background px-3 text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      this.classInput(),
    ),
  );

  protected onPageSizeChange(event: Event): void {
    event.stopPropagation();
    const select = event.target as HTMLSelectElement;
    const newPageSize = parseInt(select.value, 10);
    this.pagination.changePageSize(newPageSize);
  }
}
