import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: '[scSelectItemLabel]',
  host: {
    'data-slot': 'select-item-label',
    '[class]': 'class()',
  },
})
export class ScSelectItemLabel {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn('flex-1', this.classInput()));
}
