import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';

@Directive({
  selector: 'span[scAutocompleteItemLabel]',
  host: {
    '[class]': 'class()',
  },
})
export class ScAutocompleteItemLabel {
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() => cn('flex-1', this.classInput()));
}
