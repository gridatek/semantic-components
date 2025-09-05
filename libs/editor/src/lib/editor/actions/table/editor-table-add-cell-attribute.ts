import { Dialog } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from '@angular/core';

import { ScButton, ScTooltip } from '@semantic-components/ui';
import { SiSettingsIcon } from '@semantic-icons/lucide-icons';

import { ScEditor } from '../../editor';
import { AttributeData, ScAddCellAttributeDialog } from '../../toolbar/add-cell-attribute-dialog';

@Component({
  selector: 'sc-editor-table-add-cell-attribute',
  imports: [ScButton, ScTooltip, SiSettingsIcon],
  template: `
    <button
      (click)="openDialog()"
      sc-button
      variant="ghost"
      size="sm"
      scTooltip="Add cell attribute"
      type="button"
    >
      <svg class="w-4 h-4" si-settings-icon></svg>
    </button>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScEditorTableAddCellAttribute {
  private readonly parent = inject(ScEditor);
  private readonly dialog = inject(Dialog);

  get editor() {
    return this.parent.editor;
  }

  openDialog() {
    const dialogRef = this.dialog.open<AttributeData>(ScAddCellAttributeDialog, {
      minWidth: '600px',
    });

    dialogRef.closed.subscribe((result) => {
      this.editor.commands.setCellAttribute(result?.name ?? '', result?.value ?? '');
    });
  }
}
