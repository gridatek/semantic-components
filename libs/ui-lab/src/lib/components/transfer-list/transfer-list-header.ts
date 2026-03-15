import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

@Directive({
  selector: 'div[scTransferListHeader]',
  host: {
    'data-slot': 'transfer-list-header',
    '[class]': 'class()',
  },
})
export class ScTransferListHeader {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'flex items-center justify-between border-b bg-muted/50 px-3 py-2',
      this.classInput(),
    ),
  );
}
