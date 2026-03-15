import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import {
  ScTransferList,
  ScTransferListActions,
  ScTransferListPanel,
} from '@semantic-components/ui-lab';
import type { TransferListItem } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-no-search-transfer-list-demo',
  imports: [ScTransferList, ScTransferListPanel, ScTransferListActions],
  template: `
    <div
      scTransferList
      [(sourceItems)]="sourceItems"
      [(targetItems)]="targetItems"
    >
      <div
        scTransferListPanel
        side="source"
        title="Options"
        [searchable]="false"
      ></div>
      <div scTransferListActions></div>
      <div
        scTransferListPanel
        side="target"
        title="Chosen"
        [searchable]="false"
      ></div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
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
