import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'div[scComboboxInputGroup]',
  host: {
    'data-slot': 'combobox-input-group',
    '[class]': 'class()',
  },
})
export class ScComboboxInputGroup {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('border-border relative flex items-center border-b', this.classInput()),
  );
}
