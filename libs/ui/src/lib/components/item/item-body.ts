import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'div[sc-item-body]',
  host: {
    'data-slot': 'item-body',
    '[class]': 'class()',
  },
})
export class ScItemBody {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'gap-1 group-data-[size=xs]/item:gap-0 flex flex-1 flex-col [&+[data-slot=item-body]]:flex-none',
      this.classInput(),
    ),
  );
}
