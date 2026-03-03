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

  protected readonly class = computed(() =>
    cn(
      'border-input bg-background text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 h-9 w-full rounded-md border ps-9 pe-3 text-sm outline-none focus-visible:ring-3 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
      this.classInput(),
    ),
  );
}
