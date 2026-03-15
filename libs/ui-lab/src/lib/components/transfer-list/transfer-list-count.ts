import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_TRANSFER_LIST_PANEL } from './transfer-list-panel-ref';

@Directive({
  selector: '[scTransferListCount]',
  host: {
    'data-slot': 'transfer-list-count',
    '[class]': 'class()',
    '[textContent]': 'countText()',
  },
})
export class ScTransferListCount {
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly panel = inject(SC_TRANSFER_LIST_PANEL);

  protected readonly class = computed(() =>
    cn('text-muted-foreground text-xs', this.classInput()),
  );

  protected readonly countText = computed(
    () => `${this.panel.selectedCount()}/${this.panel.totalCount()}`,
  );
}
