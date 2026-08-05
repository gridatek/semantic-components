import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'td[scTableCell]',
  host: {
    '[class]': 'class()',
  },
})
export class ScTableCell {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('p-4 align-middle [&:has([role=checkbox])]:pe-0', this.classInput()),
  );
}
