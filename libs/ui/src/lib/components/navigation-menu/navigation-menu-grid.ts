import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'ul[scNavigationMenuGrid]',
  host: {
    'data-slot': 'navigation-menu-grid',
    '[class]': 'class()',
  },
})
export class ScNavigationMenuGrid {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]',
      this.classInput(),
    ),
  );
}
