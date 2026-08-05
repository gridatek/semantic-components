import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'th[scTableHeaderCell]',
  host: {
    '[class]': 'class()',
  },
})
export class ScTableHeaderCell {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'h-12 px-4 text-start align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pe-0',
      this.classInput(),
    ),
  );
}
