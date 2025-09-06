import { Dialog } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from '@angular/core';

import { ScToggle, ScTooltip } from '@semantic-components/ui';
import { SiLinkIcon } from '@semantic-icons/lucide-icons';

import { ScEditor } from '../../editor';
import { ScExtensions } from '../../extensions/extensions';
import { LinkData, ScEditorLinkInsertDialog } from './editor-link-insert-dialog';

@Component({
  selector: 'sc-editor-link-insert',
  imports: [ScToggle, ScTooltip, SiLinkIcon],
  template: `
    <button
      (click)="openDialog()"
      sc-toggle
      variant="outline"
      size="sm"
      scTooltip="Insert link"
      type="button"
    >
      <svg class="w-4 h-4" si-link-icon></svg>
    </button>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScEditorLinkInsert {
  private readonly parent = inject(ScEditor);
  private readonly dialog = inject(Dialog);
  private readonly extensions = inject(ScExtensions);

  constructor() {
    this.extensions.setLink.set(true);
  }

  get editor() {
    return this.parent.editor;
  }

  openDialog() {
    const dialogRef = this.dialog.open<LinkData>(ScEditorLinkInsertDialog, {
      minWidth: '600px',
    });

    dialogRef.closed.subscribe((result) => {
      if (result?.url) {
        this.editor.chain().focus().toggleLink({ href: result.url }).run();
      }
    });
  }
}
