import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'table[sc-table]',
  host: {
    'data-slot': 'table',
    '[class]': 'class()',
  },
})
export class ScTable {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('w-full caption-bottom text-sm', this.classInput()),
  );
}
