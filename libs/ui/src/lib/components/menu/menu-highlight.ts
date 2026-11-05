import type { MenuItem } from '@angular/aria/menu';
import { computed, inject } from '@angular/core';
import { ScMenu } from './menu';
import { SC_MENU } from './menu-context';

/**
 * An item's highlight, as Base UI's `data-highlighted`: the active item —
 * except after a pointer open, until the pointer moves or a key is pressed.
 * The first ArrowDown then shows the first item rather than moving past it.
 * A standalone menu (no trigger) shows it only while it is in use.
 */
export function injectMenuHighlight(menuItem: MenuItem<unknown>) {
  const context = inject(SC_MENU, { optional: true });
  const menu = inject(ScMenu, { optional: true });
  return {
    highlighted: computed(
      () =>
        menuItem.active() &&
        !(context?.quiet() ?? false) &&
        (menu?.inUse() ?? true),
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
