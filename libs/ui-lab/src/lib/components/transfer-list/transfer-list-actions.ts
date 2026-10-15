import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

/** The move buttons, between the two lists: write them in it. */
@Directive({
  selector: 'div[scTransferListActions]',
  host: {
    'data-slot': 'transfer-list-actions',
    '[class]': 'class()',
  },
})
export class ScTransferListActions {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('flex flex-col items-center justify-center gap-2', this.classInput()),
  );
}
