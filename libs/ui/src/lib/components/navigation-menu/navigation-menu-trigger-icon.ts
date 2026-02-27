import { computed, Directive, inject, input } from '@angular/core';
import { cn } from '../../utils';
import { ScNavigationMenuItem } from './navigation-menu-item';

@Directive({
  selector: 'svg[scNavigationMenuTriggerIcon]',
  host: {
    'data-slot': 'navigation-menu-trigger-icon',
    '[class]': 'class()',
  },
})
export class ScNavigationMenuTriggerIcon {
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly menuItem = inject(ScNavigationMenuItem);

  protected readonly class = computed(() =>
    cn(
      'relative top-px ml-1 size-3 transition duration-300',
      this.menuItem.open() && 'rotate-180',
      this.classInput(),
    ),
  );
}
