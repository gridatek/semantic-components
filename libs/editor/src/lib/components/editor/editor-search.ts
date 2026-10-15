import { ToolbarWidget } from '@angular/aria/toolbar';
import { DestroyRef, Directive, computed, inject, input } from '@angular/core';
import { bindInput, cn, toggleVariants } from '@semantic-components/ui';
import { SC_EDITOR } from './editor';

/**
 * Opens and closes the search bar (`editor.searchOpen()` — show your
 * `scEditorSearchBar` with it); with it in the toolbar, Ctrl / ⌘ + F in the
 * document opens the bar too. Write its icon and name it.
 */
@Directive({
  selector: 'button[scEditorSearch]',
  hostDirectives: [ToolbarWidget],
  host: {
    type: 'button',
    '[class]': 'class()',
    '[disabled]': 'disabled()',
    '[attr.aria-pressed]': 'editor.searchOpen()',
    '(click)': 'editor.toggleSearch()',
  },
})
export class ScEditorSearch {
  protected readonly editor = inject(SC_EDITOR);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly disabledInput = input(false, { alias: 'disabled' });

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
    inject(DestroyRef).onDestroy(this.editor.registerSearch());
  }
}
