import { Directive, computed, inject, input } from '@angular/core';
import { SC_EDITOR } from '@semantic-components/editor';
import { cn } from '@semantic-components/ui';
import { editorSearch } from './editor-search-state';

/**
 * Where the search results are announced (`role="status"`). Write its text
 * from `index()` and `count()` (`#results="scEditorSearchResults"`) — "2 of
 * 5", "No results".
 * `data-state` is `none` when a search matches nothing (styled destructive).
 */
@Directive({
  selector: '[scEditorSearchResults]',
  exportAs: 'scEditorSearchResults',
  host: {
    role: 'status',
    'data-slot': 'editor-search-results',
    '[attr.data-state]': 'state()',
    '[class]': 'class()',
  },
})
export class ScEditorSearchResults {
  protected readonly search = editorSearch(inject(SC_EDITOR));
  readonly classInput = input<string>('', { alias: 'class' });

  /** How many matches there are. */
  readonly count = computed(() => this.search.count());
  /** The current match (from 0), or null. */
  readonly index = computed(() => this.search.index());

  /** `idle` (no search), `found` or `none`. */
  readonly state = computed(() => {
    if (!this.search.term()) return 'idle';
    return this.count() ? 'found' : 'none';
  });

  protected readonly class = computed(() =>
    cn(
      'text-muted-foreground text-sm tabular-nums whitespace-nowrap data-[state=none]:text-destructive',
      this.classInput(),
    ),
  );
}
