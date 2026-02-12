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
    cn('grid gap-1.5 p-4 text-center sm:text-left', this.classInput()),
  );
}
