import { Directive, TemplateRef, inject } from '@angular/core';

/**
 * The menu's content, on narrow screens: put it in an `ng-template` — a named
 * `nav` with `scNavigationMenuLink`s (following one closes the menu), and any
 * actions. The header renders it while
 * the menu is open, in a panel under the bar: over the page, see-through and
 * blurred, opening at once and fading out in 100ms (closing too when the focus
 * leaves the bar) — or, with the header's `mobileMenu="push"`, pushing the
 * page down. No `class`: a
 * template has no element of its own — style the content you put in it.
 *
 * ```html
 * <ng-template scHeaderMobileMenu>
 *   <nav aria-label="Main">
 *     <a scNavigationMenuLink routerLink="/">Home</a>
 *   </nav>
 * </ng-template>
 * ```
 */
@Directive({
  selector: 'ng-template[scHeaderMobileMenu]',
})
export class ScHeaderMobileMenu {
  /** Your content, rendered by the header while the menu is open. */
  readonly template = inject(TemplateRef);
}
