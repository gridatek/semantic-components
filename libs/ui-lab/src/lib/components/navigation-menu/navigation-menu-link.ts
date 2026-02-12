import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'a[sc-navigation-menu-link]',
  host: {
    'data-slot': 'navigation-menu-link',
    '[attr.data-active]': 'active()',
    '[class]': 'class()',
  },
})
export class ScNavigationMenuLink {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly active = input<boolean>(false);

  protected readonly class = computed(() =>
    cn(
      'data-[active=true]:focus:bg-accent data-[active=true]:hover:bg-accent data-[active=true]:bg-accent/50 data-[active=true]:text-accent-foreground',
      'hover:bg-accent hover:text-accent-foreground',
      'focus:bg-accent focus:text-accent-foreground',
      'focus-visible:ring-ring/50',
      '[&_svg:not([class*="text-"])]:text-muted-foreground',
      'flex flex-col gap-1 rounded-sm p-2 text-sm transition-all outline-none',
      'focus-visible:ring-[3px] focus-visible:outline-1',
      '[&_svg:not([class*="size-"])]:size-4',
      this.classInput(),
    ),
  );
}
