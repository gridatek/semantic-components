import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';

/** The site's logo and name, a link home: your icon and text inside. */
@Directive({
  selector: 'a[scHeaderBrand]',
  host: {
    'data-slot': 'header-brand',
    '[class]': 'class()',
  },
})
export class ScHeaderBrand {
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn(
      'text-foreground flex h-14 shrink-0 items-center gap-2 rounded-md text-base font-semibold outline-none',
      'focus-visible:ring-ring/50 focus-visible:ring-3',
      "[&>svg]:shrink-0 [&>svg:not([class*='size-'])]:size-6",
      this.classInput(),
    ),
  );
}
