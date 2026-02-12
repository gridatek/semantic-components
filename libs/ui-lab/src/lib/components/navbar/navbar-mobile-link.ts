import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'a[sc-navbar-mobile-link], button[sc-navbar-mobile-link]',
  host: {
    'data-slot': 'navbar-mobile-link',
    '[class]': 'class()',
  },
})
export class ScNavbarMobileLink {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly active = input<boolean>(false);

  protected readonly class = computed(() =>
    cn(
      'flex items-center',
      'w-full px-4 py-3 rounded-md',
      'text-base font-medium',
      'transition-colors',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      this.active()
        ? 'bg-accent text-accent-foreground'
        : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
      this.classInput(),
    ),
  );
}
