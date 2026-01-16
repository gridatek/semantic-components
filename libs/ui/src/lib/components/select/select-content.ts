import { Listbox } from '@angular/aria/listbox';
import { Directive, computed, input } from '@angular/core';

import { cn } from '@semantic-components/utils';

@Directive({
  selector: '[scSelectContent]',
  hostDirectives: [Listbox],
  host: {
    'data-slot': 'select-content',
    '[class]': 'class()',
  },
})
export class ScSelectContent {
  readonly classInput = input<string>('', {
    alias: 'class',
  });

  protected readonly class = computed(() =>
    cn(
      'bg-popover text-popover-foreground relative z-50 min-w-[8rem] rounded-md border shadow-md p-1 flex flex-col gap-0.5 overflow-y-auto max-h-60',
      this.classInput(),
    ),
  );
}
