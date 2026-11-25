import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { ScTokenInput } from './token-input';
import { SC_TOKEN_INPUT_TOKEN } from './token-input-token';

/**
 * Removes its token — inside the token's template, around an icon. Hidden
 * from screen readers (the keyboard removes a token with Backspace); focus
 * stays in the editor.
 */
@Directive({
  selector: '[scTokenInputTokenRemove]',
  host: {
    'data-slot': 'token-input-token-remove',
    'aria-hidden': 'true',
    '[attr.data-disabled]': 'root.disabled() || null',
    '[attr.data-readonly]': 'root.readonly() || null',
    '[class]': 'class()',
    '(pointerdown)': '$event.preventDefault()',
    '(click)': 'onClick($event)',
  },
})
export class ScTokenInputTokenRemove {
  private readonly styles = injectStyle().combobox;
  private readonly root = inject(ScTokenInput);
  private readonly token = inject(SC_TOKEN_INPUT_TOKEN);

  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn(
      'inline-flex size-4 shrink-0 cursor-pointer items-center justify-center rounded-sm',
      "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-3",
      'data-disabled:hidden data-readonly:hidden',
      this.styles.chipRemove,
      this.classInput(),
    ),
  );

  private onClick(event: MouseEvent): void {
    event.preventDefault();
    if (!this.root.editable()) return;
    this.token.remove();
  }
}
