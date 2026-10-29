import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

/**
 * A tree row's first cell content, indented by its depth: the expand button,
 * then the rest — in a line.
 *
 * ```html
 * <div scDataTableTreeCell [row]="row">
 *   <button scDataTableExpand [row]="row">…</button>
 *   {{ row.original.name }}
 * </div>
 * ```
 */
@Directive({
  selector: 'div[scDataTableTreeCell]',
  host: {
    '[style.--sc-data-table-depth]': 'row().depth',
    '[class]': 'class()',
  },
})
export class ScDataTableTreeCell {
  readonly row = input.required<{ depth: number }>();
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'flex min-w-0 items-center gap-1.5 ps-[calc(var(--sc-data-table-depth)*1.5rem)] [&>svg]:size-4 [&>svg]:shrink-0',
      this.classInput(),
    ),
  );
}
