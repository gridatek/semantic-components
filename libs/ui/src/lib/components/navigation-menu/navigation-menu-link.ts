import {
  Directive,
  booleanAttribute,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '../../utils';
import { ScNavigationMenu } from './navigation-menu';
import { ScNavigationMenuContent } from './navigation-menu-content';
import { navigationMenuTriggerClasses } from './navigation-menu-trigger';

/**
 * A link of the menu: at the top level it looks like a trigger; in a panel,
 * a row. `active` for the page shown (`aria-current="page"`). Following it
 * closes the menu.
 */
@Directive({
  selector: 'a[scNavigationMenuLink]',
  host: {
    'data-slot': 'navigation-menu-link',
    '[attr.aria-current]': 'active() ? "page" : null',
    '[attr.data-active]': 'active() ? "" : null',
    '[class]': 'class()',
    '(click)': 'menu.close()',
  },
})
export class ScNavigationMenuLink {
  protected readonly menu = inject(ScNavigationMenu);
  private readonly inContent = !!inject(ScNavigationMenuContent, {
    optional: true,
  });

  readonly classInput = input<string>('', { alias: 'class' });
  /** The page shown. */
  readonly active = input(false, { transform: booleanAttribute });

  protected readonly class = computed(() =>
    cn(
      // In a panel, not `transition-all`: it would fade in the panel's
      // visibility too, and a link still hidden can't take the focus.
      this.inContent
        ? 'flex items-center gap-2 rounded-md p-2 text-sm transition-[color,background-color,box-shadow] outline-none hover:bg-muted focus:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-1 [&_svg:not([class*=size-])]:size-4'
        : navigationMenuTriggerClasses,
      'data-active:bg-muted/50 data-active:hover:bg-muted data-active:focus:bg-muted',
      this.classInput(),
    ),
  );
}
