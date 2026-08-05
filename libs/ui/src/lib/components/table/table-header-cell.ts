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
      'text-foreground h-10 px-2 text-start align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pe-0',
      this.classInput(),
    ),
  );
}
