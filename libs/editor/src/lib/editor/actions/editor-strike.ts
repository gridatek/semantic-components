import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from '@angular/core';

import { ScToggle } from '@semantic-components/ui';
import { ScTooltip } from '@semantic-components/ui';
import { SiStrikethroughIcon } from '@semantic-icons/lucide-icons';

import { ScEditor } from '../editor';
import { ScExtensions } from '../extensions';

@Component({
  selector: 'sc-editor-strike',
  imports: [ScTooltip, SiStrikethroughIcon, ScToggle],
  template: `
    <button
      [attr.aria-label]="ariaLabel"
      [scTooltip]="ariaLabel"
      (click)="toggleStrike()"
      sc-toggle
      variant="outline"
      type="button"
    >
      <svg si-strikethrough-icon></svg>
      <span class="sr-only">{{ ariaLabel }}</span>
    </button>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScEditorStrike {
  ariaLabel = 'Toggle Strike';

  private readonly parent = inject(ScEditor);

  extensions = inject(ScExtensions);

  constructor() {
    this.extensions.strike.set(true);
  }

  get editor() {
    return this.parent.editor;
  }

  toggleStrike() {
    this.editor.chain().focus().toggleStrike().run();
  }
}
