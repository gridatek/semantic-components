import { Component, computed, input } from '@angular/core';

import { cn } from '@semantic-components/utils';

@Component({
  selector: 'sc-menu-separator',
  template: '',
  host: {
    'data-slot': 'menu-separator',
    role: 'separator',
    'aria-orientation': 'horizontal',
    '[class]': 'class()',
  },
})
export class ScMenuSeparator {
  readonly classInput = input<string>('', {
    alias: 'class',
  });

  protected readonly class = computed(() => cn('-mx-1 my-1 h-px bg-border', this.classInput()));
}
