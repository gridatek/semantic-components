import { computed, Directive, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

@Directive({
  selector: '[scOptFieldSlotGroup]',
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
