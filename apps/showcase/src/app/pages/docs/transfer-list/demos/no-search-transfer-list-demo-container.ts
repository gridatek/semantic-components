import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { NoSearchTransferListDemo } from './no-search-transfer-list-demo';

@Component({
  selector: 'app-no-search-transfer-list-demo-container',
  imports: [DemoContainer, NoSearchTransferListDemo],
  template: `
    <app-demo-container
      title="No Search"
      demoUrl="/demos/transfer-list/no-search-transfer-list-demo"
      [code]="code"
    >
      <app-no-search-transfer-list-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class NoSearchTransferListDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
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
  template: \`
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
          aria-label="Move selected to right"
        >
          <svg siChevronRightIcon class="rtl:rotate-180"></svg>
        </button>
        <button
          scButton
          variant="outline"
          size="icon"
          scTransferListMoveToSource
          aria-label="Move selected to left"
        >
          <svg siChevronLeftIcon class="rtl:rotate-180"></svg>
        </button>
        <button
          scButton
          variant="outline"
          size="icon"
          scTransferListMoveAllToTarget
          aria-label="Move all to right"
        >
          <svg siChevronsRightIcon class="rtl:rotate-180"></svg>
        </button>
        <button
          scButton
          variant="outline"
          size="icon"
          scTransferListMoveAllToSource
          aria-label="Move all to left"
        >
          <svg siChevronsLeftIcon class="rtl:rotate-180"></svg>
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
  \`,
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
}`;
}
