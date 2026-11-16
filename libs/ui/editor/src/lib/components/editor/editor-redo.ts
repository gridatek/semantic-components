import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { SC_EDITOR } from './editor';
import { ɵeditorControl } from './editor-control';

/** Redoes the last undone change (disabled when there is none). Write its icon and name it (`aria-label` or visually hidden text). */
@Directive({
  selector: 'button[scEditorRedo]',
  host: {
    type: 'button',
    '[class]': 'class()',
    '(click)': 'onClick()',
  },
})
export class ScEditorRedo {
  protected readonly editor = inject(SC_EDITOR);
  readonly classInput = input<string>('', { alias: 'class' });
  readonly disabledInput = input(false, { alias: 'disabled' });

  protected readonly class = computed(() => cn(this.classInput()));

  protected readonly disabled = computed(
    () =>
      this.disabledInput() ||
      !this.editor.editable() ||
      !this.editor.can((chain) => chain.redo()),
  );

  constructor() {
    ɵeditorControl({ disabled: this.disabled });
  }

  protected onClick(): void {
    this.editor.run((chain) => chain.redo());
  }
}
