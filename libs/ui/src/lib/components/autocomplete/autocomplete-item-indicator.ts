import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'svg[scAutocompleteItemIndicator]',
  host: {
    'data-slot': 'autocomplete-item-indicator',
    '[class]': 'class()',
    'aria-hidden': 'true',
  },
})
export class ScAutocompleteItemIndicator {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'size-4 shrink-0 opacity-0 aria-selected:opacity-100',
      this.classInput(),
    ),
  );
}
