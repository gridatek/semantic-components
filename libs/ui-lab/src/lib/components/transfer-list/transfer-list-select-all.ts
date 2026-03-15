import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_TRANSFER_LIST_PANEL } from './transfer-list-panel-ref';

@Directive({
  selector: 'input[type="checkbox"][scTransferListSelectAll]',
  host: {
    'data-slot': 'transfer-list-select-all',
    '[class]': 'class()',
    '[checked]': 'panel.allSelected()',
    '[indeterminate]': 'panel.someSelected()',
    '(change)': 'panel.toggleAll()',
  },
})
export class ScTransferListSelectAll {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly panel = inject(SC_TRANSFER_LIST_PANEL);

  protected readonly class = computed(() =>
    cn('h-4 w-4 rounded border-gray-300', this.classInput()),
  );
}
