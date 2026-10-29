import {
  Directive,
  booleanAttribute,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '../../utils/cn/cn';
import { ScNavbar } from './navbar';

/**
 * A link of the menu: a full-width row. Closes the menu when followed (even
 * to the page shown, or without the Router). `active` for the page shown
 * (`aria-current="page"`).
 */
@Directive({
  selector: 'a[scNavbarMenuLink]',
  host: {
    'data-slot': 'navbar-menu-link',
    '[attr.aria-current]': 'active() ? "page" : null',
    '[class]': 'class()',
    '(click)': 'navbar.open.set(false)',
  },
})
export class ScNavbarMenuLink {
  protected readonly navbar = inject(ScNavbar);
  readonly classInput = input<string>('', { alias: 'class' });
  /** The page shown. */
  readonly active = input(false, { transform: booleanAttribute });

  protected readonly class = computed(() =>
    cn(
      'text-muted-foreground hover:bg-accent hover:text-accent-foreground flex w-full items-center rounded-md px-3 py-2 text-base font-medium transition-colors outline-none',
      'aria-[current=page]:bg-accent aria-[current=page]:text-accent-foreground',
      'focus-visible:ring-ring/50 focus-visible:ring-3',
      this.classInput(),
    ),
  );
}
