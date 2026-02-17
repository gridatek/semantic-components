import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'tr[scTableRow]',
  host: {
    'data-slot': 'table-row',
    '[class]': 'class()',
  },
})
export class ScTableRow {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted',
      this.classInput(),
    ),
  );
}
