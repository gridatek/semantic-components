import {
  Component,
  ChangeDetectionStrategy,
  computed,
  input,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { buttonVariants, cn } from '@semantic-components/ui';
import { SC_EDITOR } from './editor';

@Component({
  selector: 'button[scEditorUndo]',
  template: `
    <ng-content />
  `,
  host: {
    'data-slot': 'editor-undo',
    type: 'button',
    '[class]': 'class()',
    '[disabled]': 'editor.disabled() || !editor.canUndo()',
    '[attr.aria-disabled]': 'editor.disabled() || !editor.canUndo() || null',
    '[attr.title]': '"Undo (Ctrl+Z)"',
    '(click)': 'onClick()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
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
