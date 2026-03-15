import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

@Directive({
  selector: 'div[scTransferListItems]',
  host: {
    'data-slot': 'transfer-list-items',
    '[class]': 'class()',
  },
})
export class ScTransferListItems {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly height = input('300px');

  protected readonly class = computed(() =>
    cn('flex-1 overflow-auto', `max-h-[${this.height()}]`, this.classInput()),
  );
}
