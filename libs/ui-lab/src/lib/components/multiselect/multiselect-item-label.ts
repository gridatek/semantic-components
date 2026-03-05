import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

@Directive({
  selector: '[scMultiselectItemLabel]',
  host: {
    'data-slot': 'multiselect-item-label',
    '[class]': 'class()',
  },
})
export class ScMultiselectItemLabel {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn('flex-1', this.classInput()));
}
