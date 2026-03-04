import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'span[scAutocompleteItemLabel]',
  host: {
    'data-slot': 'autocomplete-item-label',
    '[class]': 'class()',
  },
})
export class ScAutocompleteItemLabel {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn('flex-1', this.classInput()));
}
