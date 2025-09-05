import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from '@angular/core';

import { ScToggle, ScTooltip } from '@semantic-components/ui';
import { SiBetweenHorizontalEndIcon } from '@semantic-icons/lucide-icons';

import { ScEditor } from '../../editor';

@Component({
  selector: 'sc-editor-table-add-row-before',
  imports: [ScToggle, ScTooltip, SiBetweenHorizontalEndIcon],
  template: `
    <button
      (click)="addRowBefore()"
      sc-toggle
      variant="outline"
      size="sm"
      scTooltip="Add row before"
      type="button"
    >
      <svg class="w-4 h-4" si-between-horizontal-end-icon></svg>
    </button>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScEditorTableAddRowBefore {
  private readonly parent = inject(ScEditor);

  get editor() {
    return this.parent.editor;
  }

  addRowBefore() {
    this.editor.chain().focus().addRowBefore().run();
  }
}
