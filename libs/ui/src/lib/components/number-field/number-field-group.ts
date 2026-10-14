import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';
import { buttonGroupVariants } from '../button-group';

/**
 * The input and its buttons, joined (as a button group): decrement, input,
 * increment. Groups nest: a `vertical` one inside stacks its buttons, which
 * share the height of the row and join the parts beside them.
 */
@Directive({
  selector: 'div[scNumberFieldGroup]',
  host: {
    'data-slot': 'number-field-group',
    role: 'group',
    '[attr.data-orientation]': 'orientation()',
    '[class]': 'class()',
  },
})
export class ScNumberFieldGroup {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly orientation = input<'horizontal' | 'vertical'>('horizontal');

  protected readonly class = computed(() =>
    cn(
      this.orientation() === 'horizontal'
        ? [
            buttonGroupVariants({ orientation: 'horizontal' }),
            // A nested group's parts join the parts beside it.
            '[&>[data-slot=number-field-group]:not(:first-child)>*]:rounded-s-none [&>[data-slot=number-field-group]:not(:first-child)>*]:border-s-0',
            '[&>[data-slot=number-field-group]:not(:last-child)>*]:rounded-e-none',
          ]
        : [
            // The buttons share the height of the row equally.
            'grid auto-rows-fr [&>button]:h-auto',
            '[&>*:not(:first-child)]:rounded-t-none [&>*:not(:first-child)]:border-t-0 [&>*:not(:last-child)]:rounded-b-none',
          ],
      this.classInput(),
    ),
  );
}
