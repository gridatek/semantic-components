import { ToolbarWidget } from '@angular/aria/toolbar';
import { Directive, computed, inject, input } from '@angular/core';
import { bindInput, cn, toggleVariants } from '@semantic-components/ui';
import { SC_EDITOR } from './editor';

/**
 * The link button: pressed inside a link. It runs no command itself — make
 * it the trigger of your popover (a `scPopoverTrigger`), whose buttons call
 * `set(href)` / `remove()` (`#link="scEditorLink"`); `href()` is the address
 * at the selection. Write its icon and name it.
 */
@Directive({
  selector: 'button[scEditorLink]',
  exportAs: 'scEditorLink',
  hostDirectives: [ToolbarWidget],
  host: {
    type: 'button',
    '[class]': 'class()',
    '[disabled]': 'disabled()',
    '[attr.aria-pressed]': "editor.isActive('link')",
  },
})
export class ScEditorLink {
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

  /** The address of the link at the selection, or ''. */
  readonly href = computed(() => {
    this.editor.contentVersion();
    const href = this.editor.editorInstance()?.getAttributes('link')['href'];
    return typeof href === 'string' ? href : '';
  });

  constructor() {
    bindInput(inject(ToolbarWidget).disabled, this.disabled);
  }

  /**
   * Links the selection to `href` — or, with nothing selected, writes `text`
   * (or the address) as a link. Inside a link, changes its address.
   */
  set(href: string, text?: string): void {
    const editor = this.editor.editorInstance();
    const address = href.trim();
    if (!editor || !address) return;
    if (editor.state.selection.empty && !this.editor.isActive('link')) {
      this.editor.run((chain) =>
        chain.insertContent({
          type: 'text',
          text: text?.trim() || address,
          marks: [{ type: 'link', attrs: { href: address } }],
        }),
      );
    } else {
      this.editor.run((chain) =>
        chain.extendMarkRange('link').setLink({ href: address }),
      );
    }
  }

  /** Removes the link at the selection. */
  remove(): void {
    this.editor.run((chain) => chain.extendMarkRange('link').unsetLink());
  }
}
