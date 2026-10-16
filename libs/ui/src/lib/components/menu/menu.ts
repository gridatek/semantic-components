import { Menu, MenuBar, MenuItem, MenuTrigger } from '@angular/aria/menu';
import { InteractivityChecker } from '@angular/cdk/a11y';
import { DOCUMENT } from '@angular/common';
import {
  type AnimationCallbackEvent,
  Directive,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '../../utils';
import { SC_CONTEXT_MENU_PROVIDER } from '../context-menu/context-menu-types';
import { ScMenuPortal } from './menu-portal';

@Directive({
  selector: '[scMenu]',
  exportAs: 'scMenu',
  hostDirectives: [
    {
      directive: Menu,
      inputs: ['id', 'wrap', 'disabled', 'typeaheadDelay', 'expansionDelay'],
      outputs: ['itemSelected'],
    },
  ],
  host: {
    'data-slot': 'menu',
    '[class]': 'class()',
    'animate.enter': 'animate-in fade-in-0 zoom-in-95 duration-150',
    '(animate.leave)': 'leave($event)',
    '(keydown.tab)': 'onTab($event)',
  },
})
export class ScMenu<V = string> {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly menu = inject<Menu<V>>(Menu);

  /**
   * A context menu tears its overlay down on close, so the leave animation
   * never finishes and its classes stay on the element. The next open then
   * reuses that element and fades in and out at once. Nothing is lost by
   * skipping it: the pane is destroyed either way.
   */
  private readonly contextMenu = inject(SC_CONTEXT_MENU_PROVIDER, {
    optional: true,
  });

  /**
   * Closing: out of reach at once (`inert`, `aria-hidden`) — a menu fading
   * out is gone for the user, its items no longer to be found or clicked
   * while the next menu may already be open — then fades out.
   */
  protected leave(event: AnimationCallbackEvent): void {
    const element = event.target as HTMLElement;
    element.inert = true;
    element.setAttribute('aria-hidden', 'true');
    if (this.contextMenu) {
      event.animationComplete();
      return;
    }
    element.classList.add(
      'animate-out',
      'fade-out-0',
      'zoom-out-95',
      'duration-150',
    );
    // Done when its animations are (none, with reduced motion: at once).
    Promise.allSettled(
      element.getAnimations().map((animation) => animation.finished),
    ).then(() => event.animationComplete());
  }

  readonly visible = this.menu.visible;

  protected readonly class = computed(() =>
    cn(
      'bg-popover text-popover-foreground min-w-32 w-60 rounded-lg p-1 shadow-md ring-1 ring-foreground/10 z-50 overflow-x-hidden overflow-y-auto data-[visible=false]:hidden',
      // Size icons here too, not only on the items: the menu is styled when
      // the overlay measures it, its items not yet — unsized icons (300×150)
      // would make it look too tall and open on the wrong side.
      "[&_svg:not([class*='size-'])]:size-4",
      this.classInput(),
    ),
  );

  /**
   * Tab closes the whole menu chain and moves on, as in the WAI-ARIA menu
   * button pattern. `@angular/aria` has no Tab handling, and because the
   * popover sits before its trigger in the DOM, Tab would land on the trigger
   * and leave the menu open. Refocusing the top-level opener here, without
   * preventing the default, lets the browser's Tab continue from it.
   */
  protected onTab(event: Event): void {
    const opener = topLevelOpener(this.menu as Menu<unknown>);
    if (!opener) return;

    // In a menubar, aria refocuses the bar item after closing — after the
    // browser's Tab would have moved on — so move focus out ourselves.
    const menuBar = opener instanceof MenuItem ? opener.parent : null;
    if (menuBar instanceof MenuBar) {
      event.preventDefault();
      menuBar.close();
      this.focusOutside(menuBar.element, (event as KeyboardEvent).shiftKey);
      return;
    }

    opener.close();
    opener.element.focus();
  }

  private readonly interactivity = inject(InteractivityChecker);
  private readonly document = inject(DOCUMENT);

  /** Focuses the next (or previous) tabbable element outside `container`. */
  private focusOutside(container: HTMLElement, backwards: boolean): void {
    const candidates = Array.from(
      this.document.querySelectorAll<HTMLElement>(
        'a[href], button, input, select, textarea, [tabindex], [contenteditable]',
      ),
    ).filter(
      (el) => !container.contains(el) && this.interactivity.isTabbable(el),
    );
    const after = (el: HTMLElement) =>
      !!(
        container.compareDocumentPosition(el) & Node.DOCUMENT_POSITION_FOLLOWING
      );
    const target = backwards
      ? candidates.filter((el) => !after(el)).pop()
      : candidates.find(after);
    target?.focus();
  }

  constructor() {
    const portal = inject(ScMenuPortal, { optional: true });
    portal?.menu.set(this.menu as Menu<unknown>);
  }
}

/** The trigger, or menubar item, that opened the outermost menu. */
function topLevelOpener(
  menu: Menu<unknown>,
): MenuTrigger<unknown> | MenuItem<unknown> | undefined {
  let parent = menu.parent();
  while (parent instanceof MenuItem) {
    const owner = parent.parent;
    if (owner instanceof MenuBar) return parent;
    if (!(owner instanceof Menu)) return parent;
    parent = owner.parent();
  }
  return parent instanceof MenuTrigger ? parent : undefined;
}
