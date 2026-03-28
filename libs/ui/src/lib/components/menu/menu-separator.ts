import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: '[scMenuSeparator]',
  host: {
    role: 'separator',
    'aria-orientation': 'horizontal',
    '[class]': 'class()',
  },
})
export class ScMenuSeparator {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('bg-border -mx-1 my-1 h-px', this.classInput()),
  );
}
