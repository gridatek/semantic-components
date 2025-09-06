import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from '@angular/core';

import { ScToggle } from '@semantic-components/ui';
import { ScTooltip } from '@semantic-components/ui';
import { SiUnderlineIcon } from '@semantic-icons/lucide-icons';

import { ScEditor } from '../editor';
import { ScEditorExtensions } from '../editor-extensions';

@Component({
  selector: 'sc-editor-underline',
  imports: [ScTooltip, SiUnderlineIcon, ScToggle],
  template: `
    <button
      [attr.aria-label]="ariaLabel"
      [scTooltip]="ariaLabel"
      (click)="toggleUnderline()"
      sc-toggle
      variant="outline"
      type="button"
    >
      <svg si-underline-icon></svg>
      <span class="sr-only">{{ ariaLabel }}</span>
    </button>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScEditorUnderline {
  ariaLabel = 'Toggle underline';

  private readonly parent = inject(ScEditor);

  extensions = inject(ScEditorExtensions);

  constructor() {
    this.extensions.underline.set(true);
  }

  get editor() {
    return this.parent.editor;
  }

  toggleUnderline() {
    this.editor.chain().focus().toggleUnderline().run();
  }
}
