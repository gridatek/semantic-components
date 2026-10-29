import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

/** A list of menu items. */
@Directive({
  selector: 'ul[scSidebarNextMenu]',
  host: {
    'data-slot': 'sidebar-menu',
    '[class]': 'class()',
  },
})
export class ScSidebarNextMenu {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('flex w-full min-w-0 flex-col gap-0', this.classInput()),
  );
}
