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
  selector: 'span[sc-editor-char-count]',
  template: `
    {{ charCount() }} characters
  `,
  host: {
    'data-slot': 'editor-char-count',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScEditorCharCount {
  readonly editor = inject(SC_EDITOR);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn('', this.classInput()));

  protected readonly charCount = computed(() => {
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
