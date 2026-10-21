import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScTransferListNext,
  ScTransferListNextListbox,
  ScTransferListNextMove,
  ScTransferListNextMoveAll,
  ScTransferListNextOption,
  ScTransferListNextPane,
  ScTransferListNextSearch,
  ScTransferListNextSelectAll,
} from '@semantic-components/ui-lab';
import {
  SiChevronLeftIcon,
  SiChevronRightIcon,
  SiChevronsLeftIcon,
  SiChevronsRightIcon,
} from '@semantic-icons/lucide-icons';

/** Two hundred items: search to narrow a side; Add all moves what the search shows. */
@Component({
  selector: 'app-many-transfer-list-next-demo',
  imports: [
    ScTransferListNext,
    ScTransferListNextPane,
    ScTransferListNextListbox,
    ScTransferListNextOption,
    ScTransferListNextSelectAll,
    ScTransferListNextSearch,
    ScTransferListNextMove,
    ScTransferListNextMoveAll,
    SiChevronRightIcon,
    SiChevronsRightIcon,
    SiChevronLeftIcon,
    SiChevronsLeftIcon,
  ],
  template: `
    <div
      scTransferListNext
      [items]="countries"
      [(value)]="chosen"
      class="w-full max-w-2xl"
    >
      <div scTransferListNextPane="source" #source="scTransferListNextPane">
        <div class="flex items-center gap-2 border-b px-3 py-2">
          <input
            type="checkbox"
            scTransferListNextSelectAll
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
            scTransferListNextSearch
            placeholder="Search"
            aria-label="Search countries"
          />
        </div>
        <div scTransferListNextListbox aria-labelledby="many-source-title">
          @for (item of source.items(); track item.id) {
            <div
              [scTransferListNextOption]="item.id"
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
        <button scTransferListNextMove="target">
          <svg siChevronRightIcon class="rtl:rotate-180"></svg>
          <span class="sr-only">Add selected</span>
        </button>
        <button scTransferListNextMoveAll="target">
          <svg siChevronsRightIcon class="rtl:rotate-180"></svg>
          <span class="sr-only">Add all</span>
        </button>
        <button scTransferListNextMove="source">
          <svg siChevronLeftIcon class="rtl:rotate-180"></svg>
          <span class="sr-only">Remove selected</span>
        </button>
        <button scTransferListNextMoveAll="source">
          <svg siChevronsLeftIcon class="rtl:rotate-180"></svg>
          <span class="sr-only">Remove all</span>
        </button>
      </div>
      <div scTransferListNextPane="target" #target="scTransferListNextPane">
        <div class="flex items-center gap-2 border-b px-3 py-2">
          <input
            type="checkbox"
            scTransferListNextSelectAll
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
            scTransferListNextSearch
            placeholder="Search"
            aria-label="Search shipping to"
          />
        </div>
        <div scTransferListNextListbox aria-labelledby="many-target-title">
          @for (item of target.items(); track item.id) {
            <div
              [scTransferListNextOption]="item.id"
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
  `,
  host: { class: 'flex w-full flex-col items-center gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class ManyTransferListNextDemo {
  readonly countries = Array.from({ length: 200 }, (_, i) => ({
    id: 'c' + i,
    label: 'Region ' + String(i + 1).padStart(3, '0'),
  }));
  readonly chosen = signal<string[]>([]);
}
