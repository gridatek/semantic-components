import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from '@angular/core';

import { ScButton, ScTooltip } from '@semantic-components/ui';
import { SiGrid2x2XIcon } from '@semantic-icons/lucide-icons';

import { ScEditor } from '../../editor';

@Component({
  selector: 'sc-editor-table-remove-row',
  imports: [ScButton, ScTooltip, SiGrid2x2XIcon],
  template: `
    <button
      (click)="deleteRow()"
      sc-button
      variant="ghost"
      size="sm"
      scTooltip="Remove row"
      type="button"
    >
      <svg class="w-4 h-4" si-grid-2x2-x-icon></svg>
    </button>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScEditorTableRemoveRow {
  private readonly parent = inject(ScEditor);

  get editor() {
    return this.parent.editor;
  }

  deleteRow() {
    this.editor.chain().focus().deleteRow().run();
  }
}
