import { ToolbarWidget } from '@angular/aria/toolbar';
import { Directive, computed, inject, input } from '@angular/core';
import { SC_EDITOR, ɵassertEditorFeature } from '@semantic-components/editor';
import { bindInput, cn, toggleVariants } from '@semantic-components/ui';

/**
 * Subscript, on and off (and superscript off). Write its icon and name it
 * (`aria-label` or visually hidden text). Needs `withScripts()`.
 */
@Directive({
  selector: 'button[scEditorSubscript]',
  hostDirectives: [ToolbarWidget],
  host: {
    type: 'button',
    '[class]': 'class()',
    '[disabled]': 'disabled()',
    '[attr.aria-pressed]': "editor.isActive('subscript')",
    '(click)': 'onClick()',
  },
})
export class ScEditorSubscript {
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
    ɵassertEditorFeature('withScripts', 'scEditorSubscript');
    bindInput(inject(ToolbarWidget).disabled, this.disabled);
  }

  protected onClick(): void {
    this.editor.run((chain) => chain.unsetSuperscript().toggleSubscript());
  }
}
