import { Directive, computed, inject, input } from '@angular/core';
import { SC_EDITOR } from '@semantic-components/editor';
import { cn } from '@semantic-components/ui';
import { editorSearch } from './editor-search-state';

/**
 * Replaces every match at once — one change, undone in one step (disabled
 * with no match, or when the document can't be edited). Use on a
 * `scButton`; write its text.
 */
@Directive({
  selector: 'button[scEditorReplaceAll]',
  host: {
    type: 'button',
    '[class]': 'class()',
    '[disabled]': '!search.editor.editable() || !search.count()',
    '(click)': 'search.replaceAll()',
  },
})
export class ScEditorReplaceAll {
  protected readonly search = editorSearch(inject(SC_EDITOR));
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn(this.classInput()));
}
