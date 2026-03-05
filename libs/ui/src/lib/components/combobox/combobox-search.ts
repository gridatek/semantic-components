import { Combobox } from '@angular/aria/combobox';
import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'div[scComboboxSearch]',
  exportAs: 'scComboboxSearch',
  hostDirectives: [
    {
      directive: Combobox,
      inputs: [
        'filterMode',
        'disabled',
        'readonly',
        'firstMatch',
        'alwaysExpanded',
      ],
    },
  ],
  host: {
    'data-slot': 'combobox-search',
    '[class]': 'class()',
  },
})
export class ScComboboxSearch {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'relative flex w-full flex-col rounded-md border-none',
      this.classInput(),
    ),
  );
}
