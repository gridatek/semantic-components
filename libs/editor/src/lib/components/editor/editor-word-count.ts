import { computed, Directive, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_EDITOR } from './editor';

@Directive({
  selector: 'span[scEditorWordCount]',
  exportAs: 'scEditorWordCount',
  host: {
    'data-slot': 'editor-word-count',
    '[class]': 'class()',
  },
})
export class ScEditorWordCount {
  readonly editor = inject(SC_EDITOR);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn('', this.classInput()));

  readonly wordCount = computed(() => {
    this.editor.contentVersion();
    const text = this.getPlainText().trim();
    if (!text) return 0;
    return text.split(/\s+/).filter(Boolean).length;
  });

  private getPlainText(): string {
    const editorInstance = this.editor.editorInstance();
    if (editorInstance) {
      return editorInstance.getText();
    }
    return this.editor.contentElement()?.textContent || '';
  }
}
