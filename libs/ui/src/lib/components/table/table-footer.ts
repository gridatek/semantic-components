import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'tfoot[sc-table-footer]',
  host: {
    'data-slot': 'table-footer',
    '[class]': 'class()',
  },
})
export class ScTableFooter {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'border-t bg-muted/50 font-medium [&>tr]:last:border-b-0',
      this.classInput(),
    ),
  );
}
