import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from '@angular/core';

import { ScToggle, ScTooltip } from '@semantic-components/ui';
import { SiListIcon } from '@semantic-icons/lucide-icons';

import { ScEditor } from '../editor';
import { ScEditorExtensions } from '../editor-extensions';

@Component({
  selector: 'sc-editor-bullet-list',
  imports: [ScTooltip, ScToggle, SiListIcon],
  template: `
    <button
      [attr.aria-label]="ariaLabel"
      [scTooltip]="ariaLabel"
      (click)="toggleBulletList()"
      sc-toggle
      variant="outline"
      type="button"
    >
      <svg si-list-icon></svg>
      <span class="sr-only">{{ ariaLabel }}</span>
    </button>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScEditorBulletList {
  ariaLabel = 'Toggle List';

  private readonly parent = inject(ScEditor);

  extensions = inject(ScEditorExtensions);

  constructor() {
    this.extensions.bulletList.set(true);
  }

  private get editor() {
    return this.parent.editor;
  }

  protected toggleBulletList() {
    this.editor.chain().focus().toggleBulletList().run();
  }
}
