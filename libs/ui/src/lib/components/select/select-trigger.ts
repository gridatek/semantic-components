import { ComboboxInput } from '@angular/aria/combobox';
import { Directive, ElementRef, computed, inject, input } from '@angular/core';

import { cn } from '@semantic-components/utils';

@Directive({
  selector: 'input[scSelectTrigger]',
  hostDirectives: [ComboboxInput],
  host: {
    'data-slot': 'select-trigger',
    '[class]': 'class()',
    type: 'text',
  },
})
export class ScSelectTrigger {
  /** The element reference for overlay positioning. */
  readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  readonly classInput = input<string>('', {
    alias: 'class',
  });

  protected readonly class = computed(() =>
    cn(
      'group/trigger border-input focus:border-ring focus:ring-ring/50 h-9 w-full pl-3 pr-10 rounded-md border bg-transparent text-sm shadow-xs transition-[color,box-shadow] outline-none focus:ring-[3px] cursor-pointer caret-transparent aria-disabled:cursor-not-allowed aria-disabled:opacity-50',
      this.classInput(),
    ),
  );
}
