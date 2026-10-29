import { Directive, booleanAttribute, computed, input } from '@angular/core';
import { cn } from '../../utils/cn/cn';

/** A link of the bar: `active` for the page shown (`aria-current="page"`). */
@Directive({
  selector: 'a[scNavbarNextLink]',
  host: {
    'data-slot': 'navbar-link',
    '[attr.aria-current]': 'active() ? "page" : null',
    '[class]': 'class()',
  },
})
export class ScNavbarNextLink {
  readonly classInput = input<string>('', { alias: 'class' });
  /** The page shown. */
  readonly active = input(false, { transform: booleanAttribute });

  protected readonly class = computed(() =>
    cn(
      'text-muted-foreground hover:text-foreground rounded-md text-sm font-medium transition-colors outline-none',
      'aria-[current=page]:text-foreground',
      'focus-visible:ring-ring/50 focus-visible:ring-3',
      this.classInput(),
    ),
  );
}
