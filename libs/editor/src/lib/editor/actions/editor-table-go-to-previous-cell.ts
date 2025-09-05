import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from '@angular/core';

import { ScButton, ScTooltip } from '@semantic-components/ui';
import { SiChevronLeftIcon } from '@semantic-icons/lucide-icons';

import { ScEditor } from '../editor';

@Component({
  selector: 'sc-editor-table-go-to-previous-cell',
  imports: [ScButton, ScTooltip, SiChevronLeftIcon],
  template: `
    <button
      (click)="goToPreviousCell()"
      sc-button
      variant="ghost"
      size="sm"
      scTooltip="Previous cell"
      type="button"
    >
      <svg class="w-4 h-4" si-chevron-left-icon></svg>
    </button>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScEditorTableGoToPreviousCell {
  private readonly parent = inject(ScEditor);

  get editor() {
    return this.parent.editor;
  }

  goToPreviousCell() {
    this.editor.chain().focus().goToPreviousCell().run();
  }
}
