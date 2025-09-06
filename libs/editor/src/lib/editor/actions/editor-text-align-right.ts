import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from '@angular/core';

import { ScToggle } from '@semantic-components/ui';
import { ScTooltip } from '@semantic-components/ui';
import { SiAlignRightIcon } from '@semantic-icons/lucide-icons';

import { ScEditor } from '../editor';
import { ScExtensions } from '../extensions';

@Component({
  selector: 'sc-editor-text-align-right',
  imports: [ScTooltip, SiAlignRightIcon, ScToggle],
  template: `
    <button
      [attr.aria-label]="ariaLabel"
      [scTooltip]="ariaLabel"
      (click)="setRightAlign()"
      type="button"
      sc-toggle
      variant="outline"
    >
      <svg si-align-right-icon></svg>
      <span class="sr-only">{{ ariaLabel }}</span>
    </button>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScEditorTextAlignRight {
  ariaLabel = 'Align right';

  private readonly parent = inject(ScEditor);

  extensions = inject(ScExtensions);

  constructor() {
    this.extensions.textAlignRight.set(true);
  }

  get editor() {
    return this.parent.editor;
  }

  setRightAlign() {
    this.editor.chain().focus().setTextAlign('right').run();
  }
}
