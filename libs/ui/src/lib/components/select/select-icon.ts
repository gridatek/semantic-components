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
      'size-4 opacity-50 text-muted-foreground transition-transform duration-150 pointer-events-none',
      this.classInput(),
    ),
  );
}
