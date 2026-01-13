import { MenuItem } from '@angular/aria/menu';
import { Directive, computed, input } from '@angular/core';

import { cn } from '@semantic-components/utils';

@Directive({
  selector: '[scMenuItem]',
  hostDirectives: [
    {
      directive: MenuItem,
      inputs: ['value', 'disabled', 'submenu'],
    },
  ],
  host: {
    'data-slot': 'menu-item',
    '[class]': 'class()',
  },
})
export class ScMenuItem {
  readonly classInput = input<string>('', {
    alias: 'class',
  });

  protected readonly class = computed(() =>
    cn(
      'focus:bg-accent focus:text-accent-foreground [&_svg:not([class*="text-"])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*="size-"])]:size-4',
      this.classInput(),
    ),
  );
}
