import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { FormTransferListNextDemo } from './form-transfer-list-next-demo';

@Component({
  selector: 'app-form-transfer-list-next-demo-container',
  imports: [DemoContainer, FormTransferListNextDemo],
  template: `
    <app-demo-container
      title="Form"
      [code]="code"
      demoUrl="/demos/transfer-list-next/form-transfer-list-next-demo"
    >
      <app-form-transfer-list-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class FormTransferListNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, FormRoot, form, minLength } from '@angular/forms/signals';
import { ScButton, ScField, ScFieldErrors } from '@semantic-components/ui';
import {
  ScTransferListNext,
  ScTransferListNextListbox,
  ScTransferListNextMove,
  ScTransferListNextMoveAll,
  ScTransferListNextOption,
  ScTransferListNextPane,
  ScTransferListNextSelectAll,
} from '@semantic-components/ui-lab';
import {
  SiChevronLeftIcon,
  SiChevronRightIcon,
  SiChevronsLeftIcon,
  SiChevronsRightIcon,
} from '@semantic-icons/lucide-icons';

/** A [formField]: the chosen ids; at least two, in the schema — left short, the error shows. */
@Component({
  selector: 'app-form-transfer-list-next-demo',
  imports: [
    ScTransferListNext,
    ScTransferListNextPane,
    ScTransferListNextListbox,
    ScTransferListNextOption,
    ScTransferListNextSelectAll,
    ScTransferListNextMove,
    ScTransferListNextMoveAll,
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
  template: \`
    <form [formRoot]="roleForm" class="w-full max-w-2xl space-y-4">
      <div scField>
        <p id="role-label" class="text-sm font-medium">
          Permissions for the role
        </p>
        <div
          scTransferListNext
          [items]="permissions"
          [formField]="roleForm.permissions"
          aria-labelledby="role-label"
        >
          <div scTransferListNextPane="source" #source="scTransferListNextPane">
            <div class="flex items-center gap-2 border-b px-3 py-2">
              <input
                type="checkbox"
                scTransferListNextSelectAll
                aria-label="Select all available"
              />
              <span id="form-source-title" class="text-sm font-medium"
                >Available</span
              >
              <span class="text-muted-foreground ms-auto text-xs tabular-nums">
                {{ source.selected().length }} / {{ source.items().length }}
              </span>
            </div>
            <div scTransferListNextListbox aria-labelledby="form-source-title">
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
              <span id="form-target-title" class="text-sm font-medium"
                >Granted</span
              >
              <span class="text-muted-foreground ms-auto text-xs tabular-nums">
                {{ target.selected().length }} / {{ target.items().length }}
              </span>
            </div>
            <div scTransferListNextListbox aria-labelledby="form-target-title">
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
        <p scFieldErrors></p>
      </div>
      <button scButton type="submit">Save the role</button>
      @if (saved()) {
        <p class="text-muted-foreground text-sm" role="status">
          Saved: {{ model().permissions.join(', ') }}.
        </p>
      }
    </form>
  \`,
  host: { class: 'flex w-full flex-col items-center gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class FormTransferListNextDemo {
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
}`;
}
