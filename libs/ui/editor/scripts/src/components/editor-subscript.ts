import { Directive, computed, inject, input } from '@angular/core';
import {
  SC_EDITOR,
  ɵassertEditorFeature,
  ɵeditorControl,
} from '@semantic-components/ui/editor';
import { cn } from 'cn';

/**
 * Subscript, on and off (and superscript off). Write its icon and name it
 * (`aria-label` or visually hidden text). Needs `withScripts()`.
 */
@Directive({
  selector: 'button[scEditorSubscript]',
  host: {
    type: 'button',
    '[class]': 'class()',
    '(click)': 'onClick()',
  },
})
export class ScEditorSubscript {
  protected readonly editor = inject(SC_EDITOR);
  readonly classInput = input<string>('', { alias: 'class' });
  readonly disabledInput = input(false, { alias: 'disabled' });

  protected readonly class = computed(() => cn(this.classInput()));

  protected readonly disabled = computed(
    () => this.disabledInput() || !this.editor.editable(),
  );

  constructor() {
    ɵassertEditorFeature('withScripts', 'scEditorSubscript');
    ɵeditorControl({
      disabled: this.disabled,
      pressed: computed(() => this.editor.isActive('subscript')),
    });
  }

  protected onClick(): void {
    this.editor.run((chain) => chain.unsetSuperscript().toggleSubscript());
  }
}
