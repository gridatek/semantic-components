import { computed, Directive, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_EDITOR } from './editor';

@Directive({
  selector: 'span[scEditorCharCount]',
  exportAs: 'scEditorCharCount',
  host: {
    'data-slot': 'editor-char-count',
    '[class]': 'class()',
  },
})
export class ScEditorCharCount {
  readonly editor = inject(SC_EDITOR);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn('', this.classInput()));

  readonly charCount = computed(() => {
    this.editor.contentVersion();
    const text = this.getPlainText();
    return text.length;
  });

  private getPlainText(): string {
    const editorInstance = this.editor.editorInstance();
    if (editorInstance) {
      return editorInstance.getText();
    }
    return this.editor.contentElement()?.textContent || '';
  }
}
