import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_EDITOR } from './editor';

/**
 * Closes the search bar, clears its matches, and goes back to the text (as
 * Escape does). Use on a `scButton`; write its icon and name it.
 */
@Directive({
  selector: 'button[scEditorSearchClose]',
  host: {
    type: 'button',
    '[class]': 'class()',
    '(click)': 'editor.closeSearch()',
  },
})
export class ScEditorSearchClose {
  protected readonly editor = inject(SC_EDITOR);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn(this.classInput()));
}
