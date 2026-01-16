import { Directive, computed, input } from '@angular/core';

import { cn } from '@semantic-components/utils';

@Directive({
  selector: '[scSelectIcon]',
  host: {
    'data-slot': 'select-icon',
    '[class]': 'class()',
  },
})
export class ScSelectIcon {
  readonly classInput = input<string>('', {
    alias: 'class',
  });

  protected readonly class = computed(() =>
    cn(
      'absolute right-3 size-4 opacity-50 text-muted-foreground transition-transform duration-150 pointer-events-none group-aria-expanded:rotate-180',
      this.classInput(),
    ),
  );
}
