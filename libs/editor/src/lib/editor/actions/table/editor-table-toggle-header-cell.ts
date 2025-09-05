import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from '@angular/core';

import { ScButton, ScTooltip } from '@semantic-components/ui';
import { SiSquareIcon } from '@semantic-icons/lucide-icons';

import { ScEditor } from '../../editor';

@Component({
  selector: 'sc-editor-table-toggle-header-cell',
  imports: [ScButton, ScTooltip, SiSquareIcon],
  template: `
    <button
      (click)="toggleHeaderCell()"
      sc-button
      variant="ghost"
      size="sm"
      scTooltip="Toggle header cell"
      type="button"
    >
      <svg class="w-4 h-4" si-square-icon></svg>
    </button>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScEditorTableToggleHeaderCell {
  private readonly parent = inject(ScEditor);

  get editor() {
    return this.parent.editor;
  }

  toggleHeaderCell() {
    this.editor.chain().focus().toggleHeaderCell().run();
  }
}
