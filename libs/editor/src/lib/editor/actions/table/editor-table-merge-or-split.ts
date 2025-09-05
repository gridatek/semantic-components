import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from '@angular/core';

import { ScToggle, ScTooltip } from '@semantic-components/ui';
import { SiMoveIcon } from '@semantic-icons/lucide-icons';

import { ScEditor } from '../../editor';

@Component({
  selector: 'sc-editor-table-merge-or-split',
  imports: [ScToggle, ScTooltip, SiMoveIcon],
  template: `
    <button
      (click)="mergeOrSplit()"
      sc-toggle
      variant="outline"
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
