import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { type ScButtonVariants } from '../button/button';
import { SC_AUTOCOMPLETE } from './autocomplete-tokens';

/**
 * Clears the autocomplete's text. Hidden while the input is empty.
 * Project the icon and give the button an accessible name:
 *
 * ```html
 * <button scAutocompleteClear>
 *   <svg siXIcon></svg>
 *   <span class="sr-only">Clear</span>
 * </button>
 * ```
 */
@Directive({
  selector: 'button[scAutocompleteClear]',
  host: {
    'data-slot': 'autocomplete-clear',
    type: 'button',
    '[hidden]': '!visible()',
    '[class]': 'class()',
    '(click)': 'autocomplete.clear()',
  },
})
export class ScAutocompleteClear {
  private readonly buttonStyles = injectStyle().button;

  private readonly autocomplete = inject(SC_AUTOCOMPLETE);
  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('icon-xs');

  private readonly visible = computed(
    () =>
      this.autocomplete.value() !== '' &&
      !this.autocomplete.disabled() &&
      !this.autocomplete.readonly(),
  );

  private readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      'text-muted-foreground',
      this.classInput(),
    ),
  );
}
