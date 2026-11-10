import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { syncDataTableCheckbox } from './data-table-checkbox';
import type { ScDataTableHideableColumn } from './data-table-types';

/**
 * Shows/hides a column. Works alone or with `scCheckbox`.
 *
 * ```html
 * <input type="checkbox" scCheckbox scDataTableColumnVisibility [column]="column" />
 * ```
 */
@Directive({
  selector: 'input[type="checkbox"][scDataTableColumnVisibility]',
  host: {
    '(change)': 'toggle($event)',
    '[class]': 'class()',
  },
})
export class ScDataTableColumnVisibility {
  readonly column = input.required<ScDataTableHideableColumn>();
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly visible = computed(() => this.column().getIsVisible());
  protected readonly class = computed(() => cn(this.classInput()));

  constructor() {
    syncDataTableCheckbox(this.visible);
  }

  protected toggle(event: Event): void {
    this.column().toggleVisibility((event.target as HTMLInputElement).checked);
  }
}
