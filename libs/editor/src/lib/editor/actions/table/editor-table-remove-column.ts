import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from '@angular/core';

import { ScButton, ScTooltip } from '@semantic-components/ui';
import { SiGrid2x2XIcon } from '@semantic-icons/lucide-icons';

import { ScEditor } from '../../editor';

@Component({
  selector: 'sc-editor-table-remove-column',
  imports: [ScButton, ScTooltip, SiGrid2x2XIcon],
  template: `
    <button
      (click)="deleteColumn()"
      sc-button
      variant="ghost"
      size="sm"
      scTooltip="Remove column"
      type="button"
    >
      <svg class="w-4 h-4" si-grid-2x2-x-icon></svg>
    </button>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScEditorTableRemoveColumn {
  private readonly parent = inject(ScEditor);

  get editor() {
    return this.parent.editor;
  }

  deleteColumn() {
    this.editor.chain().focus().deleteColumn().run();
  }
}
