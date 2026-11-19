import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { ScHeader } from './header';

const SHOWN = { sm: 'sm:flex', md: 'md:flex', lg: 'lg:flex' } as const;

/**
 * The links, on screens wide enough for them (the header's `expand`); the
 * menu has them below that. Goes on a Navigation Menu, which draws the links
 * (`nav[scNavigationMenu]`): the header only hides it on narrow screens. A
 * navigation landmark: name it (`aria-label`).
 */
@Directive({
  selector: 'nav[scHeaderNav]',
  host: {
    'data-slot': 'header-nav',
    '[class]': 'class()',
  },
})
export class ScHeaderNav {
  private readonly header = inject(ScHeader);
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn('hidden', SHOWN[this.header.expand()], this.classInput()),
  );
}
