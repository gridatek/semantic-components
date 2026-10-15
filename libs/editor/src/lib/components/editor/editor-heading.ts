import { ToolbarWidget } from '@angular/aria/toolbar';
import { Directive, computed, inject, input } from '@angular/core';
import { bindInput, cn, toggleVariants } from '@semantic-components/ui';
import { SC_EDITOR, type ScEditorHeadingLevel } from './editor';

/**
 * The block type button (paragraph, headings): make it the trigger of your
 * menu, whose items call `select(level)`; `level()` is the current one
 * ('p', 'h1'…'h6'). Write the labels — the library has none.
 */
@Directive({
  selector: 'button[scEditorHeading]',
  exportAs: 'scEditorHeading',
  hostDirectives: [ToolbarWidget],
  host: {
    type: 'button',
    '[class]': 'class()',
    '[disabled]': 'disabled()',
  },
})
export class ScEditorHeading {
  private readonly editor = inject(SC_EDITOR);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly disabledInput = input(false, { alias: 'disabled' });

  /** The block type at the selection. */
  readonly level = computed(() => this.editor.heading());

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

  /** Makes the selection's block a paragraph or a heading. */
  select(level: ScEditorHeadingLevel): void {
    this.editor.run((chain) =>
      level === 'p'
        ? chain.setParagraph()
        : chain.setHeading({
            level: Number(level.slice(1)) as 1 | 2 | 3 | 4 | 5 | 6,
          }),
    );
  }
}
