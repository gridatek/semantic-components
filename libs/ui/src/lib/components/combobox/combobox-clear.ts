import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '../../utils';
import { SC_COMBOBOX } from './combobox-tokens';

/**
 * Clears the selection. Place it next to (not inside) the trigger — it sits
 * over the trigger's end. Hidden while nothing is selected. Project the icon
 * and give the button an accessible name:
 *
 * ```html
 * <button scComboboxClear aria-label="Clear"><svg siXIcon></svg></button>
 * ```
 */
@Directive({
  selector: 'button[scComboboxClear]',
  host: {
    'data-slot': 'combobox-clear',
    type: 'button',
    '[hidden]': '!visible()',
    '[class]': 'class()',
    '(click)': 'combobox.clear()',
  },
})
export class ScComboboxClear {
  protected readonly combobox = inject(SC_COMBOBOX);
  readonly classInput = input<string>('', { alias: 'class' });

  readonly visible = computed(
    () =>
      this.combobox.hasValue() &&
      !this.combobox.disabled() &&
      !this.combobox.readonly(),
  );

  protected readonly class = computed(() =>
    cn(
      'text-muted-foreground hover:text-foreground focus-visible:ring-ring/50 absolute end-7 top-1/2 flex size-5 -translate-y-1/2 cursor-pointer items-center justify-center rounded-sm outline-none focus-visible:ring-3 [&_svg:not([class*=size-])]:size-3.5 [&_svg]:pointer-events-none',
      this.classInput(),
    ),
  );
}
