import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  inject,
  input,
} from '@angular/core';

import { ScToggle, ScTooltip } from '@semantic-components/ui';
import { SiBoldIcon } from '@semantic-icons/lucide-icons';

import { ScEditor } from '../editor';
import { ScExtensions } from '../extensions';

@Component({
  selector: 'sc-editor-bold',
  imports: [ScTooltip, ScToggle, SiBoldIcon],
  template: `
    <button
      [attr.aria-label]="ariaLabel()"
      [scTooltip]="ariaLabel()"
      (click)="toggleBold()"
      sc-toggle
      variant="outline"
      type="button"
    >
      <svg si-bold-icon></svg>
      <span class="sr-only">{{ ariaLabel() }}</span>
    </button>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScEditorBold {
  readonly ariaLabel = input('Toggle Bold', {
    alias: 'aria-label',
  });

  private readonly parent = inject(ScEditor);

  private readonly extensions = inject(ScExtensions);

  constructor() {
    this.extensions.bold.set(true);
  }

  private get editor() {
    return this.parent.editor;
  }

  protected toggleBold() {
    this.editor.chain().focus().toggleBold().run();
  }
}
