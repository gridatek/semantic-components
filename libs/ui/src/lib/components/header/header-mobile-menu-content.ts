import {
  Directive,
  TemplateRef,
  booleanAttribute,
  inject,
  input,
} from '@angular/core';

/**
 * The menu's content, on narrow screens: put it in an `ng-template` — a named
 * `nav` with `scNavigationMenuLink`s (following one closes the menu), and any
 * actions. The header renders it while
 * the menu is open, in a panel under the bar: over the page, see-through and
 * blurred, opening at once and fading out in 100ms (closing too when the focus
 * leaves the bar); `push`, pushing the page down instead.
 *
 * ```html
 * <ng-template scHeaderMobileMenuContent>
 *   <nav aria-label="Main">
 *     <a scNavigationMenuLink routerLink="/">Home</a>
 *   </nav>
 * </ng-template>
 * ```
 */
@Directive({
  selector: 'ng-template[scHeaderMobileMenuContent]',
})
export class ScHeaderMobileMenuContent {
  /** Your content, rendered by the header while the menu is open. */
  readonly template = inject(TemplateRef);
  /** Classes for the panel the header renders. */
  readonly classInput = input<string>('', { alias: 'class' });
  /** Pushes the page down, rather than lying over it. */
  readonly push = input(false, { transform: booleanAttribute });
}
