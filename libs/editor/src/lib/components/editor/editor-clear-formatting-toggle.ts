import { ToolbarWidget } from '@angular/aria/toolbar';
import { Directive, computed, inject, input } from '@angular/core';
import { cn, toggleVariants } from '@semantic-components/ui';
import { SC_EDITOR } from './editor';

@Directive({
  selector: 'button[scEditorClearFormattingToggle]',
  hostDirectives: [{ directive: ToolbarWidget, inputs: ['value'] }],
  host: {
    'data-slot': 'editor-toggle',
    type: 'button',
    '[class]': 'class()',
    '[disabled]': 'disabled()',
    '(click)': 'onClick()',
  },
})
export class ScEditorClearFormattingToggle {
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
    this.editor.execCommand('removeFormat');
  }
}
