import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'a[scNavigationMenuLink]',
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
      'data-[active=true]:focus:bg-muted data-[active=true]:hover:bg-muted data-[active=true]:bg-muted/50',
      'hover:bg-muted focus:bg-muted',
      'focus-visible:ring-ring/50',
      '[&_svg:not([class*="text-"])]:text-muted-foreground',
      'flex items-center gap-2 rounded-lg p-2 text-sm transition-all outline-none',
      'focus-visible:ring-3 focus-visible:outline-1',
      '[&_svg:not([class*="size-"])]:size-4',
      this.classInput(),
    ),
  );
}
