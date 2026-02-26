import { computed, Directive, inject, input } from '@angular/core';
import { buttonVariants, cn } from '@semantic-components/ui';
import { SC_EDITOR } from './editor';

@Directive({
  selector: 'button[scEditorCode]',
  host: {
    'data-slot': 'editor-code',
    type: 'button',
    '[class]': 'class()',
    '[disabled]': 'editor.disabled()',
    '[attr.aria-disabled]': 'editor.disabled() || null',
    '[attr.title]': '"Inline code"',
    '(click)': 'onClick()',
  },
})
export class ScEditorCodeButton {
  readonly editor = inject(SC_EDITOR);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(buttonVariants({ variant: 'ghost', size: 'icon' }), this.classInput()),
  );

  onClick(): void {
    if (this.editor.disabled() || this.editor.readonly()) return;

    const selection = window.getSelection();
    const selectedText = selection?.toString() || '';

    if (selectedText) {
      const code = `<code>${selectedText}</code>`;
      this.editor.execCommand('insertHTML', code);
    } else {
      this.editor.execCommand('insertHTML', '<code>&nbsp;</code>');
    }
  }
}
