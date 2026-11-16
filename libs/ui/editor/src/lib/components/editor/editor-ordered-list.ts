import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { SC_EDITOR } from './editor';
import { ɵeditorControl } from './editor-control';

/** A numbered list, on and off. Write its icon and name it (`aria-label` or visually hidden text). */
@Directive({
  selector: 'button[scEditorOrderedList]',
  host: {
    type: 'button',
    '[class]': 'class()',
    '(click)': 'onClick()',
  },
})
export class ScEditorOrderedList {
  protected readonly editor = inject(SC_EDITOR);
  readonly classInput = input<string>('', { alias: 'class' });
  readonly disabledInput = input(false, { alias: 'disabled' });

  protected readonly class = computed(() => cn(this.classInput()));

  protected readonly disabled = computed(
    () => this.disabledInput() || !this.editor.editable(),
  );

  constructor() {
    ɵeditorControl({
      disabled: this.disabled,
      pressed: computed(() => this.editor.isActive('orderedList')),
    });
  }

  protected onClick(): void {
    this.editor.run((chain) => chain.toggleOrderedList());
  }
}
