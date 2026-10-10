import type { MenuItem } from '@angular/aria/menu';
import { ElementRef, afterNextRender, inject } from '@angular/core';

/**
 * Gives a menu item a type-ahead term from its own text when the consumer
 * set none. `@angular/aria` matches type-ahead against `searchTerm`, which
 * defaults to `''`, so without this typing a letter never moves.
 *
 * Text inside a nested submenu (attached as a child popover) is ignored.
 * Must be called in an injection context.
 */
export function useDefaultSearchTerm(menuItem: MenuItem<unknown>): void {
  const element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  afterNextRender(() => {
    if (menuItem.searchTerm()) return;
    const text = ownText(element).replace(/\s+/g, ' ').trim();
    if (text) menuItem.searchTerm.set(text);
  });
}

function ownText(node: Node): string {
  let text = '';
  for (const child of Array.from(node.childNodes)) {
    if (child.nodeType === Node.TEXT_NODE) {
      text += child.textContent ?? '';
    } else if (
      child instanceof HTMLElement &&
      !child.matches('[role=menu], [popover], .cdk-overlay-popover')
    ) {
      text += ' ' + ownText(child);
    }
  }
  return text;
}
