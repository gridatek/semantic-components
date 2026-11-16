import { Directive, computed, inject, input } from '@angular/core';
import {
  SC_EDITOR,
  ɵassertEditorFeature,
  ɵeditorControl,
} from '@semantic-components/ui/editor';
import { cn } from 'cn';

/**
 * Removes the highlight at the selection, in your highlight popover
 * (disabled when there is none). Behaviour only: its look is the part beside
 * it (`scButton`, `scToggle`). Write its icon and name it.
 */
@Directive({
  selector: 'button[scEditorRemoveHighlight]',
  host: {
    type: 'button',
    '[class]': 'class()',
    '(click)': 'onClick()',
  },
})
export class ScEditorRemoveHighlight {
  private readonly editor = inject(SC_EDITOR);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly disabled = computed(
    () => !this.editor.editable() || !this.editor.isActive('highlight'),
  );

  protected readonly class = computed(() => cn(this.classInput()));

  constructor() {
    ɵassertEditorFeature('withHighlight', 'scEditorRemoveHighlight');
    ɵeditorControl({ disabled: this.disabled });
  }

  protected onClick(): void {
    this.editor.run((chain) => chain.unsetHighlight());
  }
}
