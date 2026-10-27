import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

/** The block's title — a file name, a language; an icon of yours before it. */
@Directive({
  selector: 'div[scCodeBlockTitle]',
  host: {
    'data-slot': 'code-block-title',
    '[class]': 'class()',
  },
})
export class ScCodeBlockTitle {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      "min-w-0 truncate font-sans text-sm font-medium text-foreground group-data-[size=sm]/code-block:text-xs group-data-[variant=destructive]/code-block:text-destructive [&_svg]:pointer-events-none [&_svg]:inline-block [&_svg]:align-middle [&_svg:not([class*='size-'])]:size-3.5 *:[svg]:me-1.5",
      this.classInput(),
    ),
  );
}
