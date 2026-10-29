import { Directive, booleanAttribute, computed, input } from '@angular/core';
import { cn } from '../../utils';

/**
 * A button at a menu item's end (more…): your icon and its name (`sr-only`).
 * `showOnHover`: seen only while the item is hovered or focused (wide screens).
 */
@Directive({
  selector: 'button[scSidebarNextMenuAction]',
  host: {
    'data-slot': 'sidebar-menu-action',
    type: 'button',
    '[class]': 'class()',
  },
})
export class ScSidebarNextMenuAction {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly showOnHover = input(false, { transform: booleanAttribute });

  protected readonly class = computed(() =>
    cn(
      'absolute top-1.5 end-1 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground ring-sidebar-ring outline-hidden transition-transform group-data-[collapsible=icon]:hidden peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[size=default]/menu-button:top-1.5 peer-data-[size=lg]/menu-button:top-2.5 peer-data-[size=sm]/menu-button:top-1 after:absolute after:-inset-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 md:after:hidden [&>svg]:size-4 [&>svg]:shrink-0',
      this.showOnHover() &&
        'group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 peer-data-active/menu-button:text-sidebar-accent-foreground aria-expanded:opacity-100 md:opacity-0',
      this.classInput(),
    ),
  );
}
