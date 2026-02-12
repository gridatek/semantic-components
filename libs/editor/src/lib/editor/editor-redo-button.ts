import {
  Component,
  ChangeDetectionStrategy,
  computed,
  input,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';
import { SC_EDITOR } from './editor';

@Component({
  selector: 'button[sc-editor-redo]',
  template: `
    <ng-content />
  `,
  host: {
    'data-slot': 'editor-redo',
    type: 'button',
    '[class]': 'class()',
    '[disabled]': 'editor.disabled() || !editor.canRedo()',
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
    cn(
      'p-1.5 rounded hover:bg-accent disabled:opacity-50 [&_svg]:size-4',
      this.classInput(),
    ),
  );

  onClick(): void {
    this.editor.execCommand('redo');
  }
}
