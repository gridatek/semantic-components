import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'li[scSidebarMenuSubItem]',
  host: {
    'data-slot': 'sidebar-menu-sub-item',
    '[class]': 'class()',
  },
})
export class ScSidebarMenuSubItem {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('group/menu-sub-item relative', this.classInput()),
  );
}
