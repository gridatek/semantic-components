import { Directive, booleanAttribute, computed, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';

/**
 * A button at a menu item's end (more…): your icon and its name (`sr-only`).
 * `showOnHover`: seen only while the item is hovered or focused (wide screens).
 */
@Directive({
  selector: 'button[scSidebarMenuAction]',
  host: {
    'data-slot': 'sidebar-menu-action',
    type: 'button',
    '[class]': 'class()',
  },
})
export class ScSidebarMenuAction {
  private readonly styles = injectPreset().sidebar;
  readonly classInput = input<string>('', { alias: 'class' });
  readonly showOnHover = input(false, { transform: booleanAttribute });

  protected readonly class = computed(() =>
    cn(
      this.styles.menuAction,
      this.showOnHover() &&
        'group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 peer-data-active/menu-button:text-sidebar-accent-foreground aria-expanded:opacity-100 md:opacity-0',
      this.classInput(),
    ),
  );
}
