import {
  Directive,
  booleanAttribute,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '../../utils/cn/cn';
import { ScNavbar } from './navbar';

const HIDDEN = { sm: 'sm:hidden', md: 'md:hidden', lg: 'lg:hidden' } as const;

/**
 * The menu under the bar, on narrow screens: opens and closes with the toggle
 * (its height animates), not modal — nothing is trapped and the page still
 * scrolls. It pushes the page down; `overlay`, it lies over the page instead,
 * and closes too when you click or tab outside the bar. Put a named `nav`
 * with `scNavbarMenuLink`s inside, and any actions.
 */
@Directive({
  selector: 'div[scNavbarMenu]',
  host: {
    'data-slot': 'navbar-menu',
    '[id]': 'navbar.menuId',
    '[attr.data-state]': 'navbar.open() ? "open" : "closed"',
    '[attr.data-overlay]': 'overlay() ? "" : null',
    '[class]': 'class()',
    '(document:pointerdown)': 'closeOutside($event)',
    '(document:focusin)': 'closeOutside($event)',
  },
})
export class ScNavbarMenu {
  protected readonly navbar = inject(ScNavbar);
  readonly classInput = input<string>('', { alias: 'class' });
  /** Over the page, under the bar, rather than pushing the page down. */
  readonly overlay = input(false, { transform: booleanAttribute });

  protected readonly class = computed(() =>
    cn(
      'flex basis-full flex-col gap-1 overflow-hidden',
      // Height between auto and 0 (global `interpolate-size`); closed, it ends
      // `invisible`: out of the tab order and the accessibility tree.
      'transition-[height,padding,visibility] duration-200 ease-out motion-reduce:transition-none',
      'data-[state=open]:pb-4 data-[state=closed]:invisible data-[state=closed]:h-0',
      // Overlaid: the bar's width and padding, its own background and edge.
      this.overlay() &&
        'bg-background absolute inset-x-0 top-full px-4 md:px-6 data-[state=open]:border-b data-[state=open]:shadow-lg',
      HIDDEN[this.navbar.expand()],
      this.classInput(),
    ),
  );

  /** Overlaid, it hides the page: a click or the focus out there closes it. */
  protected closeOutside(event: Event): void {
    if (
      this.overlay() &&
      this.navbar.open() &&
      !this.navbar.element.contains(event.target as Node)
    )
      this.navbar.open.set(false);
  }
}
