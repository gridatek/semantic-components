import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from '@angular/core';

import { ScToggle, ScTooltip } from '@semantic-components/ui';
import { SiListOrderedIcon } from '@semantic-icons/lucide-icons';

import { ScEditor } from '../editor';
import { ScExtensions } from '../extensions';

@Component({
  selector: 'sc-editor-ordered-list',
  imports: [ScTooltip, ScToggle, SiListOrderedIcon],
  template: `
    <button
      [attr.aria-label]="ariaLabel"
      [scTooltip]="ariaLabel"
      (click)="toggleOrderedList()"
      type="button"
      sc-toggle
      variant="outline"
    >
      <svg si-list-ordered-icon></svg>
      <span class="sr-only">{{ ariaLabel }}</span>
    </button>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScEditorOrderedList {
  ariaLabel = 'Toggle ordered list';

  private readonly parent = inject(ScEditor);

  extensions = inject(ScExtensions);

  constructor() {
    this.extensions.orderedList.set(true);
  }

  private get editor() {
    return this.parent.editor;
  }

  protected toggleOrderedList() {
    this.editor.chain().focus().toggleOrderedList().run();
  }
}
