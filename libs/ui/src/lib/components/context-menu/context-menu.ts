import {
  Component,
  ElementRef,
  ViewEncapsulation,
  computed,
  contentChild,
  inject,
  input,
} from '@angular/core';
import { cn } from '../../utils';
import { ScMenu } from '../menu';
import { ScContextMenuTrigger } from './context-menu-trigger';

@Component({
  selector: 'div[scContextMenu]',
  template: `
    <ng-content />
  `,
  styles: `
    [data-slot='context-menu'] > [data-slot='menu'] {
      visibility: hidden;
      position: fixed;
    }
  `,
  host: {
    'data-slot': 'context-menu',
    '[class]': 'class()',
    '(contextmenu)': 'onContextMenu($event)',
    '(focusout)': 'onFocusOut($event)',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScContextMenu {
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly trigger = contentChild(ScContextMenuTrigger);
  private readonly scMenu = contentChild(ScMenu);

  protected readonly class = computed(() => cn('block', this.classInput()));

  onContextMenu(event: MouseEvent) {
    const triggerEl = this.trigger();
    if (!triggerEl) {
      return;
    }

    event.preventDefault();

    const menu = this.scMenu()?.menu;
    if (!menu) {
      return;
    }

    menu._pattern.closeAll();
    // Placed before it is revealed, so it never flashes at the previous
    // position. A visibility-hidden element still reports its size.
    this.place(menu.element, event.clientX, event.clientY);
    menu.element.style.visibility = 'visible';
    setTimeout(() => menu._pattern.first());
  }

  /**
   * Opens away from the pointer in the reading direction, flips to the other
   * side when there is no room, and finally clamps so the menu always lands
   * inside the viewport. Assigning the pointer coordinates directly let the
   * menu run off-screen near an edge.
   */
  private place(element: HTMLElement, clientX: number, clientY: number): void {
    const margin = 8;
    const { width, height } = element.getBoundingClientRect();
    const rtl = getComputedStyle(element).direction === 'rtl';

    const fit = (value: number, size: number, viewport: number) =>
      Math.min(
        Math.max(margin, value),
        Math.max(margin, viewport - size - margin),
      );

    let x = rtl ? clientX - width : clientX;
    if (rtl ? x < margin : x + width > window.innerWidth - margin) {
      x = rtl ? clientX : clientX - width;
    }

    let y = clientY;
    if (y + height > window.innerHeight - margin) {
      y = clientY - height;
    }

    element.style.left = `${fit(x, width, window.innerWidth)}px`;
    element.style.top = `${fit(y, height, window.innerHeight)}px`;
  }

  onFocusOut(event: FocusEvent) {
    const menu = this.scMenu()?.menu;
    if (!menu) {
      return;
    }

    const relatedTarget = event.relatedTarget as HTMLElement | null;
    if (!this.elementRef.nativeElement.contains(relatedTarget)) {
      menu.close();
      menu.element.style.visibility = 'hidden';
    }
  }
}
