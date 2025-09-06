import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from '@angular/core';

import { ScToggle, ScTooltip } from '@semantic-components/ui';
import { SiItalicIcon } from '@semantic-icons/lucide-icons';

import { ScEditor } from '../editor';
import { ScExtensions } from '../extensions';

@Component({
  selector: 'sc-editor-italic',
  imports: [ScTooltip, ScToggle, SiItalicIcon],
  template: `
    <button
      [attr.aria-label]="ariaLabel"
      [scTooltip]="ariaLabel"
      (click)="toggleItalic()"
      type="button"
      sc-toggle
      variant="outline"
    >
      <svg si-italic-icon></svg>
      <span class="sr-only">{{ ariaLabel }}</span>
    </button>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScEditorItalic {
  ariaLabel = 'Toggle Italic';

  private readonly parent = inject(ScEditor);

  extensions = inject(ScExtensions);

  constructor() {
    this.extensions.italic.set(true);
  }

  private get editor() {
    return this.parent.editor;
  }

  protected toggleItalic() {
    this.editor.chain().focus().toggleItalic().run();
  }
}
