import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'div[scComboboxSearchInputGroup]',
  host: {
    'data-slot': 'combobox-search-input-group',
    '[class]': 'class()',
  },
})
export class ScComboboxSearchInputGroup {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('border-border relative flex items-center border-b', this.classInput()),
  );
}
