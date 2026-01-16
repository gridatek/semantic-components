import { ComboboxInput } from '@angular/aria/combobox';
import { Directive, computed, input } from '@angular/core';

import { cn } from '@semantic-components/utils';

@Directive({
  selector: '[scSelectTrigger]',
  hostDirectives: [ComboboxInput],
  host: {
    'data-slot': 'select-trigger',
    '[class]': 'class()',
  },
})
export class ScSelectTrigger {
  readonly classInput = input<string>('', {
    alias: 'class',
  });

  protected readonly class = computed(() =>
    cn(
      'border-input focus-within:border-ring focus-within:ring-ring/50 flex h-9 w-full items-center relative rounded-md border bg-transparent text-sm shadow-xs transition-[color,box-shadow] focus-within:ring-[3px] aria-disabled:cursor-not-allowed aria-disabled:opacity-50',
      this.classInput(),
    ),
  );
}
