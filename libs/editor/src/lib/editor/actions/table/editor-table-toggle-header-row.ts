import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from '@angular/core';

import { ScToggle, ScTooltip } from '@semantic-components/ui';
import { SiRectangleHorizontalIcon } from '@semantic-icons/lucide-icons';

import { ScEditor } from '../../editor';

@Component({
  selector: 'sc-editor-table-toggle-header-row',
  imports: [ScToggle, ScTooltip, SiRectangleHorizontalIcon],
  template: `
    <button
      (click)="toggleHeaderRow()"
      sc-toggle
      variant="outline"
      size="sm"
      scTooltip="Toggle header row"
      type="button"
    >
      <svg class="w-4 h-4" si-rectangle-horizontal-icon></svg>
    </button>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScEditorTableToggleHeaderRow {
  private readonly parent = inject(ScEditor);

  get editor() {
    return this.parent.editor;
  }

  toggleHeaderRow() {
    this.editor.chain().focus().toggleHeaderRow().run();
  }
}
