import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';
import { buttonGroupVariants } from '../button-group';

/**
 * The input and its buttons, joined (as a button group): decrement, input,
 * increment.
 */
@Directive({
  selector: 'div[scNumberFieldGroup]',
  host: {
    'data-slot': 'number-field-group',
    role: 'group',
    '[class]': 'class()',
  },
})
export class ScNumberFieldGroup {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(buttonGroupVariants({ orientation: 'horizontal' }), this.classInput()),
  );
}
