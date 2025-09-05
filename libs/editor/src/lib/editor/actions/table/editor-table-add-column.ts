import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from '@angular/core';

import { ScButton, ScTooltip } from '@semantic-components/ui';
import { SiBetweenVerticalStartIcon, SiPlusIcon } from '@semantic-icons/lucide-icons';

import { ScEditor } from '../../editor';

@Component({
  selector: 'sc-editor-table-add-column',
  imports: [ScButton, ScTooltip, SiBetweenVerticalStartIcon],
  template: `
    <button
      (click)="addColumnAfter()"
      sc-button
      variant="ghost"
      size="sm"
      scTooltip="Add column after"
      type="button"
    >
      <svg class="w-4 h-4" si-between-vertical-start-icon></svg>
    </button>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScEditorTableAddColumn {
  private readonly parent = inject(ScEditor);

  get editor() {
    return this.parent.editor;
  }

  addColumnAfter() {
    this.editor.chain().focus().addColumnAfter().run();
  }
}
