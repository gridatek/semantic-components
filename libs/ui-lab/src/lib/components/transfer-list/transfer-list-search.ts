import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_TRANSFER_LIST_PANEL } from './transfer-list-panel-ref';

@Directive({
  selector: 'input[scTransferListSearch]',
  host: {
    'data-slot': 'transfer-list-search',
    '[class]': 'class()',
    '[value]': 'panel.searchValue()',
    '(input)': 'onInput($event)',
  },
})
export class ScTransferListSearch {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly panel = inject(SC_TRANSFER_LIST_PANEL);

  protected readonly class = computed(() =>
    cn(
      'bg-background h-8 w-full rounded-md border px-2 text-sm',
      this.classInput(),
    ),
  );

  protected onInput(event: Event): void {
    this.panel.onSearchInput((event.target as HTMLInputElement).value);
  }
}
