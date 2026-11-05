import { Menu, MenuBar, MenuItem } from '@angular/aria/menu';
import { type Signal, computed, inject } from '@angular/core';
import type { ScMenuStyles } from '@semantic-components/presets';
import { injectPreset } from '../../config/preset';

/**
 * The preset's classes for a menu's parts: the menu's, or — in a menu bar,
 * however deep — the menu bar's. The same parts serve both.
 */
export function injectMenuStyles(): Signal<ScMenuStyles> {
  const preset = injectPreset();
  const menu = inject(Menu, { optional: true });
  return computed(() =>
    menu && inMenuBar(menu as Menu<unknown>)
      ? preset.menuBar.menu
      : preset.menu,
  );
}

/** Whether a menu was opened, through its parents, from a menu bar. */
function inMenuBar(menu: Menu<unknown>): boolean {
  let parent = menu.parent();
  while (parent instanceof MenuItem) {
    const owner = parent.parent;
    if (owner instanceof MenuBar) return true;
    if (!(owner instanceof Menu)) return false;
    parent = owner.parent();
  }
  return false;
}
