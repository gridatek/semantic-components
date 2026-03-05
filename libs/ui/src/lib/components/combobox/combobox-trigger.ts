import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'div[scComboboxTrigger]',
  host: {
    'data-slot': 'combobox-trigger',
    '[class]': 'class()',
  },
})
export class ScComboboxTrigger {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('relative flex items-center rounded-md', this.classInput()),
  );
}
