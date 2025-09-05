import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from '@angular/core';

import { ScButton, ScTooltip } from '@semantic-components/ui';
import { SiRectangleVerticalIcon } from '@semantic-icons/lucide-icons';

import { ScEditor } from '../../editor';

@Component({
  selector: 'sc-editor-table-toggle-header-column',
  imports: [ScButton, ScTooltip, SiRectangleVerticalIcon],
  template: `
    <button
      (click)="toggleHeaderColumn()"
      sc-button
      variant="ghost"
      size="sm"
      scTooltip="Toggle header column"
      type="button"
    >
      <svg class="w-4 h-4" si-rectangle-vertical-icon></svg>
    </button>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScEditorTableToggleHeaderColumn {
  private readonly parent = inject(ScEditor);

  get editor() {
    return this.parent.editor;
  }

  toggleHeaderColumn() {
    this.editor.chain().focus().toggleHeaderColumn().run();
  }
}
