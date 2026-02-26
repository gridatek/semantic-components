import { computed, Directive, inject, input } from '@angular/core';
import { buttonVariants, cn } from '@semantic-components/ui';
import { SC_EDITOR } from './editor';

@Directive({
  selector: 'button[scEditorItalic]',
  host: {
    'data-slot': 'editor-italic',
    type: 'button',
    '[class]': 'class()',
    '[disabled]': 'editor.disabled()',
    '[attr.aria-disabled]': 'editor.disabled() || null',
    '[attr.aria-pressed]': 'editor.isItalic()',
    '[attr.title]': '"Italic (Ctrl+I)"',
    '(click)': 'onClick()',
  },
})
export class ScEditorItalicButton {
  readonly editor = inject(SC_EDITOR);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      buttonVariants({ variant: 'ghost', size: 'icon' }),
      this.editor.isItalic() && 'bg-accent text-accent-foreground',
      this.classInput(),
    ),
  );

  onClick(): void {
    this.editor.execCommand('italic');
  }
}
