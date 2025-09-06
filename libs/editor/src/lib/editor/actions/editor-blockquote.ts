import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  inject,
  input,
} from '@angular/core';

import { ScToggle, ScTooltip } from '@semantic-components/ui';
import { SiQuoteIcon } from '@semantic-icons/lucide-icons';

import { ScEditor } from '../editor';
import { ScExtensions } from '../extensions';

@Component({
  selector: 'sc-editor-blockquote',
  imports: [ScTooltip, ScToggle, SiQuoteIcon],
  template: `
    <button
      [attr.aria-label]="ariaLabel()"
      [scTooltip]="ariaLabel()"
      (click)="toggleBlockquote()"
      sc-toggle
      variant="outline"
      type="button"
    >
      <svg si-quote-icon></svg>
      <span class="sr-only">{{ ariaLabel() }}</span>
    </button>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScEditorBlockquote {
  readonly ariaLabel = input('Toggle blockquote', {
    alias: 'aria-label',
  });

  private readonly parent = inject(ScEditor);

  private readonly extensions = inject(ScExtensions);

  constructor() {
    this.extensions.blockquote.set(true);
  }

  private get editor() {
    return this.parent.editor;
  }

  protected toggleBlockquote() {
    this.editor.chain().focus().toggleBlockquote().run();
  }
}
