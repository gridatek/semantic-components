import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'ul[sc-navigation-menu-list]',
  host: {
    'data-slot': 'navigation-menu-list',
    '[class]': 'class()',
  },
})
export class ScNavigationMenuList {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'group flex flex-1 list-none items-center justify-center gap-1',
      this.classInput(),
    ),
  );
}
