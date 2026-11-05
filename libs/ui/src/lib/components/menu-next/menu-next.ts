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
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';
import { SC_MENU_NEXT } from './menu-next-context';
import { ScMenuNextPortal } from './menu-next-portal';

/**
 * The menu's popup, in its portal. It takes its trigger's direction and
 * language (it is rendered in an overlay, outside them), so a menu opened in a
 * right-to-left area is right to left.
 */
@Directive({
  selector: 'div[scMenuNext]',
  exportAs: 'scMenuNext',
  hostDirectives: [
    {
      directive: Menu,
      inputs: ['id', 'wrap', 'disabled', 'typeaheadDelay', 'expansionDelay'],
      outputs: ['itemSelected'],
    },
  ],
  host: {
    '[class]': 'class()',
    '[attr.dir]': 'direction',
    '[attr.lang]': 'lang',
    'animate.enter': 'animate-in fade-in-0 zoom-in-95 duration-150',
    '(animate.leave)': 'leave($event)',
    '(keydown.tab)': 'onTab($event)',
    '(pointermove)': 'context?.quiet.set(false)',
  },
})
export class ScMenuNext<V = string> {
  private readonly styles = injectPreset().menu;
  protected readonly context = inject(SC_MENU_NEXT, { optional: true });

  readonly classInput = input<string>('', { alias: 'class' });
  readonly menu = inject<Menu<V>>(Menu);
  readonly visible = this.menu.visible;

  // Read once, when it opens (it is created then).
  protected readonly direction = this.context?.direction() ?? null;
  protected readonly lang = this.context?.lang() ?? null;

  /** A submenu: opened from an item. */
  private readonly submenu = computed(
    () => this.menu.parent() instanceof MenuItem,
  );

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
    inject(ScMenuNextPortal, { optional: true })?.menu.set(
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
