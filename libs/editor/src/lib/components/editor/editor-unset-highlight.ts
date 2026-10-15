import { Directive, computed, inject, input } from '@angular/core';
import { cn, toggleVariants } from '@semantic-components/ui';
import { SC_EDITOR } from './editor';

/**
 * Removes the highlight at the selection, in your highlight popover
 * (disabled when there is none). Write its icon and name it.
 */
@Directive({
  selector: 'button[scEditorUnsetHighlight]',
  host: {
    type: 'button',
    '[class]': 'class()',
    '[disabled]': 'disabled()',
    '(click)': 'onClick()',
  },
})
export class ScEditorUnsetHighlight {
  private readonly editor = inject(SC_EDITOR);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly disabled = computed(
    () => !this.editor.editable() || !this.editor.isActive('highlight'),
  );

  protected readonly class = computed(() =>
    cn(
      toggleVariants({ variant: 'default', size: 'sm' }),
      'rounded-full',
      this.classInput(),
    ),
  );

  protected onClick(): void {
    this.editor.run((chain) => chain.unsetHighlight());
  }
}
