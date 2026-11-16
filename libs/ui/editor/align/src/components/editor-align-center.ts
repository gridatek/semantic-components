import { Directive, computed, inject, input } from '@angular/core';
import {
  SC_EDITOR,
  ɵassertEditorFeature,
  ɵeditorControl,
} from '@semantic-components/ui/editor';
import { cn } from 'cn';
import { editorAlignment } from './editor-alignment';

/**
 * Centres the paragraph. Write its icon and name it (`aria-label` or visually
 * hidden text). Needs `withAlign()`.
 */
@Directive({
  selector: 'button[scEditorAlignCenter]',
  host: {
    type: 'button',
    '[class]': 'class()',
    '(click)': 'onClick()',
  },
})
export class ScEditorAlignCenter {
  protected readonly editor = inject(SC_EDITOR);
  readonly classInput = input<string>('', { alias: 'class' });
  readonly disabledInput = input(false, { alias: 'disabled' });

  protected readonly alignment = computed(() => editorAlignment(this.editor));

  protected readonly class = computed(() => cn(this.classInput()));

  protected readonly disabled = computed(
    () => this.disabledInput() || !this.editor.editable(),
  );

  constructor() {
    ɵassertEditorFeature('withAlign', 'scEditorAlignCenter');
    ɵeditorControl({
      disabled: this.disabled,
      pressed: computed(() => this.alignment() === 'center'),
    });
  }

  protected onClick(): void {
    this.editor.run((chain) => chain.setTextAlign('center'));
  }
}
