import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import {
  ScMenu,
  ScMenuContent,
  ScMenuItem,
  ScMenuPortal,
  ScMenuProvider,
  ScMenuTrigger,
} from '@semantic-components/ui';
import {
  ScEditor,
  ScEditorBold,
  ScEditorContent,
  ScEditorItalic,
  ScEditorSeparator,
  ScEditorToolbar,
  ScEditorToolbarGroup,
  provideEditor,
} from '@semantic-components/ui/editor';
import {
  ScEditorTable,
  type ScEditorTableAction,
  withTables,
} from '@semantic-components/ui/editor/tables';
import {
  SiBoldIcon,
  SiChevronDownIcon,
  SiItalicIcon,
  SiTable2Icon,
} from '@semantic-icons/lucide-icons';

const PLANS = `<p>Our plans:</p>
<table>
  <tr><th><p>Plan</p></th><th><p>Price</p></th><th><p>Seats</p></th></tr>
  <tr><td><p>Starter</p></td><td><p>Free</p></td><td><p>1</p></td></tr>
  <tr><td><p>Team</p></td><td><p>$12</p></td><td><p>10</p></td></tr>
</table>`;

/** The core editor and one feature: tables, from their menu. */
@Component({
  selector: 'app-tables-editor-demo',
  providers: [provideEditor(withTables())],
  imports: [
    FormField,
    ScEditor,
    ScEditorBold,
    ScEditorContent,
    ScEditorItalic,
    ScEditorSeparator,
    ScEditorTable,
    ScEditorToolbar,
    ScEditorToolbarGroup,
    ScMenu,
    ScMenuContent,
    ScMenuItem,
    ScMenuPortal,
    ScMenuProvider,
    ScMenuTrigger,
    SiBoldIcon,
    SiChevronDownIcon,
    SiItalicIcon,
    SiTable2Icon,
  ],
  template: `
    <div class="w-full">
      <div
        scEditor
        [formField]="editorForm.body"
        class="overflow-hidden rounded-lg border"
      >
        <div scEditorToolbar aria-label="Formatting">
          <div scEditorToolbarGroup>
            <button scEditorBold value="bold">
              <svg siBoldIcon></svg>
              <span class="sr-only">Bold</span>
            </button>
            <button scEditorItalic value="italic">
              <svg siItalicIcon></svg>
              <span class="sr-only">Italic</span>
            </button>
          </div>

          <div scEditorSeparator></div>

          <div scEditorToolbarGroup>
            <div scMenuProvider>
              <button
                scMenuTrigger
                scEditorTable
                value="table"
                #table="scEditorTable"
              >
                <svg siTable2Icon></svg>
                <span class="sr-only">Table</span>
                <svg siChevronDownIcon></svg>
              </button>
              <ng-template scMenuPortal>
                <div scMenu (itemSelected)="table.select($event)">
                  <ng-template scMenuContent>
                    @for (action of tableActions; track action) {
                      <div
                        scMenuItem
                        [value]="action"
                        [disabled]="!table.can(action)"
                      >
                        {{ tableLabels[action] }}
                      </div>
                    }
                  </ng-template>
                </div>
              </ng-template>
            </div>
          </div>
        </div>

        <div scEditorContent ariaLabel="Plans"></div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class TablesEditorDemo {
  private readonly model = signal({ body: PLANS });
  readonly editorForm = form(this.model);

  readonly tableActions: ScEditorTableAction[] = [
    'insertTable',
    'addRowBefore',
    'addRowAfter',
    'deleteRow',
    'addColumnBefore',
    'addColumnAfter',
    'deleteColumn',
    'mergeCells',
    'splitCell',
    'toggleHeaderRow',
    'toggleHeaderColumn',
    'deleteTable',
  ];
  readonly tableLabels: Record<ScEditorTableAction, string> = {
    insertTable: 'Insert table',
    addRowBefore: 'Add row above',
    addRowAfter: 'Add row below',
    deleteRow: 'Delete row',
    addColumnBefore: 'Add column before',
    addColumnAfter: 'Add column after',
    deleteColumn: 'Delete column',
    mergeCells: 'Merge cells',
    splitCell: 'Split cell',
    toggleHeaderRow: 'Header row',
    toggleHeaderColumn: 'Header column',
    deleteTable: 'Delete table',
  };
}
