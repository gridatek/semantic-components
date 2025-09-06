import { Dialog } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from '@angular/core';

import { ScToggle, ScTooltip } from '@semantic-components/ui';
import { SiPaletteIcon } from '@semantic-icons/lucide-icons';

import { ScEditor } from '../../editor';
import { ScEditorExtensions } from '../../editor-extensions';
import { ColorData, ScEditorColorDialog } from './editor-color-dialog';

@Component({
  selector: 'sc-editor-color',
  imports: [ScToggle, ScTooltip, SiPaletteIcon],
  template: `
    <button
      (click)="openDialog()"
      sc-toggle
      variant="outline"
      size="sm"
      scTooltip="Text color"
      type="button"
    >
      <svg class="w-4 h-4" si-palette-icon></svg>
    </button>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScEditorColor {
  private readonly parent = inject(ScEditor);
  private readonly dialog = inject(Dialog);
  private readonly extensions = inject(ScEditorExtensions);

  constructor() {
    this.extensions.color.set(true);
  }

  get editor() {
    return this.parent.editor;
  }

  openDialog() {
    const dialogRef = this.dialog.open<ColorData>(ScEditorColorDialog, {
      minWidth: '400px',
    });

    dialogRef.closed.subscribe((result) => {
      if (result?.color) {
        this.editor.chain().focus().setColor(result.color).run();
      } else if (result?.color === null) {
        // Reset color
        this.editor.commands.unsetColor();
      }
    });
  }
}
