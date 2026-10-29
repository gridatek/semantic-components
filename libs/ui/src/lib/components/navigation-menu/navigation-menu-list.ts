import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

/** The top-level items, in a row. */
@Directive({
  selector: 'ul[scNavigationMenuList]',
  host: {
    'data-slot': 'navigation-menu-list',
    '[class]': 'class()',
  },
})
export class ScNavigationMenuList {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'group flex flex-1 list-none items-center justify-center gap-0',
      this.classInput(),
    ),
  );
}
