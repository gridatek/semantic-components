import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScTransferListNext,
  ScTransferListNextListbox,
  ScTransferListNextMove,
  ScTransferListNextMoveAll,
  ScTransferListNextOption,
  ScTransferListNextPane,
  ScTransferListNextReorder,
  ScTransferListNextSelectAll,
} from '@semantic-components/ui-lab';
import {
  SiChevronDownIcon,
  SiChevronLeftIcon,
  SiChevronRightIcon,
  SiChevronUpIcon,
  SiChevronsLeftIcon,
  SiChevronsRightIcon,
} from '@semantic-icons/lucide-icons';

/** The value keeps its order: choose a table's columns, then move them up and down. */
@Component({
  selector: 'app-ordered-transfer-list-next-demo',
  imports: [
    ScTransferListNext,
    ScTransferListNextPane,
    ScTransferListNextListbox,
    ScTransferListNextOption,
    ScTransferListNextSelectAll,
    ScTransferListNextMove,
    ScTransferListNextMoveAll,
    ScTransferListNextReorder,
    SiChevronRightIcon,
    SiChevronsRightIcon,
    SiChevronLeftIcon,
    SiChevronsLeftIcon,
    SiChevronUpIcon,
    SiChevronDownIcon,
  ],
  template: `
    <div
      scTransferListNext
      [items]="columns"
      [(value)]="shown"
      class="w-full max-w-2xl grid-cols-[1fr_auto_1fr_auto]"
    >
      <div scTransferListNextPane="source" #source="scTransferListNextPane">
        <div class="flex items-center gap-2 border-b px-3 py-2">
          <input
            type="checkbox"
            scTransferListNextSelectAll
            aria-label="Select all hidden"
          />
          <span id="ordered-source-title" class="text-sm font-medium"
            >Hidden</span
          >
          <span class="text-muted-foreground ms-auto text-xs tabular-nums">
            {{ source.selected().length }} / {{ source.items().length }}
          </span>
        </div>
        <div scTransferListNextListbox aria-labelledby="ordered-source-title">
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
            aria-label="Select all shown"
          />
          <span id="ordered-target-title" class="text-sm font-medium"
            >Shown</span
          >
          <span class="text-muted-foreground ms-auto text-xs tabular-nums">
            {{ target.selected().length }} / {{ target.items().length }}
          </span>
        </div>
        <div scTransferListNextListbox aria-labelledby="ordered-target-title">
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
      <div
        class="flex flex-col justify-center gap-2"
        role="group"
        aria-label="Order"
      >
        <button [scTransferListNextReorder]="-1">
          <svg siChevronUpIcon></svg>
          <span class="sr-only">Move up</span>
        </button>
        <button [scTransferListNextReorder]="1">
          <svg siChevronDownIcon></svg>
          <span class="sr-only">Move down</span>
        </button>
      </div>
    </div>
    <pre
      class="bg-muted w-full max-w-2xl overflow-x-auto rounded-md p-3 text-xs"
      >{{ shown().join(' · ') }}</pre>
  `,
  host: { class: 'flex w-full flex-col items-center gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class OrderedTransferListNextDemo {
  readonly columns = [
    { id: 'name', label: 'Name' },
    { id: 'email', label: 'Email' },
    { id: 'role', label: 'Role' },
    { id: 'team', label: 'Team' },
    { id: 'joined', label: 'Joined' },
    { id: 'last-seen', label: 'Last seen' },
  ];
  readonly shown = signal(['name', 'email', 'role']);
}
