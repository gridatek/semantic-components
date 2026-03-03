import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'div[scAutocompleteEmpty]',
  host: {
    'data-slot': 'autocomplete-empty',
    '[class]': 'class()',
  },
})
export class ScAutocompleteEmpty {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'text-muted-foreground px-3 py-4 text-center text-sm',
      this.classInput(),
    ),
  );
}
