import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { ScNavbar } from './navbar';

const SHOWN = { sm: 'sm:flex', md: 'md:flex', lg: 'lg:flex' } as const;

/**
 * The links, on screens wide enough for them (the navbar's `expand`); the
 * menu has them below that. Goes on a Navigation Menu, which draws the links
 * (`nav[scNavigationMenu]`): the navbar only hides it on narrow screens. A
 * navigation landmark: name it (`aria-label`).
 */
@Directive({
  selector: 'nav[scNavbarNav]',
  host: {
    'data-slot': 'navbar-nav',
    '[class]': 'class()',
  },
})
export class ScNavbarNav {
  private readonly navbar = inject(ScNavbar);
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn('hidden', SHOWN[this.navbar.expand()], this.classInput()),
  );
}
