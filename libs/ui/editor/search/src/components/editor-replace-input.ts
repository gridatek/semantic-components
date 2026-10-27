import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_EDITOR } from '@semantic-components/ui/editor';
import { editorSearch } from './editor-search-state';

/**
 * What the matches are replaced with; Enter replaces the current match.
 * Use on an `input[scInput]` and name it. Read-only while the document is.
 */
@Directive({
  selector: 'input[scEditorReplaceInput]',
  host: {
    type: 'text',
    '[class]': 'class()',
    '[value]': 'search.replaceTerm()',
    '[readOnly]': '!search.editor.editable()',
    '(input)': 'onInput($event)',
    '(keydown.enter)': 'onEnter($event)',
  },
})
export class ScEditorReplaceInput {
  protected readonly search = editorSearch(inject(SC_EDITOR));
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn(this.classInput()));

  protected onInput(event: Event): void {
    this.search.setReplaceTerm((event.target as HTMLInputElement).value);
  }

  protected onEnter(event: Event): void {
    event.preventDefault();
    this.search.replace();
  }
}
