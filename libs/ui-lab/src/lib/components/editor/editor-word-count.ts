import {
  Component,
  ChangeDetectionStrategy,
  computed,
  input,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';
import { SC_EDITOR } from './editor';

@Component({
  selector: 'span[sc-editor-word-count]',
  template: `
    {{ wordCount() }} words
  `,
  host: {
    'data-slot': 'editor-word-count',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScEditorWordCount {
  readonly editor = inject(SC_EDITOR);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn('', this.classInput()));

  protected readonly wordCount = computed(() => {
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
