import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

/**
 * A body row bound to its row: `data-state="selected"` while selected (the
 * `scTableRow` styles use it). Use with `scTableRow`.
 */
@Directive({
  selector: 'tr[scDataTableRow]',
  host: {
    '[attr.data-state]': 'row()?.getIsSelected() ? "selected" : null',
    '[class]': 'class()',
  },
})
export class ScDataTableRow {
  readonly row = input<{ getIsSelected(): boolean }>();
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn(this.classInput()));
}
