import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_EDITOR } from './editor';

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
    '[disabled]': '!editor.editable() || !editor.searchResults()',
    '(click)': 'editor.replace()',
  },
})
export class ScEditorReplace {
  protected readonly editor = inject(SC_EDITOR);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn(this.classInput()));
}
