import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

/** An item: its button, and an action, a badge or a sub-menu. */
@Directive({
  selector: 'li[scSidebarNextMenuItem]',
  host: {
    'data-slot': 'sidebar-menu-item',
    '[class]': 'class()',
  },
})
export class ScSidebarNextMenuItem {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('group/menu-item relative', this.classInput()),
  );
}
