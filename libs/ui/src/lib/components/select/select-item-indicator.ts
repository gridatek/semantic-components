import { Directive, computed, input } from '@angular/core';

import { cn } from '@semantic-components/utils';

@Directive({
  selector: '[scSelectItemIndicator]',
  host: {
    'data-slot': 'select-item-indicator',
    '[class]': 'class()',
  },
})
export class ScSelectItemIndicator {
  readonly classInput = input<string>('', {
    alias: 'class',
  });

  protected readonly class = computed(() =>
    cn(
      'absolute right-2 flex size-3.5 items-center justify-center [&_svg]:size-4 [div:not([aria-selected=true])_&]:hidden',
      this.classInput(),
    ),
  );
}
