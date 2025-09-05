import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from '@angular/core';

import { ScToggle, ScTooltip } from '@semantic-components/ui';
import { SiMergeIcon } from '@semantic-icons/lucide-icons';

import { ScEditor } from '../../editor';

@Component({
  selector: 'sc-editor-table-merge-cells',
  imports: [ScToggle, ScTooltip, SiMergeIcon],
  template: `
    <button
      (click)="mergeCells()"
      sc-toggle
      variant="outline"
      size="sm"
      scTooltip="Merge cells"
      type="button"
    >
      <svg class="w-4 h-4" si-merge-icon></svg>
    </button>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScEditorTableMergeCells {
  private readonly parent = inject(ScEditor);

  get editor() {
    return this.parent.editor;
  }

  mergeCells() {
    this.editor.chain().focus().mergeCells().run();
  }
}
