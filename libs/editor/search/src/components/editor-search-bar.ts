import { Directive, computed, inject, input } from '@angular/core';
import { SC_EDITOR, assertEditorFeature } from '@semantic-components/editor';
import { cn } from '@semantic-components/ui';
import { editorSearch } from './editor-search-state';

/**
 * The search bar, below the toolbar: show it with `scEditorSearch`'s
 * `open()`.
 * Holds the search and replace inputs, their buttons and the results; Escape
 * closes it and goes back to the text. A `search` landmark: name it. Needs
 * `withSearch()`.
 */
@Directive({
  selector: 'div[scEditorSearchBar]',
  host: {
    role: 'search',
    'data-slot': 'editor-search-bar',
    '[class]': 'class()',
    '(keydown.escape)': 'onEscape($event)',
  },
})
export class ScEditorSearchBar {
  private readonly search = editorSearch(inject(SC_EDITOR));
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'flex flex-wrap items-center gap-x-2 gap-y-1.5 border-b bg-muted/30 px-2 py-1.5',
      this.classInput(),
    ),
  );

  constructor() {
    assertEditorFeature('withSearch', 'scEditorSearchBar');
  }

  protected onEscape(event: Event): void {
    event.preventDefault();
    this.search.close();
  }
}
