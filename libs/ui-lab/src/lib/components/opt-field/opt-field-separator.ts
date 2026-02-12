import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: '[sc-opt-field-separator]',
  host: {
    'data-slot': 'opt-field-separator',
    role: 'separator',
    '[class]': 'class()',
  },
})
export class ScOptFieldSeparator {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('flex items-center', this.classInput()),
  );
}
