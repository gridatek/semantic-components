import { ComboboxInput } from '@angular/aria/combobox';
import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'input[scAutocompleteInput]',
  hostDirectives: [ComboboxInput],
  host: {
    'data-slot': 'autocomplete-input',
    '[class]': 'class()',
  },
})
export class ScAutocompleteInput {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn('', this.classInput()));
}
