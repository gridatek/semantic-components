import { ToolbarWidget } from '@angular/aria/toolbar';
import { Directive, computed, inject, input } from '@angular/core';
import { bindInput, cn, toggleVariants } from '@semantic-components/ui';
import { SC_EDITOR } from './editor';

/**
 * The link button: pressed inside a link. It runs no command itself — make
 * it the trigger of your link form (a `scPopoverTrigger`, say), whose
 * buttons call the editor's `setLink(href)` / `unsetLink()`; `linkHref()`
 * is the address at the selection. Write its icon and name it.
 */
@Directive({
  selector: 'button[scEditorLinkToggle]',
  hostDirectives: [ToolbarWidget],
  host: {
    type: 'button',
    '[class]': 'class()',
    '[disabled]': 'disabled()',
    '[attr.aria-pressed]': "editor.isActive('link')",
  },
})
export class ScEditorLinkToggle {
  protected readonly editor = inject(SC_EDITOR);
  readonly classInput = input<string>('', { alias: 'class' });
  readonly disabledInput = input(false, { alias: 'disabled' });

  protected readonly class = computed(() =>
    cn(
      toggleVariants({ variant: 'default', size: 'default' }),
      this.classInput(),
    ),
  );

  protected readonly disabled = computed(
    () => this.disabledInput() || !this.editor.editable(),
  );

  constructor() {
    bindInput(inject(ToolbarWidget).disabled, this.disabled);
  }
}
