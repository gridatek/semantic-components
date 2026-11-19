import {
  Directive,
  booleanAttribute,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from 'cn';
import { ScHeader } from './header';

/**
 * A link of the menu: a full-width row. Closes the menu when followed (even
 * to the page shown, or without the Router). `active` for the page shown
 * (`aria-current="page"`).
 */
@Directive({
  selector: 'a[scHeaderMenuLink]',
  host: {
    'data-slot': 'header-menu-link',
    '[attr.aria-current]': 'active() ? "page" : null',
    '[class]': 'class()',
    '(click)': 'header.open.set(false)',
  },
})
export class ScHeaderMenuLink {
  private readonly header = inject(ScHeader);
  readonly classInput = input<string>('', { alias: 'class' });
  /** The page shown. */
  readonly active = input(false, { transform: booleanAttribute });

  private readonly class = computed(() =>
    cn(
      'text-muted-foreground hover:bg-accent hover:text-accent-foreground flex w-full items-center rounded-md px-3 py-2 text-base font-medium transition-colors outline-none',
      'aria-[current=page]:bg-accent aria-[current=page]:text-accent-foreground',
      'focus-visible:ring-ring/50 focus-visible:ring-3',
      this.classInput(),
    ),
  );
}
