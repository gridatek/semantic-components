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
  selector: 'button[scEditorRedo]',
  template: `
    <ng-content />
  `,
  host: {
    'data-slot': 'editor-redo',
    type: 'button',
    '[class]': 'class()',
    '[disabled]': 'editor.disabled() || !editor.canRedo()',
    '[attr.aria-disabled]': 'editor.disabled() || !editor.canRedo() || null',
    '[attr.title]': '"Redo (Ctrl+Y)"',
    '(click)': 'onClick()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
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
