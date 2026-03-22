import { ComboboxInput } from '@angular/aria/combobox';
import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'input[scComboboxSearchInput]',
  hostDirectives: [
    {
      directive: ComboboxInput,
      inputs: ['value'],
      outputs: ['valueChange'],
    },
  ],
  host: {
    'data-slot': 'combobox-search-input',
    '[class]': 'class()',
  },
})
export class ScComboboxSearchInput {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn('', this.classInput()));
}
