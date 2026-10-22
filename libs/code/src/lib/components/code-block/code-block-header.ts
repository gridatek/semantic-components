import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

/** The block's header: its title, then its actions at the end. */
@Directive({
  selector: 'div[scCodeBlockHeader]',
  host: {
    'data-slot': 'code-block-header',
    '[class]': 'class()',
  },
})
export class ScCodeBlockHeader {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'flex min-w-0 shrink-0 items-center gap-2 px-3 pt-3 text-muted-foreground group-data-[size=sm]/code-block:px-2.5 group-data-[size=sm]/code-block:pt-2.5 group-data-[variant=destructive]/code-block:text-destructive *:has-[>[data-slot=code-block-title]]:min-w-0',
      this.classInput(),
    ),
  );
}
