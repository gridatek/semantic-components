import { Directive, computed, inject, input } from '@angular/core';
import { cn, toggleVariants } from '@semantic-components/ui';
import { SC_EDITOR } from './editor';

@Directive({
  selector: 'button[scEditorBlockquoteToggle]',
  host: {
    'data-slot': 'editor-blockquote',
    type: 'button',
    '[class]': 'class()',
    '[disabled]': 'editor.disabled()',
    '[attr.aria-disabled]': 'editor.disabled() || null',
    '[attr.aria-pressed]': 'editor.isBlockquote()',
    '[attr.title]': '"Blockquote"',
    '(click)': 'onClick()',
  },
})
export class ScEditorBlockquoteToggle {
  readonly editor = inject(SC_EDITOR);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      toggleVariants({ variant: 'default', size: 'default' }),
      this.classInput(),
    ),
  );

  onClick(): void {
    this.editor.execCommand('formatBlock', 'blockquote');
  }
}
