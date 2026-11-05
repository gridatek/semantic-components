import type { MenuItem } from '@angular/aria/menu';
import { computed, inject } from '@angular/core';
import { SC_MENU_NEXT } from './menu-next-context';

/**
 * An item's highlight, as Base UI's `data-highlighted`: the active item —
 * except after a pointer open, until the pointer moves or a key is pressed.
 * The first ArrowDown then shows the first item rather than moving past it.
 */
export function injectMenuNextHighlight(menuItem: MenuItem<unknown>) {
  const context = inject(SC_MENU_NEXT, { optional: true });
  return {
    highlighted: computed(
      () => menuItem.active() && !(context?.quiet() ?? false),
    ),
    keydown(event: KeyboardEvent): void {
      if (!context?.quiet()) return;
      context.quiet.set(false);
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        event.stopPropagation();
      }
    },
  };
}
