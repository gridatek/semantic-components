import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'svg[scAutocompleteIcon]',
  host: {
    'data-slot': 'autocomplete-icon',
    '[class]': 'class()',
    'aria-hidden': 'true',
  },
})
export class ScAutocompleteIcon {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'text-muted-foreground pointer-events-none absolute left-3 size-4',
      this.classInput(),
    ),
  );
}
