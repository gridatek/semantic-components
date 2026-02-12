import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: '[sc-data-table-row]',
  host: {
    'data-slot': 'data-table-row',
    '[class]': 'class()',
    '[attr.data-selected]': 'selected() || null',
  },
})
export class ScDataTableRow {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly selected = input<boolean>(false);

  protected readonly class = computed(() =>
    cn(
      'border-b transition-colors hover:bg-muted/50',
      'data-[selected]:bg-muted',
      this.classInput(),
    ),
  );
}
