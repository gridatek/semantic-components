import { ToolbarWidget } from '@angular/aria/toolbar';
import { Directive, computed, inject, input } from '@angular/core';
import { SC_EDITOR, ɵassertEditorFeature } from '@semantic-components/editor';
import { bindInput, cn, toggleVariants } from '@semantic-components/ui';
import { editorAlignment } from './editor-alignment';

/**
 * Justifies the paragraph. Write its icon and name it (`aria-label` or visually
 * hidden text). Needs `withAlign()`.
 */
@Directive({
  selector: 'button[scEditorAlignJustify]',
  hostDirectives: [ToolbarWidget],
  host: {
    type: 'button',
    '[class]': 'class()',
    '[disabled]': 'disabled()',
    '[attr.aria-pressed]': "alignment() === 'justify'",
    '(click)': 'onClick()',
  },
})
export class ScEditorAlignJustify {
  protected readonly editor = inject(SC_EDITOR);
  readonly classInput = input<string>('', { alias: 'class' });
  readonly disabledInput = input(false, { alias: 'disabled' });

  protected readonly alignment = computed(() => editorAlignment(this.editor));

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
    ɵassertEditorFeature('withAlign', 'scEditorAlignJustify');
    bindInput(inject(ToolbarWidget).disabled, this.disabled);
  }

  protected onClick(): void {
    this.editor.run((chain) => chain.setTextAlign('justify'));
  }
}
