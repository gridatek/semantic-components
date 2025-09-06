import { Dialog } from '@angular/cdk/dialog';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  inject,
  input,
} from '@angular/core';

import { ScToggle, ScTooltip } from '@semantic-components/ui';
import { SiFileCodeIcon } from '@semantic-icons/lucide-icons';

import { ScEditor } from '../../editor';
import { ScExtensions } from '../../extensions/extensions';
import { CodeBlockData, ScEditorCodeBlockDialog } from './editor-code-block-dialog';

@Component({
  selector: 'sc-editor-code-block',
  imports: [ScTooltip, SiFileCodeIcon, ScToggle],
  template: `
    <button
      [attr.aria-label]="ariaLabel()"
      [scTooltip]="ariaLabel()"
      (click)="toggleCodeBlock()"
      sc-toggle
      variant="outline"
      type="button"
    >
      <svg si-file-code-icon></svg>
      <span class="sr-only">{{ ariaLabel() }}</span>
    </button>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScEditorCodeBlock {
  readonly ariaLabel = input('Insert code block', {
    alias: 'aria-label',
  });

  private readonly parent = inject(ScEditor);
  private readonly extensions = inject(ScExtensions);
  private readonly dialog = inject(Dialog);

  constructor() {
    this.extensions.codeBlock.set(true);
  }

  private get editor() {
    return this.parent.editor;
  }

  protected toggleCodeBlock() {
    const dialogRef = this.dialog.open<CodeBlockData>(ScEditorCodeBlockDialog);

    dialogRef.closed.subscribe((result: CodeBlockData | undefined) => {
      if (result) {
        this.editor
          .chain()
          .focus()
          .insertContent({
            type: 'codeBlock',
            attrs: {
              language: result.language,
            },
            content: [
              {
                type: 'text',
                text: result.code,
              },
            ],
          })
          .run();
      }
    });
  }
}
