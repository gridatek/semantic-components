import { Directive, computed, input, signal } from '@angular/core';
import { cn } from '../../utils';

/** Options together: a `group`, named by its label. */
@Directive({
  selector: 'div[scComboboxGroup]',
  host: {
    'data-slot': 'combobox-group',
    role: 'group',
    '[attr.aria-labelledby]': 'labelId()',
    '[class]': 'class()',
  },
})
export class ScComboboxGroup {
  readonly classInput = input<string>('', { alias: 'class' });
  /** Set by its label. */
  readonly labelId = signal<string | null>(null);

  protected readonly class = computed(() => cn(this.classInput()));
}
