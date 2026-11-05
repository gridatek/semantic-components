import { Menu, MenuBar, MenuItem } from '@angular/aria/menu';
import { type Signal, computed, inject } from '@angular/core';
import type { ScMenuStyles } from '@semantic-components/presets';
import { injectPreset } from '../../config/preset';
import { SC_CONTEXT_MENU } from '../context-menu/context-menu-types';

/**
 * The preset's classes for a menu's parts: the menu's, or — in a menubar,
 * however deep — the menubar's, or in a context menu the context menu's. The
 * same parts serve all three.
 */
export function injectMenuStyles(): Signal<ScMenuStyles> {
  const preset = injectPreset();
  const menu = inject(Menu, { optional: true });
  const contextMenu = inject(SC_CONTEXT_MENU, { optional: true });
  return computed(() => {
    if (menu && inMenuBar(menu as Menu<unknown>)) return preset.menubar.menu;
    return contextMenu ? preset.contextMenu : preset.menu;
  });
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
