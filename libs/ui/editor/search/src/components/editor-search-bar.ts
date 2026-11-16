import {
  DestroyRef,
  Directive,
  computed,
  effect,
  inject,
  input,
  model,
  untracked,
} from '@angular/core';
import {
  SC_EDITOR,
  ɵassertEditorFeature,
} from '@semantic-components/ui/editor';
import { cn } from 'cn';
import { editorSearch } from './editor-search-state';

/**
 * The search bar: the search and replace inputs, their buttons and the
 * results. Whether it is open is yours: `[(open)]`, bound to the same signal
 * as what shows it (a collapsible, a popover…). Opened — by you, or Ctrl / ⌘ +
 * F in the document — focus in the search; Escape or `scEditorSearchClose`
 * close it and go back to the text; closed, its matches are cleared. A
 * `search` landmark: name it. Needs `withSearch()`.
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
  /** Whether it is open: bind the signal that shows it. */
  readonly open = model(false);

  protected readonly class = computed(() => cn(this.classInput()));

  constructor() {
    ɵassertEditorFeature('withSearch', 'scEditorSearchBar');
    inject(DestroyRef).onDestroy(this.search.register(this.open));
    // Opened: focus in the search. Closed: cleared. Not its first value.
    let first = true;
    effect(() => {
      const open = this.open();
      if (first) {
        first = false;
        return;
      }
      untracked(() =>
        open
          ? this.search.focusRequest.update((n) => n + 1)
          : this.search.clear(),
      );
    });
  }

  protected onEscape(event: Event): void {
    event.preventDefault();
    this.search.close();
  }
}
