import { Dialog } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from '@angular/core';

import { ScToggle, ScTooltip } from '@semantic-components/ui';
import { SiUnlinkIcon } from '@semantic-icons/lucide-icons';

import { ScEditor } from '../../editor';
import { ScEditorExtensions } from '../../editor-extensions';

@Component({
  selector: 'sc-editor-link-remove',
  imports: [ScTooltip, ScToggle, SiUnlinkIcon],
  template: `
    <button
      [attr.aria-label]="ariaLabel"
      [scTooltip]="ariaLabel"
      (click)="unsetLink()"
      sc-toggle
      variant="outline"
      size="sm"
      type="button"
    >
      <svg class="w-4 h-4" si-unlink-icon></svg>
      <span class="sr-only">{{ ariaLabel }}</span>
    </button>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScEditorLinkRemove {
  ariaLabel = 'Remove Link';

  private readonly parent = inject(ScEditor);
  private readonly dialog = inject(Dialog);
  private readonly extensions = inject(ScEditorExtensions);

  constructor() {
    this.extensions.unsetLink.set(true);
  }

  get editor() {
    return this.parent.editor;
  }

  unsetLink() {
    this.editor.chain().focus().unsetLink().run();
  }
}
