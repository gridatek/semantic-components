import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_EDITOR } from './editor';

/** The document's word count (`wordCount()`): write the text around it. */
@Directive({
  selector: 'span[scEditorWordCount]',
  exportAs: 'scEditorWordCount',
  host: {
    '[class]': 'class()',
  },
})
export class ScEditorWordCount {
  readonly editor = inject(SC_EDITOR);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn('', this.classInput()));

  readonly wordCount = computed(() => this.editor.words());
}
