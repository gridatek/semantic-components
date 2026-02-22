import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: '[scSelectSeparator]',
  host: {
    'data-slot': 'select-separator',
    role: 'separator',
    'aria-orientation': 'horizontal',
    '[class]': 'class()',
  },
})
export class ScSelectSeparator {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('bg-border -mx-1 my-1 h-px', this.classInput()),
  );
}
