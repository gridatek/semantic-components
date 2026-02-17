import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'div[scItemGroup]',
  host: {
    'data-slot': 'item-group',
    role: 'list',
    '[class]': 'class()',
  },
})
export class ScItemGroup {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'gap-4 has-data-[size=sm]:gap-2.5 has-data-[size=xs]:gap-2 group/item-group flex w-full flex-col',
      this.classInput(),
    ),
  );
}
