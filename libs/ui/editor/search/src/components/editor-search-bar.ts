import {
  DestroyRef,
  Directive,
  computed,
  effect,
  inject,
  input,
  untracked,
} from '@angular/core';
import { ScCollapsible } from '@semantic-components/ui';
import {
  SC_EDITOR,
  ɵassertEditorFeature,
} from '@semantic-components/ui/editor';
import { cn } from 'cn';
import { editorSearch } from './editor-search-state';

/**
 * The search bar, in a collapsible's panel (`scCollapsible` around it, its
 * trigger anywhere: `[scCollapsibleTrigger]="search"` in the toolbar).
 * Holds the search and replace inputs, their buttons and the results. Opening
 * it — the trigger, or Ctrl / ⌘ + F in the document — puts focus in the
 * search; Escape closes it and goes back to the text; closed, its matches are
 * cleared. A `search` landmark: name it. Needs `withSearch()`.
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

  protected readonly class = computed(() => cn(this.classInput()));

  constructor() {
    ɵassertEditorFeature('withSearch', 'scEditorSearchBar');
    const collapsible = inject(ScCollapsible, { optional: true });
    if (!collapsible) {
      if (typeof ngDevMode !== 'undefined' && ngDevMode)
        console.warn('scEditorSearchBar goes in a scCollapsible (its panel).');
      return;
    }
    inject(DestroyRef).onDestroy(this.search.register(collapsible));
    // Opened (by its trigger too): focus in the search. Closed: cleared.
    let wasOpen = collapsible.open();
    effect(() => {
      const open = collapsible.open();
      if (open === wasOpen) return;
      wasOpen = open;
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
