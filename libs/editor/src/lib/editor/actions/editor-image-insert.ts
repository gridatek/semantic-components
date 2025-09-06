import { Dialog } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from '@angular/core';

import { ScToggle, ScTooltip } from '@semantic-components/ui';
import { SiImagePlusIcon } from '@semantic-icons/lucide-icons';

import { ScEditor } from '../editor';
import { ScEditorExtensions } from '../editor-extensions';
import { ImageData, ScEditorImageInsertDialog } from './editor-image-insert-dialog';

@Component({
  selector: 'sc-editor-image-insert',
  imports: [ScToggle, ScTooltip, SiImagePlusIcon],
  template: `
    <button
      (click)="openDialog()"
      sc-toggle
      variant="outline"
      size="sm"
      scTooltip="Insert image"
      type="button"
    >
      <svg class="w-4 h-4" si-image-plus-icon></svg>
    </button>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScEditorImageInsert {
  private readonly parent = inject(ScEditor);
  private readonly dialog = inject(Dialog);
  private readonly extensions = inject(ScEditorExtensions);

  constructor() {
    this.extensions.image.set(true);
  }

  get editor() {
    return this.parent.editor;
  }

  setImage(image: ImageData | undefined) {
    if (image?.url) {
      this.editor
        .chain()
        .focus()
        .setImage({
          src: image.url,
          alt: image.alt ? image.alt : '',
          title: image.title ? image.title : '',
        })
        .run();
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open<ImageData>(ScEditorImageInsertDialog, {
      minWidth: '600px',
    });

    dialogRef.closed.subscribe((result) => {
      this.setImage(result);
    });
  }
}
