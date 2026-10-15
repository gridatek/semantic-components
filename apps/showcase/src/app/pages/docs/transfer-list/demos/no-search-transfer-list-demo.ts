import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScButton } from '@semantic-components/ui';
import {
  ScTransferList,
  ScTransferListActions,
  ScTransferListCount,
  ScTransferListHeader,
  ScTransferListItem,
  ScTransferListItems,
  ScTransferListMoveAllToSource,
  ScTransferListMoveAllToTarget,
  ScTransferListMoveToSource,
  ScTransferListMoveToTarget,
  ScTransferListSelectAll,
  ScTransferListSource,
  ScTransferListTarget,
} from '@semantic-components/ui-lab';
import type { ScTransferListItemData } from '@semantic-components/ui-lab';
import {
  SiChevronLeftIcon,
  SiChevronRightIcon,
  SiChevronsLeftIcon,
  SiChevronsRightIcon,
} from '@semantic-icons/lucide-icons';

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
    ScTransferListMoveAllToSource,
    ScTransferListMoveAllToTarget,
    ScTransferListMoveToSource,
    ScTransferListMoveToTarget,
    ScButton,
    SiChevronLeftIcon,
    SiChevronRightIcon,
    SiChevronsLeftIcon,
    SiChevronsRightIcon,
  ],
  template: `
    <div
      scTransferList
      [(sourceItems)]="sourceItems"
      [(targetItems)]="targetItems"
    >
      <div scTransferListSource #source="scTransferListSource">
        <div scTransferListHeader>
          <label scTransferListSelectAll>
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

      <div scTransferListActions>
        <button
          scButton
          variant="outline"
          size="icon"
          scTransferListMoveToTarget
        >
          <svg siChevronRightIcon class="rtl:rotate-180"></svg>
          <span class="sr-only">Move selected to right</span>
        </button>
        <button
          scButton
          variant="outline"
          size="icon"
          scTransferListMoveToSource
        >
          <svg siChevronLeftIcon class="rtl:rotate-180"></svg>
          <span class="sr-only">Move selected to left</span>
        </button>
        <button
          scButton
          variant="outline"
          size="icon"
          scTransferListMoveAllToTarget
        >
          <svg siChevronsRightIcon class="rtl:rotate-180"></svg>
          <span class="sr-only">Move all to right</span>
        </button>
        <button
          scButton
          variant="outline"
          size="icon"
          scTransferListMoveAllToSource
        >
          <svg siChevronsLeftIcon class="rtl:rotate-180"></svg>
          <span class="sr-only">Move all to left</span>
        </button>
      </div>

      <div scTransferListTarget #target="scTransferListTarget">
        <div scTransferListHeader>
          <label scTransferListSelectAll>
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
})
export class NoSearchTransferListDemo {
  readonly sourceItems = signal<ScTransferListItemData[]>([
    { id: '1', label: 'Option A' },
    { id: '2', label: 'Option B' },
    { id: '3', label: 'Option C' },
    { id: '4', label: 'Option D', disabled: true },
  ]);

  readonly targetItems = signal<ScTransferListItemData[]>([
    { id: '5', label: 'Option E' },
  ]);
}
