import {
  Directive,
  booleanAttribute,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '../../utils';
import { ScNavigationMenuNext } from './navigation-menu-next';
import { ScNavigationMenuNextContent } from './navigation-menu-next-content';

/**
 * A link of the menu: at the top level the trigger's look; in a panel the
 * preset's link (a row — `flex-col items-start gap-1` for a title over a
 * text). `active` for the page shown (`aria-current="page"`). Following it
 * closes the menu, unless `closeOnClick` is off.
 */
@Directive({
  selector: 'a[scNavigationMenuNextLink]',
  host: {
    // The panel styles its links by it.
    'data-slot': 'navigation-menu-link',
    '[attr.aria-current]': 'active() ? "page" : null',
    '[attr.data-active]': 'active() || null',
    '[class]': 'class()',
    '(click)': 'closeOnClick() && menu.close()',
  },
})
export class ScNavigationMenuNextLink {
  protected readonly menu = inject(ScNavigationMenuNext);
  private readonly inContent = !!inject(ScNavigationMenuNextContent, {
    optional: true,
  });

  readonly classInput = input<string>('', { alias: 'class' });
  /** The page shown. */
  readonly active = input(false, { transform: booleanAttribute });
  /** Following it closes the menu (a page shown without reloading). */
  readonly closeOnClick = input(true, { transform: booleanAttribute });

  protected readonly class = computed(() =>
    cn(
      this.inContent
        ? cn(
            this.menu.styles.link,
            // Not `transition-all`: it would fade in the panel's visibility
            // too, and a link still hidden can't take the focus.
            'transition-[color,background-color,box-shadow]',
          )
        : cn(
            this.menu.styles.trigger,
            'data-[active=true]:bg-muted/50 data-[active=true]:hover:bg-muted data-[active=true]:focus:bg-muted',
          ),
      this.classInput(),
    ),
  );
}
