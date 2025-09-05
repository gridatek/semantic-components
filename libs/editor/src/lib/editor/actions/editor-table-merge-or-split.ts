import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from '@angular/core';

import { ScButton, ScTooltip } from '@semantic-components/ui';
import { SiMoveIcon } from '@semantic-icons/lucide-icons';

import { ScEditor } from '../editor';

@Component({
  selector: 'sc-editor-table-merge-or-split',
  imports: [ScButton, ScTooltip, SiMoveIcon],
  template: `
    <button
      (click)="mergeOrSplit()"
      sc-button
      variant="ghost"
      size="sm"
      scTooltip="Merge or split cells"
      type="button"
    >
      <svg class="w-4 h-4" si-move-icon></svg>
    </button>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScEditorTableMergeOrSplit {
  private readonly parent = inject(ScEditor);

  get editor() {
    return this.parent.editor;
  }

  mergeOrSplit() {
    this.editor.chain().focus().mergeOrSplit().run();
  }
}
