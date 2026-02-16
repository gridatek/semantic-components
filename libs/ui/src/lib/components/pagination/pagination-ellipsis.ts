import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'span[sc-pagination-ellipsis]',
  host: {
    'data-slot': 'pagination-ellipsis',
    'aria-hidden': 'true',
    '[class]': 'class()',
  },
})
export class ScPaginationEllipsis {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      "size-8 [&_svg:not([class*='size-'])]:size-4 flex items-center justify-center",
      this.classInput(),
    ),
  );
}
