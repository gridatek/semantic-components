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
  selector: 'button[sc-editor-code]',
  template: `
    <ng-content />
  `,
  host: {
    'data-slot': 'editor-code',
    type: 'button',
    '[class]': 'class()',
    '[disabled]': 'editor.disabled()',
    '[attr.title]': '"Inline code"',
    '(click)': 'onClick()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScEditorCodeButton {
  readonly editor = inject(SC_EDITOR);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'p-1.5 rounded hover:bg-accent disabled:opacity-50 [&_svg]:size-4',
      this.classInput(),
    ),
  );

  onClick(): void {
    if (this.editor.disabled() || this.editor.readonly()) return;

    const selection = window.getSelection();
    const selectedText = selection?.toString() || '';

    if (selectedText) {
      const code = `<code>${selectedText}</code>`;
      this.editor.execCommand('insertHTML', code);
    } else {
      this.editor.execCommand('insertHTML', '<code>&nbsp;</code>');
    }
  }
}
