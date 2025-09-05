import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from '@angular/core';

import { ScToggle, ScTooltip } from '@semantic-components/ui';
import { SiWrenchIcon } from '@semantic-icons/lucide-icons';

import { ScEditor } from '../../editor';

@Component({
  selector: 'sc-editor-table-fix',
  imports: [ScToggle, ScTooltip, SiWrenchIcon],
  template: `
    <button
      (click)="fixTables()"
      sc-toggle
      variant="outline"
      size="sm"
      scTooltip="Fix table structure"
      type="button"
    >
      <svg class="w-4 h-4" si-wrench-icon></svg>
    </button>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScEditorTableFix {
  private readonly parent = inject(ScEditor);

  get editor() {
    return this.parent.editor;
  }

  fixTables() {
    this.editor.commands.fixTables();
  }
}
