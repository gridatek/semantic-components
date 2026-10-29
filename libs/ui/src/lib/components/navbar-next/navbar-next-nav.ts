import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '../../utils/cn/cn';
import { ScNavbarNext } from './navbar-next';

const SHOWN = { sm: 'sm:flex', md: 'md:flex', lg: 'lg:flex' } as const;

/**
 * The links, on screens wide enough for them (the navbar's `expand`); the
 * menu has them below that. A navigation landmark: name it (`aria-label`).
 * Holds `scNavbarNextLink`s, or a navigation menu.
 */
@Directive({
  selector: 'nav[scNavbarNextNav]',
  host: {
    'data-slot': 'navbar-nav',
    '[class]': 'class()',
  },
})
export class ScNavbarNextNav {
  private readonly navbar = inject(ScNavbarNext);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'hidden items-center gap-6',
      SHOWN[this.navbar.expand()],
      this.classInput(),
    ),
  );
}
