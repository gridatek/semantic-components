import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

/** The block's footer: a note, a status, under the code. */
@Directive({
  selector: 'div[scCodeBlockFooter]',
  host: {
    'data-slot': 'code-block-footer',
    '[class]': 'class()',
  },
})
export class ScCodeBlockFooter {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'flex min-w-0 shrink-0 items-center gap-2 px-3 pb-3 text-muted-foreground group-data-[size=sm]/code-block:px-2.5 group-data-[size=sm]/code-block:pb-2.5',
      this.classInput(),
    ),
  );
}
