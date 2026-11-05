import { Menu, MenuBar, MenuItem, MenuTrigger } from '@angular/aria/menu';
import { InteractivityChecker } from '@angular/cdk/a11y';
import { DOCUMENT } from '@angular/common';
import {
  type AnimationCallbackEvent,
  Directive,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';
import { SC_CONTEXT_MENU_PROVIDER } from '../context-menu/context-menu-types';
import { SC_MENU } from './menu-context';
import { ScMenuPortal } from './menu-portal';

/**
 * The menu's popup, in its portal. It takes its trigger's direction and
 * language (it is rendered in an overlay, outside them), so a menu opened in a
 * right-to-left area is right to left.
 */
@Directive({
  selector: 'div[scMenu]',
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
    '[attr.dir]': 'direction',
    '[attr.lang]': 'lang',
    'animate.enter': 'animate-in fade-in-0 zoom-in-95 duration-150',
    '(animate.leave)': 'leave($event)',
    '(keydown.tab)': 'onTab($event)',
    '(pointermove)': 'context?.quiet.set(false)',
    '(focusin)': 'focused.set(true)',
    '(focusout)': 'focusOut($event)',
    '(pointerenter)': 'pointerInside.set(true)',
    '(pointerleave)': 'pointerInside.set(false)',
  },
})
export class ScMenu<V = string> {
  private readonly styles = injectPreset().menu;
  protected readonly context = inject(SC_MENU, { optional: true });

  readonly classInput = input<string>('', { alias: 'class' });
  readonly menu = inject<Menu<V>>(Menu);
  readonly visible = this.menu.visible;

  // Read once, when it opens (it is created then).
  protected readonly direction = this.context?.direction() ?? null;
  protected readonly lang = this.context?.lang() ?? null;

  protected readonly focused = signal(false);
  protected readonly pointerInside = signal(false);

  /**
   * In use: opened (from a trigger, an item, a menu bar), or — a standalone
   * menu, always shown — while it has focus or the pointer is over it. Its
   * items show their highlight only then.
   */
  readonly inUse = computed(
    () => !!this.menu.parent() || this.focused() || this.pointerInside(),
  );

  protected focusOut(event: FocusEvent): void {
    const next = event.relatedTarget as Node | null;
    if (!next || !this.menu.element.contains(next)) this.focused.set(false);
  }

  /** A submenu: opened from an item of a menu (not of a menu bar). */
  private readonly submenu = computed(() => {
    const parent = this.menu.parent();
    return parent instanceof MenuItem && !(parent.parent instanceof MenuBar);
  });

  /**
   * A context menu tears its overlay down on close, so the leave animation
   * never finishes and the next open reuses the element mid-fade: skipped.
   */
  private readonly contextMenu = inject(SC_CONTEXT_MENU_PROVIDER, {
    optional: true,
  });

  protected readonly class = computed(() =>
    cn(
      this.submenu() ? this.styles.subPopup : this.styles.popup,
      'z-50 data-[visible=false]:hidden',
      // Size icons here too, not only on the items: the menu is measured
      // before its items are styled — unsized icons (300×150) would make it
      // too tall and open on the wrong side.
      "[&_svg:not([class*='size-'])]:size-4",
      this.classInput(),
    ),
  );

  constructor() {
    if (this.direction) this.menu.textDirection.set(this.direction);
    inject(ScMenuPortal, { optional: true })?.menu.set(
      this.menu as Menu<unknown>,
    );
  }

  /**
   * Closing: out of reach at once (`inert`, `aria-hidden`) — its items no
   * longer to be found or clicked while the next menu may already be open —
   * then fades out.
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
    Promise.allSettled(
      element.getAnimations().map((animation) => animation.finished),
    ).then(() => event.animationComplete());
  }

  /**
   * Tab closes the whole menu chain and moves on (the WAI-ARIA menu button
   * pattern); `@angular/aria` has no Tab handling, and the popover sits before
   * its trigger in the DOM.
   */
  protected onTab(event: Event): void {
    const opener = topLevelOpener(this.menu as Menu<unknown>);
    if (!opener) return;
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
