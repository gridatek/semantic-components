import { Directive, computed, inject, input } from '@angular/core';
import { injectStyle } from '@semantic-components/ui';
import type { ScButtonVariants } from '@semantic-components/ui';
import { cn } from 'cn';
import { ScDataTableProvider } from './data-table-provider';
import type { ScDataTableExpandAllTable } from './data-table-types';

/**
 * Opens every row, or closes them all when all are open — `aria-expanded`
 * says which. Your icon and its name inside; the table from
 * `scDataTableProvider`.
 *
 * ```html
 * <button scDataTableExpandAll>Expand all</button>
 * ```
 */
@Directive({
  selector: 'button[scDataTableExpandAll]',
  host: {
    type: 'button',
    '[attr.aria-expanded]': 'expanded()',
    '[class]': 'class()',
    '(click)': 'table().toggleAllRowsExpanded(!expanded())',
  },
})
export class ScDataTableExpandAll {
  private readonly buttonStyles = injectStyle().button;
  private readonly table = inject(ScDataTableProvider)
    .table as () => ScDataTableExpandAllTable;

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('outline');
  readonly size = input<ScButtonVariants['size']>('sm');

  private readonly expanded = computed(() =>
    this.table().getIsAllRowsExpanded(),
  );

  private readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );
}
