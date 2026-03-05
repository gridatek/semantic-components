import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

@Directive({
  selector: '[scMultiselectLabel]',
  host: {
    'data-slot': 'multiselect-label',
    '[class]': 'class()',
  },
})
export class ScMultiselectLabel {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn('text-sm', this.classInput()));
}
