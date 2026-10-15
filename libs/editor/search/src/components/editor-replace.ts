import { Directive, computed, inject, input } from '@angular/core';
import { SC_EDITOR } from '@semantic-components/editor';
import { cn } from '@semantic-components/ui';
import { editorSearch } from './editor-search-state';

/**
 * Replaces the current match and goes to the next one (disabled with no
 * match, or when the document can't be edited). Use on a `scButton`; write
 * its text.
 */
@Directive({
  selector: 'button[scEditorReplace]',
  host: {
    type: 'button',
    '[class]': 'class()',
    '[disabled]': '!search.editor.editable() || !search.count()',
    '(click)': 'search.replace()',
  },
})
export class ScEditorReplace {
  protected readonly search = editorSearch(inject(SC_EDITOR));
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn(this.classInput()));
}
