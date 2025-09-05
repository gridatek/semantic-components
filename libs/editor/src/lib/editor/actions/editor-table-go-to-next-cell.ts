import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from '@angular/core';

import { ScButton, ScTooltip } from '@semantic-components/ui';
import { SiChevronRightIcon } from '@semantic-icons/lucide-icons';

import { ScEditor } from '../editor';

@Component({
  selector: 'sc-editor-table-go-to-next-cell',
  imports: [ScButton, ScTooltip, SiChevronRightIcon],
  template: `
    <button
      (click)="goToNextCell()"
      sc-button
      variant="ghost"
      size="sm"
      scTooltip="Next cell"
      type="button"
    >
      <svg class="w-4 h-4" si-chevron-right-icon></svg>
    </button>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScEditorTableGoToNextCell {
  private readonly parent = inject(ScEditor);

  get editor() {
    return this.parent.editor;
  }

  goToNextCell() {
    this.editor.chain().focus().goToNextCell().run();
  }
}
