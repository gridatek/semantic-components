import { Directive, computed, input } from '@angular/core';
import { injectStyle } from '@semantic-components/ui';
import type { ScButtonVariants } from '@semantic-components/ui';
import { cn } from 'cn';
import type { ScDataTableExpandAllTable } from './data-table-types';

/**
 * Opens every row, or closes them all when all are open — `aria-expanded`
 * says which. Your icon and its name inside.
 *
 * ```html
 * <button scDataTableExpandAll [table]="table">Expand all</button>
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

  readonly table = input.required<ScDataTableExpandAllTable>();
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
