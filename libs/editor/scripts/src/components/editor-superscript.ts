import { ToolbarWidget } from '@angular/aria/toolbar';
import { Directive, computed, inject, input } from '@angular/core';
import { SC_EDITOR, ɵassertEditorFeature } from '@semantic-components/editor';
import { bindInput, cn, toggleVariants } from '@semantic-components/ui';

/**
 * Superscript, on and off (and subscript off). Write its icon and name it
 * (`aria-label` or visually hidden text). Needs `withScripts()`.
 */
@Directive({
  selector: 'button[scEditorSuperscript]',
  hostDirectives: [ToolbarWidget],
  host: {
    type: 'button',
    '[class]': 'class()',
    '[disabled]': 'disabled()',
    '[attr.aria-pressed]': "editor.isActive('superscript')",
    '(click)': 'onClick()',
  },
})
export class ScEditorSuperscript {
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
    ɵassertEditorFeature('withScripts', 'scEditorSuperscript');
    bindInput(inject(ToolbarWidget).disabled, this.disabled);
  }

  protected onClick(): void {
    this.editor.run((chain) => chain.unsetSubscript().toggleSuperscript());
  }
}
