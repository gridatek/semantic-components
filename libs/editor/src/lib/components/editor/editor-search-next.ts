import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_EDITOR } from './editor';

/**
 * Goes to the next match (from the last, to the first). Use on a
 * `scButton`; write its icon and name it.
 */
@Directive({
  selector: 'button[scEditorSearchNext]',
  host: {
    type: 'button',
    '[class]': 'class()',
    '[disabled]': '!editor.searchResults()',
    '(click)': 'editor.searchNext()',
  },
})
export class ScEditorSearchNext {
  protected readonly editor = inject(SC_EDITOR);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn(this.classInput()));
}
