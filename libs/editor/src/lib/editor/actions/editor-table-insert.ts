import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from '@angular/core';

import { ScButton, ScTooltip } from '@semantic-components/ui';
import { SiTableIcon } from '@semantic-icons/lucide-icons';

import { ScEditor } from '../editor';
import { ScExtensions } from '../extensions/extensions';

@Component({
  selector: 'sc-editor-table-insert',
  imports: [ScButton, ScTooltip, SiTableIcon],
  template: `
    <button
      (click)="insertTable()"
      sc-button
      variant="ghost"
      size="sm"
      scTooltip="Insert table"
      type="button"
    >
      <svg class="w-4 h-4" si-table-icon></svg>
    </button>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScEditorTableInsert {
  private readonly parent = inject(ScEditor);
  private readonly extensions = inject(ScExtensions);

  constructor() {
    this.extensions.table.set(true);
  }

  get editor() {
    return this.parent.editor;
  }

  protected insertTable() {
    this.editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
  }
}
