import { Combobox } from '@angular/aria/combobox';
import { Directive, afterRenderEffect, computed, effect, inject, input } from '@angular/core';

import { cn } from '@semantic-components/utils';

import { ScSelectState } from './select-state';

@Directive({
  selector: '[scSelect]',
  hostDirectives: [
    {
      directive: Combobox,
      inputs: ['disabled', 'readonly'],
    },
  ],
  providers: [ScSelectState],
  host: {
    'data-slot': 'select',
    readonly: 'true',
    '[class]': 'class()',
  },
})
export class ScSelect {
  private readonly state = inject(ScSelectState);

  /** Placeholder text when no value is selected. */
  readonly placeholder = input('Select an option');

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn('block relative w-full', this.classInput()));

  constructor() {
    // Sync placeholder input to state
    effect(() => {
      this.state.placeholder.set(this.placeholder());
    });

    // Scrolls to the active item when the active option changes.
    afterRenderEffect(() => {
      this.state.scrollToActiveOption();
    });

    // Resets the listbox scroll position when the combobox is closed.
    afterRenderEffect(() => {
      this.state.resetScrollPosition();
    });
  }
}
