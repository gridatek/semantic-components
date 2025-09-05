import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from '@angular/core';

import { ScToggle, ScTooltip } from '@semantic-components/ui';
import { SiBetweenHorizontalStartIcon, SiPlusIcon } from '@semantic-icons/lucide-icons';

import { ScEditor } from '../../editor';

@Component({
  selector: 'sc-editor-table-add-row',
  imports: [ScToggle, ScTooltip, SiBetweenHorizontalStartIcon],
  template: `
    <button
      (click)="addRowAfter()"
      sc-toggle
      variant="outline"
      size="sm"
      scTooltip="Add row below"
      type="button"
    >
      <svg class="w-4 h-4" si-between-horizontal-start-icon></svg>
    </button>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScEditorTableAddRow {
  private readonly parent = inject(ScEditor);

  get editor() {
    return this.parent.editor;
  }

  addRowAfter() {
    this.editor.chain().focus().addRowAfter().run();
  }
}
