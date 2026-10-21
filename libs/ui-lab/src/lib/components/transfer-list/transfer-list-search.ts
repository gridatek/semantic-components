import { Directive, computed, inject, input } from '@angular/core';
import { cn, ɵwarnIfUnnamed } from '@semantic-components/ui';
import { ScTransferListPane } from './transfer-list-pane';

/** Searches its side, by label. Name it ("Search available"). */
@Directive({
  selector: 'input[scTransferListSearch]',
  host: {
    'data-slot': 'transfer-list-search',
    type: 'search',
    autocomplete: 'off',
    '[value]': 'pane.query()',
    '[disabled]': 'pane.list.disabled()',
    '[class]': 'class()',
    '(input)': 'onInput($event)',
  },
})
export class ScTransferListSearch {
  protected readonly pane = inject(ScTransferListPane);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'border-input placeholder:text-muted-foreground h-8 w-full min-w-0 rounded-md border bg-transparent px-2.5 text-sm shadow-xs outline-none',
      'focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50',
      'disabled:cursor-not-allowed disabled:opacity-50',
      this.classInput(),
    ),
  );

  constructor() {
    ɵwarnIfUnnamed('scTransferListSearch');
  }

  protected onInput(event: Event): void {
    this.pane.query.set((event.target as HTMLInputElement).value);
  }
}
