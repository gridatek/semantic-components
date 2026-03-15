import {
  Directive,
  computed,
  inject,
  input,
  model,
  output,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScTransferListState } from './transfer-list-state';
import type {
  TransferListItem,
  TransferListState,
} from './transfer-list-types';

@Directive({
  selector: 'div[scTransferList]',
  providers: [ScTransferListState],
  host: {
    'data-slot': 'transfer-list',
    '[class]': 'class()',
  },
})
export class ScTransferList {
  readonly classInput = input<string>('', { alias: 'class' });

  readonly sourceItems = model<TransferListItem[]>([]);
  readonly targetItems = model<TransferListItem[]>([]);

  readonly transferChange = output<TransferListState>();

  private readonly state = inject(ScTransferListState);

  protected readonly class = computed(() =>
    cn('grid grid-cols-[1fr_auto_1fr] gap-4', this.classInput()),
  );

  constructor() {
    this.state.sourceItems = this.sourceItems;
    this.state.targetItems = this.targetItems;
    this.state.onTransfer = () => {
      this.transferChange.emit({
        source: this.sourceItems(),
        target: this.targetItems(),
      });
    };
  }
}
