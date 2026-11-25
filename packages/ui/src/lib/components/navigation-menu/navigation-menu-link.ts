import {
  Directive,
  booleanAttribute,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { ScNavigationMenu } from './navigation-menu';
import { ScNavigationMenuContent } from './navigation-menu-content';
import { SC_NAVIGATION_MENU_LINK_HOST } from './navigation-menu-link-host';

/**
 * A navigation link: at a Navigation Menu's top level the trigger's look;
 * anywhere else — in its panel, in a Header's mobile menu — the style's link
 * (a row — `flex-col items-start gap-1` for a title over a text). `active` for
 * the page shown (`aria-current="page"`). Following it tells its parent
 * (`SC_NAVIGATION_MENU_LINK_HOST`), which closes — the menu's panel, the
 * header's mobile menu — unless `closeOnClick` is off.
 */
@Directive({
  selector: 'a[scNavigationMenuLink]',
  host: {
    // The panel styles its links by it.
    'data-slot': 'navigation-menu-link',
    '[attr.aria-current]': 'active() ? "page" : null',
    '[attr.data-active]': 'active() || null',
    '[class]': 'class()',
    '(click)': 'closeOnClick() && host?.linkFollowed()',
  },
})
export class ScNavigationMenuLink {
  private readonly styles = injectStyle().navigationMenu;
  private readonly host = inject(SC_NAVIGATION_MENU_LINK_HOST, {
    optional: true,
  });
  /** At a Navigation Menu's top level (not in its panel): the trigger's look. */
  private readonly inBar =
    !!inject(ScNavigationMenu, { optional: true }) &&
    !inject(ScNavigationMenuContent, { optional: true });

  readonly classInput = input<string>('', { alias: 'class' });
  /** The page shown. */
  readonly active = input(false, { transform: booleanAttribute });
  /** Following it closes its parent (a page shown without reloading). */
  readonly closeOnClick = input(true, { transform: booleanAttribute });

  private readonly class = computed(() =>
    cn(
      this.inBar
        ? cn(
            this.styles.trigger,
            'data-[active=true]:bg-muted/50 data-[active=true]:hover:bg-muted data-[active=true]:focus:bg-muted',
          )
        : cn(
            this.styles.link,
            // Not `transition-all`: it would fade in the panel's visibility
            // too, and a link still hidden can't take the focus.
            'transition-[color,background-color,box-shadow]',
          ),
      this.classInput(),
    ),
  );
}
