import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'div[sc-menu-separator]',
  host: {
    role: 'separator',
    'aria-orientation': 'horizontal',
    'data-slot': 'menu-separator',
    '[class]': 'class()',
  },
})
export class ScMenuSeparator {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('-mx-1 my-1 h-px bg-muted', this.classInput()),
  );
}
