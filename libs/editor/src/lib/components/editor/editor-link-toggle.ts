import { Directive, computed, inject, input } from '@angular/core';
import { cn, toggleVariants } from '@semantic-components/ui';
import { SC_EDITOR } from './editor';

@Directive({
  selector: 'button[scEditorLinkToggle]',
  host: {
    'data-slot': 'editor-toggle',
    type: 'button',
    '[class]': 'class()',
    '[disabled]': 'disabled()',
    '(click)': 'onClick()',
  },
})
export class ScEditorLinkToggle {
  readonly editor = inject(SC_EDITOR);
  readonly classInput = input<string>('', { alias: 'class' });
  readonly disabledInput = input(false, { alias: 'disabled' });

  protected readonly class = computed(() =>
    cn(
      toggleVariants({ variant: 'default', size: 'default' }),
      this.classInput(),
    ),
  );

  protected readonly disabled = computed(
    () => this.disabledInput() || this.editor.disabled(),
  );

  onClick(): void {
    if (this.editor.disabled() || this.editor.readonly()) return;

    const selection = window.getSelection();
    const selectedText = selection?.toString() || '';

    const url = prompt('Enter URL:', 'https://');
    if (url) {
      if (selectedText) {
        this.editor.execCommand('createLink', url);
      } else {
        const linkText = prompt('Enter link text:', 'Link');
        if (linkText) {
          const link = `<a href="${url}" target="_blank" rel="noopener noreferrer">${linkText}</a>`;
          this.editor.execCommand('insertHTML', link);
        }
      }
    }
  }
}
