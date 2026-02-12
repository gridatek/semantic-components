import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'li[sc-sidebar-menu-item]',
  host: {
    'data-slot': 'sidebar-menu-item',
    '[class]': 'class()',
  },
})
export class ScSidebarMenuItem {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('group/menu-item relative', this.classInput()),
  );
}
