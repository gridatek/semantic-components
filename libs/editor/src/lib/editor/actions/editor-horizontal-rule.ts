import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from '@angular/core';

import { ScToggle, ScTooltip } from '@semantic-components/ui';
import { SiMinusIcon } from '@semantic-icons/lucide-icons';

import { ScEditor } from '../editor';
import { ScEditorExtensions } from '../editor-extensions';

@Component({
  selector: 'sc-editor-horizontal-rule',
  imports: [ScTooltip, ScToggle, SiMinusIcon],
  template: `
    <button
      [attr.aria-label]="ariaLabel"
      [scTooltip]="ariaLabel"
      (click)="setHorizontalRule()"
      sc-toggle
      variant="outline"
      type="button"
    >
      <svg si-minus-icon></svg>
      <span class="sr-only">{{ ariaLabel }}</span>
    </button>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScEditorHorizontalRule {
  ariaLabel = 'Toggle Horizontal Rule';

  private readonly parent = inject(ScEditor);

  extensions = inject(ScEditorExtensions);

  constructor() {
    this.extensions.horizontalRule.set(true);
  }

  get editor() {
    return this.parent.editor;
  }

  setHorizontalRule() {
    this.editor.chain().focus().setHorizontalRule().run();
  }
}
