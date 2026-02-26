import { computed, Directive, inject, input } from '@angular/core';
import { buttonVariants, cn } from '@semantic-components/ui';
import { SC_EDITOR } from './editor';

@Directive({
  selector: 'button[scEditorHorizontalRule]',
  host: {
    'data-slot': 'editor-horizontal-rule',
    type: 'button',
    '[class]': 'class()',
    '[disabled]': 'editor.disabled()',
    '[attr.aria-disabled]': 'editor.disabled() || null',
    '[attr.title]': '"Horizontal line"',
    '(click)': 'onClick()',
  },
})
export class ScEditorHorizontalRuleButton {
  readonly editor = inject(SC_EDITOR);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(buttonVariants({ variant: 'ghost', size: 'icon' }), this.classInput()),
  );

  onClick(): void {
    this.editor.execCommand('insertHorizontalRule');
  }
}
