import { Listbox } from '@angular/aria/listbox';
import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'div[scAutocompleteList]',
  hostDirectives: [Listbox],
  host: {
    'data-slot': 'autocomplete-list',
    '[class]': 'class()',
  },
})
export class ScAutocompleteList {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('flex flex-col gap-0.5', this.classInput()),
  );
}
