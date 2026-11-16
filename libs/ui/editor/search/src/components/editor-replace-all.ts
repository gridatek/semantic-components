import { Directive, computed, inject, input } from '@angular/core';
import { SC_EDITOR, ɵeditorControl } from '@semantic-components/ui/editor';
import { cn } from 'cn';
import { editorSearch } from './editor-search-state';

/**
 * Replaces every match at once — one change, undone in one step (disabled
 * with no match, or when the document can't be edited). Write its
 * text.
 */
@Directive({
  selector: 'button[scEditorReplaceAll]',
  host: {
    type: 'button',
    '[class]': 'class()',
    '(click)': 'search.replaceAll()',
  },
})
export class ScEditorReplaceAll {
  protected readonly search = editorSearch(inject(SC_EDITOR));
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn(this.classInput()));
  protected readonly disabled = computed(
    () => !this.search.editor.editable() || !this.search.count(),
  );

  constructor() {
    ɵeditorControl({ disabled: this.disabled });
  }
}
