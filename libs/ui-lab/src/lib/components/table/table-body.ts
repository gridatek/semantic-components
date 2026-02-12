import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'tbody[sc-table-body]',
  host: {
    'data-slot': 'table-body',
    '[class]': 'class()',
  },
})
export class ScTableBody {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('[&_tr:last-child]:border-0', this.classInput()),
  );
}
