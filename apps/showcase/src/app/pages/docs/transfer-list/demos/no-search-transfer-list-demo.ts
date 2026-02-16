import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ScTransferList } from '@semantic-components/ui-lab';
import type { TransferListItem } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-no-search-transfer-list-demo',
  imports: [ScTransferList],
  template: `
    <sc-transfer-list
      [(sourceItems)]="sourceItems"
      [(targetItems)]="targetItems"
      [searchable]="false"
      sourceTitle="Options"
      targetTitle="Chosen"
    />
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoSearchTransferListDemo {
  readonly sourceItems = signal<TransferListItem[]>([
    { id: '1', label: 'Option A' },
    { id: '2', label: 'Option B' },
    { id: '3', label: 'Option C' },
    { id: '4', label: 'Option D', disabled: true },
  ]);

  readonly targetItems = signal<TransferListItem[]>([
    { id: '5', label: 'Option E' },
  ]);
}
