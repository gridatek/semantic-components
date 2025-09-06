import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from '@angular/core';

import { ScToggle } from '@semantic-components/ui';
import { ScTooltip } from '@semantic-components/ui';
import { SiRedoIcon } from '@semantic-icons/lucide-icons';

import { ScEditor } from '../editor';
import { ScEditorExtensions } from '../editor-extensions';

@Component({
  selector: 'sc-editor-redo',
  imports: [ScTooltip, ScToggle, SiRedoIcon],
  template: `
    <button
      [attr.aria-label]="ariaLabel"
      [scTooltip]="ariaLabel"
      (click)="redo()"
      sc-toggle
      variant="outline"
      type="button"
    >
      <svg si-redo-icon></svg>
      <span class="sr-only">{{ ariaLabel }}</span>
    </button>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScEditorRedo {
  ariaLabel = 'Redo';

  private readonly parent = inject(ScEditor);

  extensions = inject(ScEditorExtensions);

  constructor() {
    this.extensions.redo.set(true);
  }

  get editor() {
    return this.parent.editor;
  }

  redo() {
    this.editor.chain().focus().redo().run();
  }
}
