import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '../../utils';
import { type ScButtonVariants, buttonVariants } from '../button/button';
import { SC_AUTOCOMPLETE } from './autocomplete-tokens';

/**
 * Clears the autocomplete's text. Hidden while the input is empty.
 * Project the icon and give the button an accessible name:
 *
 * ```html
 * <button scAutocompleteClear aria-label="Clear"><svg siXIcon></svg></button>
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
  protected readonly autocomplete = inject(SC_AUTOCOMPLETE);
  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('icon-xs');

  protected readonly visible = computed(
    () =>
      this.autocomplete.value() !== '' &&
      !this.autocomplete.disabled() &&
      !this.autocomplete.readonly(),
  );

  protected readonly class = computed(() =>
    cn(
      buttonVariants({ variant: this.variant(), size: this.size() }),
      'text-muted-foreground',
      this.classInput(),
    ),
  );
}
