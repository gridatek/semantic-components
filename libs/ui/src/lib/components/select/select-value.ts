import { Directive, computed, input } from '@angular/core';

import { cn } from '@semantic-components/utils';

@Directive({
  selector: '[scSelectValue]',
  host: {
    'data-slot': 'select-value',
    '[class]': 'class()',
  },
})
export class ScSelectValue {
  readonly classInput = input<string>('', {
    alias: 'class',
  });

  protected readonly class = computed(() =>
    cn('line-clamp-1 flex flex-1 items-center gap-2 pointer-events-none', this.classInput()),
  );
}
