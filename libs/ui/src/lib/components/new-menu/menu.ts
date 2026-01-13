import { Menu } from '@angular/aria/menu';
import { Directive, computed, input } from '@angular/core';

import { cn } from '@semantic-components/utils';

@Directive({
  selector: '[scAriaMenu]',
  hostDirectives: [Menu],
  host: {
    'data-slot': 'aria-menu',
    '[class]': 'class()',
  },
})
export class ScAriaMenu {
  readonly classInput = input<string>('', {
    alias: 'class',
  });

  protected readonly class = computed(() =>
    cn(
      'z-50 min-w-[8rem] overflow-x-hidden overflow-y-auto rounded-md border bg-popover p-1 text-popover-foreground shadow-md',
      this.classInput(),
    ),
  );
}
