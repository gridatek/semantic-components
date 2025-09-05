import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from '@angular/core';

import { ScButton, ScTooltip } from '@semantic-components/ui';
import { SiTrash2Icon } from '@semantic-icons/lucide-icons';

import { ScEditor } from '../editor';

@Component({
  selector: 'sc-editor-table-delete',
  imports: [ScButton, ScTooltip, SiTrash2Icon],
  template: `
    <button
      (click)="deleteTable()"
      sc-button
      variant="ghost"
      size="sm"
      scTooltip="Delete table"
      type="button"
    >
      <svg class="w-4 h-4" si-trash-2-icon></svg>
    </button>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScEditorTableDelete {
  private readonly parent = inject(ScEditor);

  get editor() {
    return this.parent.editor;
  }

  deleteTable() {
    this.editor.chain().focus().deleteTable().run();
  }
}
