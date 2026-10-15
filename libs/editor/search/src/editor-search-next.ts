import { Directive, computed, inject, input } from '@angular/core';
import { SC_EDITOR } from '@semantic-components/editor';
import { cn } from '@semantic-components/ui';
import { editorSearch } from './editor-search-state';

/**
 * Goes to the next match (from the last, to the first). Use on a
 * `scButton`; write its icon and name it.
 */
@Directive({
  selector: 'button[scEditorSearchNext]',
  host: {
    type: 'button',
    '[class]': 'class()',
    '[disabled]': '!search.count()',
    '(click)': 'search.next()',
  },
})
export class ScEditorSearchNext {
  protected readonly search = editorSearch(inject(SC_EDITOR));
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn(this.classInput()));
}
