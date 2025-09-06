import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from '@angular/core';

import { ScToggle } from '@semantic-components/ui';
import { ScTooltip } from '@semantic-components/ui';
import { SiAlignLeftIcon } from '@semantic-icons/lucide-icons';

import { ScEditor } from '../editor';
import { ScEditorExtensions } from '../editor-extensions';

@Component({
  selector: 'sc-editor-text-align-left',
  imports: [ScTooltip, SiAlignLeftIcon, ScToggle],
  template: `
    <button
      [attr.aria-label]="ariaLabel"
      [scTooltip]="ariaLabel"
      (click)="setLeftAlign()"
      type="button"
      sc-toggle
      variant="outline"
    >
      <svg si-align-left-icon></svg>
      <span class="sr-only">{{ ariaLabel }}</span>
    </button>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScEditorTextAlignLeft {
  ariaLabel = 'Align left';

  private readonly parent = inject(ScEditor);

  extensions = inject(ScEditorExtensions);

  constructor() {
    this.extensions.textAlignLeft.set(true);
  }

  get editor() {
    return this.parent.editor;
  }

  setLeftAlign() {
    this.editor.chain().focus().setTextAlign('left').run();
  }
}
