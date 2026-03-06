import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'svg[scComboboxSearchInputIcon]',
  host: {
    'data-slot': 'combobox-search-input-icon',
    '[class]': 'class()',
    'aria-hidden': 'true',
  },
})
export class ScComboboxSearchInputIcon {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'pointer-events-none absolute left-2.5 size-4 shrink-0 opacity-50',
      this.classInput(),
    ),
  );
}
