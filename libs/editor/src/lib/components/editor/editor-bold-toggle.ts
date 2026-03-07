import { Directive, computed, inject, input } from '@angular/core';
import { cn, toggleVariants } from '@semantic-components/ui';
import { SC_EDITOR } from './editor';

@Directive({
  selector: 'button[scEditorBoldToggle]',
  host: {
    'data-slot': 'editor-toggle',
    type: 'button',
    '[class]': 'class()',
    '[disabled]': 'disabled()',
    '[attr.aria-pressed]': 'editor.isBold()',
    '(click)': 'onClick()',
  },
})
export class ScEditorBoldToggle {
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
    this.editor.execCommand('bold');
  }
}
