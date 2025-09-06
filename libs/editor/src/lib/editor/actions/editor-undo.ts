import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from '@angular/core';

import { ScToggle, ScTooltip } from '@semantic-components/ui';
import { SiUndoIcon } from '@semantic-icons/lucide-icons';

import { ScEditor } from '../editor';
import { ScEditorExtensions } from '../editor-extensions';

@Component({
  selector: 'sc-editor-undo',
  imports: [ScTooltip, ScToggle, SiUndoIcon],
  template: `
    <button
      [attr.aria-label]="ariaLabel"
      [scTooltip]="ariaLabel"
      (click)="undo()"
      sc-toggle
      variant="outline"
      type="button"
    >
      <svg si-undo-icon></svg>
      <span class="sr-only">{{ ariaLabel }}</span>
    </button>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScEditorUndo {
  ariaLabel = 'Undo';

  private readonly parent = inject(ScEditor);

  extensions = inject(ScEditorExtensions);

  constructor() {
    this.extensions.undo.set(true);
  }

  get editor() {
    return this.parent.editor;
  }

  undo() {
    this.editor.chain().focus().undo().run();
  }
}
