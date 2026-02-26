import { computed, Directive, inject, input } from '@angular/core';
import { buttonVariants, cn } from '@semantic-components/ui';
import { SC_EDITOR } from './editor';

@Directive({
  selector: 'button[scEditorClearFormatting]',
  host: {
    'data-slot': 'editor-clear-formatting',
    type: 'button',
    '[class]': 'class()',
    '[disabled]': 'editor.disabled()',
    '[attr.aria-disabled]': 'editor.disabled() || null',
    '[attr.title]': '"Clear formatting"',
    '(click)': 'onClick()',
  },
})
export class ScEditorClearFormattingButton {
  readonly editor = inject(SC_EDITOR);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(buttonVariants({ variant: 'ghost', size: 'icon' }), this.classInput()),
  );

  onClick(): void {
    this.editor.execCommand('removeFormat');
  }
}
