import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'button[sc-sidebar-menu-action]',
  host: {
    'data-slot': 'sidebar-menu-action',
    'data-sidebar': 'menu-action',
    '[class]': 'class()',
  },
})
export class ScSidebarMenuAction {
  readonly classInput = input<string>('', { alias: 'class' });

  readonly asChild = input<boolean>(false);
  readonly showOnHover = input<boolean>(false);

  protected readonly class = computed(() =>
    cn(
      'absolute right-1 top-1.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 peer-hover/menu-button:text-sidebar-accent-foreground [&>svg]:size-4 [&>svg]:shrink-0',
      'after:absolute after:-inset-2 after:md:hidden',
      'peer-data-[size=sm]/menu-button:top-1',
      'peer-data-[size=default]/menu-button:top-1.5',
      'peer-data-[size=lg]/menu-button:top-2.5',
      'group-data-[collapsible=icon]:hidden',
      this.showOnHover() &&
        'group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 peer-data-[active=true]/menu-button:text-sidebar-accent-foreground md:opacity-0',
      this.classInput(),
    ),
  );
}
