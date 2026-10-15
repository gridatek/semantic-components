import { Directive, computed, inject, input } from '@angular/core';
import { SC_EDITOR } from '@semantic-components/editor';
import { cn } from '@semantic-components/ui';
import { editorSearch } from './editor-search-state';

/**
 * Goes to the previous match (from the first, to the last). Use on a
 * `scButton`; write its icon and name it.
 */
@Directive({
  selector: 'button[scEditorSearchPrevious]',
  host: {
    type: 'button',
    '[class]': 'class()',
    '[disabled]': '!search.count()',
    '(click)': 'search.previous()',
  },
})
export class ScEditorSearchPrevious {
  protected readonly search = editorSearch(inject(SC_EDITOR));
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn(this.classInput()));
}
