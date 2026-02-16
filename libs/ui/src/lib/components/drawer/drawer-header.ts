import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'div[sc-drawer-header]',
  host: {
    'data-slot': 'drawer-header',
    '[class]': 'class()',
  },
})
export class ScDrawerHeader {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'gap-0.5 p-4 group-data-[direction=bottom]/drawer:text-center group-data-[direction=top]/drawer:text-center md:gap-0.5 md:text-left flex flex-col',
      this.classInput(),
    ),
  );
}
