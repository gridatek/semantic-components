import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from '@angular/core';

import { ScToggle, ScTooltip } from '@semantic-components/ui';
import { SiBetweenVerticalEndIcon } from '@semantic-icons/lucide-icons';

import { ScEditor } from '../../editor';

@Component({
  selector: 'sc-editor-table-add-column-before',
  imports: [ScToggle, ScTooltip, SiBetweenVerticalEndIcon],
  template: `
    <button
      (click)="addColumnBefore()"
      sc-toggle
      variant="outline"
      size="sm"
      scTooltip="Add column before"
      type="button"
    >
      <svg class="w-4 h-4" si-between-vertical-end-icon></svg>
    </button>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScEditorTableAddColumnBefore {
  private readonly parent = inject(ScEditor);

  get editor() {
    return this.parent.editor;
  }

  addColumnBefore() {
    this.editor.chain().focus().addColumnBefore().run();
  }
}
