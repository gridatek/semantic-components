import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ManyTransferListDemo } from './many-transfer-list-demo';

@Component({
  selector: 'app-many-transfer-list-demo-container',
  imports: [DemoContainer, ManyTransferListDemo],
  template: `
    <app-demo-container
      title="Many"
      [code]="code"
      demoUrl="/demos/transfer-list/many-transfer-list-demo"
    >
      <app-many-transfer-list-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ManyTransferListDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScTransferList,
  ScTransferListListbox,
  ScTransferListMove,
  ScTransferListMoveAll,
  ScTransferListOption,
  ScTransferListPane,
  ScTransferListSearch,
  ScTransferListSelectAll,
} from '@semantic-components/ui';
import {
  SiChevronLeftIcon,
  SiChevronRightIcon,
  SiChevronsLeftIcon,
  SiChevronsRightIcon,
} from '@semantic-icons/lucide-icons';

/** Two hundred items: search to narrow a side; Add all moves what the search shows. */
@Component({
  selector: 'app-many-transfer-list-demo',
  imports: [
    ScTransferList,
    ScTransferListPane,
    ScTransferListListbox,
    ScTransferListOption,
    ScTransferListSelectAll,
    ScTransferListSearch,
    ScTransferListMove,
    ScTransferListMoveAll,
    SiChevronRightIcon,
    SiChevronsRightIcon,
    SiChevronLeftIcon,
    SiChevronsLeftIcon,
  ],
  template: \`
    <div
      scTransferList
      [items]="countries"
      [(value)]="chosen"
      class="w-full max-w-2xl"
    >
      <div scTransferListPane="source" #source="scTransferListPane">
        <div class="flex items-center gap-2 border-b px-3 py-2">
          <input
            type="checkbox"
            scTransferListSelectAll
            aria-label="Select all countries"
          />
          <span id="many-source-title" class="text-sm font-medium"
            >Countries</span
          >
          <span class="text-muted-foreground ms-auto text-xs tabular-nums">
            {{ source.selected().length }} / {{ source.items().length }}
          </span>
        </div>
        <div class="border-b p-2">
          <input
            scTransferListSearch
            placeholder="Search"
            aria-label="Search countries"
          />
        </div>
        <div scTransferListListbox aria-labelledby="many-source-title">
          @for (item of source.items(); track item.id) {
            <div
              [scTransferListOption]="item.id"
              [label]="item.label"
              [disabled]="item.disabled ?? false"
            >
              {{ item.label }}
            </div>
          }
        </div>
        @if (!source.items().length) {
          <p class="text-muted-foreground p-4 text-center text-sm">
            Nothing here
          </p>
        }
      </div>
      <div class="flex flex-col justify-center gap-2">
        <button scTransferListMove="target">
          <svg siChevronRightIcon class="rtl:rotate-180"></svg>
          <span class="sr-only">Add selected</span>
        </button>
        <button scTransferListMoveAll="target">
          <svg siChevronsRightIcon class="rtl:rotate-180"></svg>
          <span class="sr-only">Add all</span>
        </button>
        <button scTransferListMove="source">
          <svg siChevronLeftIcon class="rtl:rotate-180"></svg>
          <span class="sr-only">Remove selected</span>
        </button>
        <button scTransferListMoveAll="source">
          <svg siChevronsLeftIcon class="rtl:rotate-180"></svg>
          <span class="sr-only">Remove all</span>
        </button>
      </div>
      <div scTransferListPane="target" #target="scTransferListPane">
        <div class="flex items-center gap-2 border-b px-3 py-2">
          <input
            type="checkbox"
            scTransferListSelectAll
            aria-label="Select all shipping to"
          />
          <span id="many-target-title" class="text-sm font-medium"
            >Shipping to</span
          >
          <span class="text-muted-foreground ms-auto text-xs tabular-nums">
            {{ target.selected().length }} / {{ target.items().length }}
          </span>
        </div>
        <div class="border-b p-2">
          <input
            scTransferListSearch
            placeholder="Search"
            aria-label="Search shipping to"
          />
        </div>
        <div scTransferListListbox aria-labelledby="many-target-title">
          @for (item of target.items(); track item.id) {
            <div
              [scTransferListOption]="item.id"
              [label]="item.label"
              [disabled]="item.disabled ?? false"
            >
              {{ item.label }}
            </div>
          }
        </div>
        @if (!target.items().length) {
          <p class="text-muted-foreground p-4 text-center text-sm">
            Nothing here
          </p>
        }
      </div>
    </div>
  \`,
  host: { class: 'flex w-full flex-col items-center gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class ManyTransferListDemo {
  readonly countries = Array.from({ length: 200 }, (_, i) => ({
    id: 'c' + i,
    label: 'Region ' + String(i + 1).padStart(3, '0'),
  }));
  readonly chosen = signal<string[]>([]);
}`;
}
