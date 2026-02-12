import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'thead[sc-table-header]',
  host: {
    'data-slot': 'table-header',
    '[class]': 'class()',
  },
})
export class ScTableHeader {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('[&_tr]:border-b', this.classInput()),
  );
}
