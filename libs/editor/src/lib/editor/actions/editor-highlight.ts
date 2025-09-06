import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from '@angular/core';

import { ScToggle, ScTooltip } from '@semantic-components/ui';
import { SiHighlighterIcon } from '@semantic-icons/lucide-icons';

import { ScEditor } from '../editor';
import { ScExtensions } from '../extensions';

@Component({
  selector: 'sc-editor-highlight',
  imports: [ScTooltip, ScToggle, SiHighlighterIcon],
  template: `
    <button
      [attr.aria-label]="ariaLabel"
      [scTooltip]="ariaLabel"
      (click)="toggleHighlight()"
      sc-toggle
      variant="outline"
      type="button"
    >
      <svg si-highlighter-icon></svg>
      <span class="sr-only">{{ ariaLabel }}</span>
    </button>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScEditorHighlight {
  ariaLabel = 'Toggle Highlight';

  private readonly parent = inject(ScEditor);

  extensions = inject(ScExtensions);

  constructor() {
    this.extensions.highlight.set(true);
  }

  get editor() {
    return this.parent.editor;
  }

  toggleHighlight() {
    this.editor.chain().focus().toggleHighlight().run();
  }
}
