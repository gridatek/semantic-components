import {
  Directive,
  booleanAttribute,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from 'cn';
import { ScNavbar } from './navbar';

const HIDDEN = { sm: 'sm:hidden', md: 'md:hidden', lg: 'lg:hidden' } as const;

/**
 * The menu under the bar, on narrow screens: opens and closes with the toggle,
 * not modal — nothing is trapped and the page still
 * scrolls. It covers the page below the bar, and closes too when you
 * click or tab outside the bar; `push`, it pushes the page down instead.
 * Put a named `nav` with `scNavbarMenuLink`s inside, and any actions.
 */
@Directive({
  selector: 'div[scNavbarMenu]',
  host: {
    'data-slot': 'navbar-menu',
    '[id]': 'navbar.menuId',
    '[attr.data-state]': 'navbar.open() ? "open" : "closed"',
    '[class]': 'class()',
    '(document:pointerdown)': 'closeOutside($event)',
    '(document:focusin)': 'closeOutside($event)',
  },
})
export class ScNavbarMenu {
  private readonly navbar = inject(ScNavbar);
  readonly classInput = input<string>('', { alias: 'class' });
  /** Pushes the page down, rather than lying over it. */
  readonly push = input(false, { transform: booleanAttribute });

  private readonly class = computed(() =>
    cn(
      'flex basis-full flex-col gap-1 overflow-hidden',
      // Closed: `invisible`, out of the tab order and the accessibility tree.
      'data-[state=open]:pb-4 data-[state=closed]:invisible data-[state=closed]:h-0',
      // Pushing the page, its height animates between auto and 0 (global
      // `interpolate-size`): the page moves with it. Over the page, it shows
      // and hides at once, as ui-sdk's.
      this.push() &&
        'transition-[height,padding,visibility] duration-200 ease-out motion-reduce:transition-none',
      // Over the page: the bar's width and padding, its own background; open,
      // all of the page below the bar (the window's height less the bar's,
      // which is `100%` here), scrolling if its content is taller.
      !this.push() && 'bg-background absolute inset-x-0 top-full px-4 md:px-6',
      !this.push() &&
        this.navbar.open() &&
        'h-[calc(100dvh-100%)] overflow-y-auto overscroll-contain',
      HIDDEN[this.navbar.expand()],
      this.classInput(),
    ),
  );

  /** Over the page, it hides it: a click or the focus out there closes it. */
  private closeOutside(event: Event): void {
    if (
      !this.push() &&
      this.navbar.open() &&
      !this.navbar.element.contains(event.target as Node)
    )
      this.navbar.open.set(false);
  }
}
