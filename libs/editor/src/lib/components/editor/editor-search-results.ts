import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_EDITOR } from './editor';

/**
 * Where the search results are announced (`role="status"`). Write its text
 * from `editor.searchIndex()` and `searchResults()` — "2 of 5", "No results".
 * `data-state` is `none` when a search matches nothing (styled destructive).
 */
@Directive({
  selector: '[scEditorSearchResults]',
  host: {
    role: 'status',
    'data-slot': 'editor-search-results',
    '[attr.data-state]': 'state()',
    '[class]': 'class()',
  },
})
export class ScEditorSearchResults {
  protected readonly editor = inject(SC_EDITOR);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly state = computed(() => {
    if (!this.editor.searchTerm()) return 'idle';
    return this.editor.searchResults() ? 'found' : 'none';
  });

  protected readonly class = computed(() =>
    cn(
      'text-muted-foreground text-sm tabular-nums whitespace-nowrap data-[state=none]:text-destructive',
      this.classInput(),
    ),
  );
}
