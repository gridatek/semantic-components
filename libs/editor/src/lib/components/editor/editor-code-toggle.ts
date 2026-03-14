import { ToolbarWidget } from '@angular/aria/toolbar';
import { Directive, computed, inject, input } from '@angular/core';
import { cn, toggleVariants } from '@semantic-components/ui';
import { SC_EDITOR } from './editor';

@Directive({
  selector: 'button[scEditorCodeToggle]',
  hostDirectives: [{ directive: ToolbarWidget, inputs: ['value'] }],
  host: {
    'data-slot': 'editor-toggle',
    type: 'button',
    '[class]': 'class()',
    '[disabled]': 'disabled()',
    '(click)': 'onClick()',
  },
})
export class ScEditorCodeToggle {
  readonly editor = inject(SC_EDITOR);
  readonly classInput = input<string>('', { alias: 'class' });
  readonly disabledInput = input(false, { alias: 'disabled' });

  protected readonly class = computed(() =>
    cn(
      toggleVariants({ variant: 'default', size: 'default' }),
      this.classInput(),
    ),
  );

  protected readonly disabled = computed(
    () => this.disabledInput() || this.editor.disabled(),
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
