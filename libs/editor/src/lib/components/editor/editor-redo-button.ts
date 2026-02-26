import { computed, Directive, inject, input } from '@angular/core';
import { buttonVariants, cn } from '@semantic-components/ui';
import { SC_EDITOR } from './editor';

@Directive({
  selector: 'button[scEditorRedo]',
  host: {
    'data-slot': 'editor-redo',
    type: 'button',
    '[class]': 'class()',
    '[disabled]': 'editor.disabled() || !editor.canRedo()',
    '[attr.aria-disabled]': 'editor.disabled() || !editor.canRedo() || null',
    '[attr.title]': '"Redo (Ctrl+Y)"',
    '(click)': 'onClick()',
  },
})
export class ScEditorRedoButton {
  readonly editor = inject(SC_EDITOR);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(buttonVariants({ variant: 'ghost', size: 'icon' }), this.classInput()),
  );

  onClick(): void {
    this.editor.execCommand('redo');
  }
}
