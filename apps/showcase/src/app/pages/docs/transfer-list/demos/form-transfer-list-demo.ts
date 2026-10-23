import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, FormRoot, form, minLength } from '@angular/forms/signals';
import {
  ScButton,
  ScField,
  ScFieldErrors,
  ScTransferList,
  ScTransferListListbox,
  ScTransferListMove,
  ScTransferListMoveAll,
  ScTransferListOption,
  ScTransferListPane,
  ScTransferListSelectAll,
} from '@semantic-components/ui';
import {
  SiChevronLeftIcon,
  SiChevronRightIcon,
  SiChevronsLeftIcon,
  SiChevronsRightIcon,
} from '@semantic-icons/lucide-icons';

/** A [formField]: the chosen ids; at least two, in the schema — left short, the error shows. */
@Component({
  selector: 'app-form-transfer-list-demo',
  imports: [
    ScTransferList,
    ScTransferListPane,
    ScTransferListListbox,
    ScTransferListOption,
    ScTransferListSelectAll,
    ScTransferListMove,
    ScTransferListMoveAll,
    ScButton,
    ScField,
    ScFieldErrors,
    FormField,
    FormRoot,
    SiChevronRightIcon,
    SiChevronsRightIcon,
    SiChevronLeftIcon,
    SiChevronsLeftIcon,
  ],
  template: `
    <form [formRoot]="roleForm" class="w-full max-w-2xl space-y-4">
      <div scField>
        <p id="role-label" class="text-sm font-medium">
          Permissions for the role
        </p>
        <div
          scTransferList
          [items]="permissions"
          [formField]="roleForm.permissions"
          aria-labelledby="role-label"
        >
          <div scTransferListPane="source" #source="scTransferListPane">
            <div class="flex items-center gap-2 border-b px-3 py-2">
              <input
                type="checkbox"
                scTransferListSelectAll
                aria-label="Select all available"
              />
              <span id="form-source-title" class="text-sm font-medium"
                >Available</span
              >
              <span class="text-muted-foreground ms-auto text-xs tabular-nums">
                {{ source.selected().length }} / {{ source.items().length }}
              </span>
            </div>
            <div scTransferListListbox aria-labelledby="form-source-title">
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
                aria-label="Select all granted"
              />
              <span id="form-target-title" class="text-sm font-medium"
                >Granted</span
              >
              <span class="text-muted-foreground ms-auto text-xs tabular-nums">
                {{ target.selected().length }} / {{ target.items().length }}
              </span>
            </div>
            <div scTransferListListbox aria-labelledby="form-target-title">
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
        <p scFieldErrors></p>
      </div>
      <button scButton type="submit">Save the role</button>
      @if (saved()) {
        <p class="text-muted-foreground text-sm" role="status">
          Saved: {{ model().permissions.join(', ') }}.
        </p>
      }
    </form>
  `,
  host: { class: 'flex w-full flex-col items-center gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class FormTransferListDemo {
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
  readonly model = signal<{ permissions: string[] }>({ permissions: [] });
  readonly saved = signal(false);
  readonly roleForm = form(
    this.model,
    (path) =>
      minLength(path.permissions, 2, {
        message: 'Grant at least two permissions.',
      }),
    { submission: { action: async () => this.saved.set(true) } },
  );
}
