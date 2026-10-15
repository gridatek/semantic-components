import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_EDITOR } from './editor';

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
    '[disabled]': '!editor.editable() || !editor.searchResults()',
    '(click)': 'editor.replaceAll()',
  },
})
export class ScEditorReplaceAll {
  protected readonly editor = inject(SC_EDITOR);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn(this.classInput()));
}
