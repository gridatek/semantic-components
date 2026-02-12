import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'ul[sc-sidebar-menu-sub]',
  host: {
    'data-slot': 'sidebar-menu-sub',
    '[class]': 'class()',
  },
})
export class ScSidebarMenuSub {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5',
      'group-data-[collapsible=icon]:hidden',
      this.classInput(),
    ),
  );
}
