import { ToolbarWidget } from '@angular/aria/toolbar';
import { DestroyRef, Directive, computed, inject, input } from '@angular/core';
import { SC_EDITOR, ɵassertEditorFeature } from '@semantic-components/editor';
import { bindInput, cn, toggleVariants } from '@semantic-components/ui';
import { editorSearch } from './editor-search-state';

/**
 * Opens and closes the search bar (`open()`, with
 * `#search="scEditorSearch"` — show your `scEditorSearchBar` with it); with
 * it in the toolbar, Ctrl / ⌘ + F in the document opens the bar too. Write
 * its icon and name it. Needs `withSearch()`.
 */
@Directive({
  selector: 'button[scEditorSearch]',
  exportAs: 'scEditorSearch',
  hostDirectives: [ToolbarWidget],
  host: {
    type: 'button',
    '[class]': 'class()',
    '[disabled]': 'disabled()',
    '[attr.aria-pressed]': 'open()',
    '(click)': 'search.toggle()',
  },
})
export class ScEditorSearch {
  private readonly editor = inject(SC_EDITOR);
  private readonly search = editorSearch(this.editor);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly disabledInput = input(false, { alias: 'disabled' });

  /** Whether the search bar is open. */
  readonly open = this.search.open.asReadonly();

  protected readonly class = computed(() =>
    cn(
      toggleVariants({ variant: 'default', size: 'default' }),
      this.classInput(),
    ),
  );

  // Searching doesn't change the document: read-only can search too.
  protected readonly disabled = computed(
    () => this.disabledInput() || this.editor.disabled(),
  );

  constructor() {
    bindInput(inject(ToolbarWidget).disabled, this.disabled);
    ɵassertEditorFeature('withSearch', 'scEditorSearch');
    inject(DestroyRef).onDestroy(this.search.register());
  }
}
