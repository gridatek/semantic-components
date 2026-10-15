import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_EDITOR } from './editor';

/**
 * Goes to the previous match (from the first, to the last). Use on a
 * `scButton`; write its icon and name it.
 */
@Directive({
  selector: 'button[scEditorSearchPrevious]',
  host: {
    type: 'button',
    '[class]': 'class()',
    '[disabled]': '!editor.searchResults()',
    '(click)': 'editor.searchPrevious()',
  },
})
export class ScEditorSearchPrevious {
  protected readonly editor = inject(SC_EDITOR);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn(this.classInput()));
}
