import { Option } from '@angular/aria/listbox';
import { Directive, OnDestroy, computed, inject, input } from '@angular/core';

import { cn } from '@semantic-components/utils';

import { ScSelectState } from './select-state';

@Directive({
  selector: '[scSelectItem]',
  hostDirectives: [
    {
      directive: Option,
      inputs: ['value', 'label', 'disabled'],
    },
  ],
  host: {
    'data-slot': 'select-item',
    '[class]': 'class()',
  },
})
export class ScSelectItem implements OnDestroy {
  private readonly state = inject(ScSelectState);
  private readonly option = inject(Option);

  readonly classInput = input<string>('', {
    alias: 'class',
  });

  protected readonly class = computed(() =>
    cn(
      'data-[active=true]:bg-accent data-[active=true]:text-accent-foreground [&[aria-selected=true]]:bg-accent [&[aria-selected=true]]:text-accent-foreground relative flex w-full cursor-default items-center rounded-sm py-1.5 pr-8 pl-2 text-sm outline-none select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      this.classInput(),
    ),
  );

  constructor() {
    this.state.registerOption(this.option);
  }

  ngOnDestroy(): void {
    this.state.unregisterOption(this.option);
  }
}
