import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'th[sc-table-header-cell]',
  host: {
    'data-slot': 'table-header-cell',
    '[class]': 'class()',
  },
})
export class ScTableHeaderCell {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0',
      this.classInput(),
    ),
  );
}
