import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

/**
 * Wraps a table so it can scroll horizontally instead of forcing its parent
 * wider. Upstream's Table renders this automatically; ScTable is an attribute
 * directive on the `table` element and cannot introduce a wrapper, so it is
 * applied by the consumer.
 */
@Directive({
  selector: 'div[scTableContainer]',
  host: {
    'data-slot': 'table-container',
    '[class]': 'class()',
  },
})
export class ScTableContainer {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('relative w-full overflow-x-auto', this.classInput()),
  );
}
