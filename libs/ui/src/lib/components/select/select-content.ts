import { Listbox } from '@angular/aria/listbox';
import { Directive, computed, effect, inject, input } from '@angular/core';

import { cn } from '@semantic-components/utils';

import { ScSelectState } from './select-state';

@Directive({
  selector: '[scSelectContent]',
  hostDirectives: [Listbox],
  host: {
    'data-slot': 'select-content',
    '[class]': 'class()',
  },
})
export class ScSelectContent {
  private readonly state = inject(ScSelectState);
  private readonly listbox = inject(Listbox);

  readonly classInput = input<string>('', {
    alias: 'class',
  });

  protected readonly class = computed(() =>
    cn(
      'bg-popover text-popover-foreground relative z-50 min-w-[8rem] rounded-md border shadow-md p-1 flex flex-col gap-0.5 overflow-y-auto max-h-60',
      this.classInput(),
    ),
  );

  constructor() {
    // Register the listbox with the state
    effect(() => {
      this.state.registerListbox(this.listbox);
    });
  }
}
