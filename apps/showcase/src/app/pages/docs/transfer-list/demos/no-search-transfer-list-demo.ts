import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import {
  ScTransferList,
  ScTransferListActions,
  ScTransferListCount,
  ScTransferListHeader,
  ScTransferListItem,
  ScTransferListItems,
  ScTransferListSelectAll,
  ScTransferListSource,
  ScTransferListTarget,
} from '@semantic-components/ui-lab';
import type { TransferListItem } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-no-search-transfer-list-demo',
  imports: [
    ScTransferList,
    ScTransferListSource,
    ScTransferListTarget,
    ScTransferListHeader,
    ScTransferListSelectAll,
    ScTransferListCount,
    ScTransferListItems,
    ScTransferListItem,
    ScTransferListActions,
  ],
  template: `
    <div
      scTransferList
      [(sourceItems)]="sourceItems"
      [(targetItems)]="targetItems"
    >
      <div scTransferListSource #source="scTransferListSource">
        <div scTransferListHeader>
          <label class="flex items-center gap-2">
            <input type="checkbox" scTransferListSelectAll />
            <span class="font-medium">Options</span>
          </label>
          <span scTransferListCount></span>
        </div>
        <div scTransferListItems>
          @for (item of source.filteredItems(); track item.id) {
            <label scTransferListItem [item]="item">
              <div class="truncate">{{ item.label }}</div>
            </label>
          } @empty {
            <div class="text-muted-foreground p-4 text-center text-sm">
              No items
            </div>
          }
        </div>
      </div>

      <div scTransferListActions></div>

      <div scTransferListTarget #target="scTransferListTarget">
        <div scTransferListHeader>
          <label class="flex items-center gap-2">
            <input type="checkbox" scTransferListSelectAll />
            <span class="font-medium">Chosen</span>
          </label>
          <span scTransferListCount></span>
        </div>
        <div scTransferListItems>
          @for (item of target.filteredItems(); track item.id) {
            <label scTransferListItem [item]="item">
              <div class="truncate">{{ item.label }}</div>
            </label>
          } @empty {
            <div class="text-muted-foreground p-4 text-center text-sm">
              No items
            </div>
          }
        </div>
      </div>
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
