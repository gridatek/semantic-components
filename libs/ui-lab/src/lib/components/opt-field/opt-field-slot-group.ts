import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: '[sc-opt-field-slot-group]',
  host: {
    'data-slot': 'opt-field-slot-group',
    '[class]': 'class()',
  },
})
export class ScOptFieldSlotGroup {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('flex items-center', this.classInput()),
  );
}
