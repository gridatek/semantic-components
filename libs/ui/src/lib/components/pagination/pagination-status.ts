import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

/**
 * Says which page is shown, and announces it when it changes (a polite live
 * region). Write its text from the pagination — `Page {{ p.currentPage() }} of
 * {{ p.totalPages() }}` (`#p="scPagination"`) — visible, or `sr-only`.
 */
@Directive({
  selector: '[scPaginationStatus]',
  host: {
    role: 'status',
    'aria-atomic': 'true',
    'data-slot': 'pagination-status',
    '[class]': 'class()',
  },
})
export class ScPaginationStatus {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('text-muted-foreground text-sm tabular-nums', this.classInput()),
  );
}
