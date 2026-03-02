import { Directive, computed, inject, input } from '@angular/core';
import { buttonVariants, cn } from '@semantic-components/ui';
import { SC_EDITOR } from './editor';

@Directive({
  selector: 'button[scEditorUndo]',
  host: {
    'data-slot': 'editor-undo',
    type: 'button',
    '[class]': 'class()',
    '[disabled]': 'editor.disabled() || !editor.canUndo()',
    '[attr.aria-disabled]': 'editor.disabled() || !editor.canUndo() || null',
    '[attr.title]': '"Undo (Ctrl+Z)"',
    '(click)': 'onClick()',
  },
})
export class ScEditorUndoButton {
  readonly editor = inject(SC_EDITOR);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(buttonVariants({ variant: 'ghost', size: 'icon' }), this.classInput()),
  );

  onClick(): void {
    this.editor.execCommand('undo');
  }
}
