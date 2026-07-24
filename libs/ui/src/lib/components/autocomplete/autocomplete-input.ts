import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'input[scAutocompleteInput]',
  host: {
    '[class]': 'class()',
  },
})
export class ScAutocompleteInput {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn('', this.classInput()));
}
