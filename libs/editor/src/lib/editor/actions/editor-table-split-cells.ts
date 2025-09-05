import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from '@angular/core';

import { ScButton, ScTooltip } from '@semantic-components/ui';
import { SiSplitIcon } from '@semantic-icons/lucide-icons';

import { ScEditor } from '../editor';

@Component({
  selector: 'sc-editor-table-split-cells',
  imports: [ScButton, ScTooltip, SiSplitIcon],
  template: `
    <button
      (click)="splitCell()"
      sc-button
      variant="ghost"
      size="sm"
      scTooltip="Split cells"
      type="button"
    >
      <svg class="w-4 h-4" si-split-icon></svg>
    </button>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScEditorTableSplitCells {
  private readonly parent = inject(ScEditor);

  get editor() {
    return this.parent.editor;
  }

  splitCell() {
    this.editor.chain().focus().splitCell().run();
  }
}
