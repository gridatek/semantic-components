import { JsonPipe } from '@angular/common';
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

/** Two sides, one value: the chosen ids. Each side a listbox — ↑ ↓, Space selects, Shift extends, Ctrl+A all, Enter (or a double-click) moves across; one Tab stop each. Billing is disabled. */
@Component({
  selector: 'app-basic-transfer-list-next-demo',
  imports: [
    JsonPipe,
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
      [items]="permissions"
      [(value)]="chosen"
      class="w-full max-w-2xl"
    >
      <div scTransferListNextPane="source" #source="scTransferListNextPane">
        <div class="flex items-center gap-2 border-b px-3 py-2">
          <input
            type="checkbox"
            scTransferListNextSelectAll
            aria-label="Select all available"
          />
          <span id="basic-source-title" class="text-sm font-medium"
            >Available</span
          >
          <span class="text-muted-foreground ms-auto text-xs tabular-nums">
            {{ source.selected().length }} / {{ source.items().length }}
          </span>
        </div>
        <div class="border-b p-2">
          <input
            scTransferListNextSearch
            placeholder="Search"
            aria-label="Search available"
          />
        </div>
        <div scTransferListNextListbox aria-labelledby="basic-source-title">
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
            aria-label="Select all granted"
          />
          <span id="basic-target-title" class="text-sm font-medium"
            >Granted</span
          >
          <span class="text-muted-foreground ms-auto text-xs tabular-nums">
            {{ target.selected().length }} / {{ target.items().length }}
          </span>
        </div>
        <div class="border-b p-2">
          <input
            scTransferListNextSearch
            placeholder="Search"
            aria-label="Search granted"
          />
        </div>
        <div scTransferListNextListbox aria-labelledby="basic-target-title">
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
    <pre
      class="bg-muted w-full max-w-2xl overflow-x-auto rounded-md p-3 text-xs"
      >{{ chosen() | json }}</pre>
  `,
  host: { class: 'flex w-full flex-col items-center gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicTransferListNextDemo {
  readonly permissions = [
    { id: 'read', label: 'Read' },
    { id: 'write', label: 'Write' },
    { id: 'delete', label: 'Delete' },
    { id: 'share', label: 'Share' },
    { id: 'export', label: 'Export' },
    { id: 'invite', label: 'Invite members' },
    { id: 'billing', label: 'Billing', disabled: true },
    { id: 'admin', label: 'Administer' },
  ];
  readonly chosen = signal(['read']);
}
