import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '../../utils';
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

  protected readonly visible = computed(
    () =>
      this.autocomplete.value() !== '' &&
      !this.autocomplete.disabled() &&
      !this.autocomplete.readonly(),
  );

  protected readonly class = computed(() =>
    cn(
      'text-muted-foreground hover:text-foreground focus-visible:ring-ring/50 flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-md outline-none focus-visible:ring-3 [&_svg:not([class*=size-])]:size-3.5 [&_svg]:pointer-events-none',
      this.classInput(),
    ),
  );
}
