import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';
import { buttonGroupVariants } from '../button-group';

/**
 * The input and its buttons, joined (as a button group): decrement, input,
 * increment.
 */
@Directive({
  selector: 'div[scNumberGroup]',
  host: {
    'data-slot': 'number-group',
    role: 'group',
    '[class]': 'class()',
  },
})
export class ScNumberGroup {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(buttonGroupVariants({ orientation: 'horizontal' }), this.classInput()),
  );
}
