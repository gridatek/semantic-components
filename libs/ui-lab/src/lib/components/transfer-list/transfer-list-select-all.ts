import { Directive, computed, inject, input } from '@angular/core';
import { cn, ɵwarnIfUnnamed } from '@semantic-components/ui';
import { ScTransferListPane } from './transfer-list-pane';

/** Selects all its side shows, or none: checked, mixed (some), or not. Name it ("Select all available"). */
@Directive({
  selector: 'input[type=checkbox][scTransferListSelectAll]',
  host: {
    'data-slot': 'transfer-list-select-all',
    '[checked]': 'all()',
    '[indeterminate]': 'some()',
    '[disabled]': 'pane.list.disabled() || !pane.selectable().length',
    '[class]': 'class()',
    '(change)': 'pane.selectAll(!all())',
  },
})
export class ScTransferListSelectAll {
  protected readonly pane = inject(ScTransferListPane);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly all = computed(() => {
    const count = this.pane.selectable().length;
    return count > 0 && this.pane.selected().length === count;
  });
  protected readonly some = computed(
    () => this.pane.selected().length > 0 && !this.all(),
  );

  protected readonly class = computed(() =>
    cn(
      'accent-primary size-4 shrink-0 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50',
      this.classInput(),
    ),
  );

  constructor() {
    ɵwarnIfUnnamed('scTransferListSelectAll');
  }
}
