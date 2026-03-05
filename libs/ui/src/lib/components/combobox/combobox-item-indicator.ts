import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'svg[scComboboxItemIndicator]',
  host: {
    'data-slot': 'combobox-item-indicator',
    '[class]': 'class()',
    'aria-hidden': 'true',
  },
})
export class ScComboboxItemIndicator {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('hidden size-4 shrink-0 group-aria-selected:block', this.classInput()),
  );
}
