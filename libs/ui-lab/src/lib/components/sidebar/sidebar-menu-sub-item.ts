import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'li[sc-sidebar-menu-sub-item]',
  host: {
    'data-slot': 'sidebar-menu-sub-item',
    '[class]': 'class()',
  },
})
export class ScSidebarMenuSubItem {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn('', this.classInput()));
}
